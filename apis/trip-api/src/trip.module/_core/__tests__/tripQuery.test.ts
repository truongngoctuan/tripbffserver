import mongoUtil from "./mondb-utils";

import { ServiceBus } from "../services/TripServiceBus";
import { TripRepository } from "../../_infrastructures/repositories/TripRepository";
import moment from "moment";
import { IMongooseSchemas } from "../../_infrastructures/models/mongoosed";
import { TripEvent } from "../services/events";
import { ITrip } from "../models/ITrip";
import { ITripRepository } from "../models/ITripRepository";

let schemas: IMongooseSchemas;

beforeAll(async () => {
  schemas = await mongoUtil.beforeAll();
});

afterAll(async () => {
  await mongoUtil.afterAll();
});


var tripRepository: ITripRepository;
var serviceBus: ServiceBus;

beforeEach(async () => {
  await mongoUtil.beforeEach();
  tripRepository = new TripRepository(schemas);
  serviceBus = new ServiceBus(tripRepository);

  var event: TripEvent = {
    type: "TripCreated",
    ownerId: "ownerId",
    tripId: "tripId",
    name: "name",
    fromDate: moment('2019-01-01'),
    toDate: moment('2019-01-10')
  };

  await serviceBus.emit(event);

});

it('create trip', async () => {
  expect(await tripRepository.get("ownerId", "tripId"))
    .toMatchSnapshot();
});

it('update trip name', async () => {
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
        address: "address", //todo: need address here ?
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
        time: moment('2019-01-01'),
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
        time: moment('2019-01-01'),
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