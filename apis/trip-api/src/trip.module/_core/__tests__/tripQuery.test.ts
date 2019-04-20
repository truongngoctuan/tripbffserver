import mongoose from "mongoose";

import { ServiceBus } from "../services/TripServiceBus";
import { TripRepository } from "../../_infrastructures/repositories/TripRepository";
import moment from "moment";
import { initSchemas, IMongooseSchemas } from "../../_infrastructures/models/mongoosed";
import { TripEvent } from "../services/events";
import { ITrip } from "../models/ITrip";

//todo move theses setup into an util file
//test mongodb connection
mongoose.connection.once("open", () => {
  // console.log("connected to mongodb database");
});
let mongoosed;
let connection;
let db;
let schemas: IMongooseSchemas;

beforeAll(async () => {
  // console.log("mongo config: ", global.__MONGO_URI__);
  // console.log("mongo config: ", global.__MONGO_DB_NAME__);

  mongoosed = await mongoose.connect((global as any).__MONGO_URI__)
    .catch(err => {
      console.log("error on connect to mongo db");
      console.log(err);
    });
  // console.log("n connections", mongoosed.connections.length);
  // console.log("connection", mongoosed.connection);

  connection = mongoosed.connection;
  // console.log("connection db", mongoose.connection.db);
  // console.log(mongoose.Schema);
  db = connection.db;

  //setup db schemas
  schemas = initSchemas(mongoose);

});

afterAll(async () => {
  if (connection) {
    await connection.close();
    // await db.close();
  }
});

beforeEach(async () => {
  async function clearDB() {
    if (connection) {
      await Promise.all(
        Object.keys(connection.collections).map(async (key) => {
          return await connection.collections[key].remove({});
        }),
      );
    }

  }

  await clearDB();

});

it('create trip', async () => {
  var tripRepository = new TripRepository(schemas);
  // console.log("schemas", connection);
  var serviceBus = new ServiceBus(tripRepository);

  var event: TripEvent = {
    type: "TripCreated",
    ownerId: "ownerId",
    tripId: "tripId",
    name: "name",
    fromDate: moment('2019-01-01'),
    toDate: moment('2019-01-10')
  };

  await serviceBus.emit(event);

  expect(await tripRepository.get("ownerId", "tripId"))
    .toMatchSnapshot();
});

it('update trip name', async () => {
  var tripRepository = new TripRepository(schemas);
  // console.log("schemas", connection);
  var serviceBus = new ServiceBus(tripRepository);

  var createEvent: TripEvent = {
    type: "TripCreated",
    ownerId: "ownerId",
    tripId: "tripId",
    name: "name",
    fromDate: moment('2019-01-01'),
    toDate: moment('2019-01-10')
  };

  await serviceBus.emit(createEvent);

  var updateEvent: TripEvent = {
    type: "TripNameUpdated",
    ownerId: "ownerId",
    tripId: "tripId",
    name: "name 2",
  };
  await serviceBus.emit(updateEvent);

  expect(await tripRepository.get("ownerId", "tripId"))
    .toMatchSnapshot();
});


test('import trip location', async () => {
  var tripRepository = new TripRepository(schemas);
  // console.log("schemas", connection);
  var serviceBus = new ServiceBus(tripRepository);

  var createEvent: TripEvent = {
    type: "TripCreated",
    ownerId: "ownerId",
    tripId: "tripId",
    name: "name",
    fromDate: moment('2019-01-01'),
    toDate: moment('2019-01-10')
  };

  await serviceBus.emit(createEvent);

  var importEvent: TripEvent = {
    type: "TripImportLocations",
    ownerId: "ownerId",
    tripId: "tripId",
    locations: [{
      locationId: "locationId01",
      name: "name",
      location: {
        long: 1,
        lat: 1,
        address: "address",
      },
      fromTime: moment('2019-01-01'),
      toTime: moment('2019-01-10'),
      images: [],
    }]
  };
  await serviceBus.emit(importEvent);

  expect(await tripRepository.get("ownerId", "tripId"))
    .toMatchSnapshot();
});

test('upload location image', async () => {
  var tripRepository = new TripRepository(schemas);
  // console.log("schemas", connection);
  var serviceBus = new ServiceBus(tripRepository);

  var createEvent: TripEvent = {
    type: "TripCreated",
    ownerId: "ownerId",
    tripId: "tripId",
    name: "name",
    fromDate: moment('2019-01-01'),
    toDate: moment('2019-01-10')
  };

  await serviceBus.emit(createEvent);

  var importEvent: TripEvent = {
    type: "TripImportLocations",
    ownerId: "ownerId",
    tripId: "tripId",
    locations: [{
      locationId: "locationId01",
      name: "name",
      location: {
        long: 1,
        lat: 1,
        address: "address",
      },
      fromTime: moment('2019-01-01'),
      toTime: moment('2019-01-10'),
      images: [{
        imageId: "imageId01",
        url: "url",
        externalUrl: "", //todo why do I require this data ?
        thumbnailExternalUrl: "", //todo why do I require this data ?
        isFavorite: false, //todo: shouldn't force to input this...
      }],
    }]
  };
  await serviceBus.emit(importEvent);

  var uploadImageEvent: TripEvent = {
    type: "LocationImageUploaded",
    ownerId: "ownerId",
    tripId: "tripId",
    locationId: "locationId01",
    imageId: "imageId01",
    externalStorageId: "guid01",
  };
  await serviceBus.emit(uploadImageEvent);
  var trip = await tripRepository.get("ownerId", "tripId");
  expect(trip).toBeDefined();
  var img = (trip as ITrip).locations[0].images[0];
  expect(img).toMatchSnapshot();
});


test('favorite location image', async () => {
  var tripRepository = new TripRepository(schemas);
  // console.log("schemas", connection);
  var serviceBus = new ServiceBus(tripRepository);

  var createEvent: TripEvent = {
    type: "TripCreated",
    ownerId: "ownerId",
    tripId: "tripId",
    name: "name",
    fromDate: moment('2019-01-01'),
    toDate: moment('2019-01-10')
  };

  await serviceBus.emit(createEvent);

  var importEvent: TripEvent = {
    type: "TripImportLocations",
    ownerId: "ownerId",
    tripId: "tripId",
    locations: [{
      locationId: "locationId01",
      name: "name",
      location: {
        long: 1,
        lat: 1,
        address: "address",
      },
      fromTime: moment('2019-01-01'),
      toTime: moment('2019-01-10'),
      images: [{
        imageId: "imageId01",
        url: "url",
      }],
    }]
  };
  await serviceBus.emit(importEvent);

  var uploadImageEvent: TripEvent = {
    type: "LocationImagesFavored",
    ownerId: "ownerId",
    tripId: "tripId",
    locationId: "locationId01",
    imageId: "imageId01",
    isFavorite: true
  };
  await serviceBus.emit(uploadImageEvent);
  var trip = await tripRepository.get("ownerId", "tripId");
  expect(trip).toBeDefined();
  var img = (trip as ITrip).locations[0].images[0];
  expect(img.isFavorite).toBe(true);
});