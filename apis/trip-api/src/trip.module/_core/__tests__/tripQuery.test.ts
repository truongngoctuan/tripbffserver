import mongoUtil from "./mondb-utils";

import { ServiceBus } from "../services/TripServiceBus";
import { TripRepository } from "../../_infrastructures/repositories/TripRepository";
import moment from "moment";
import { IMongooseSchemas } from "../../_infrastructures/models/mongoosed";
import { TripEvent } from "../services/events";
import { ITrip } from "../models/ITrip";
import { ITripRepository } from "../models/ITripRepository";
import { ITripsRepository } from "../models/ITripsRepository";
import TripsRepository from "../../_infrastructures/repositories/TripsRepository";

let schemas: IMongooseSchemas;

beforeAll(async () => {
  schemas = await mongoUtil.beforeAll();
});

afterAll(async () => {
  await mongoUtil.afterAll();
});


let tripRepository: ITripRepository;
let tripsRepository: ITripsRepository;
let serviceBus: ServiceBus;

beforeEach(async () => {
  await mongoUtil.beforeEach();
  tripRepository = new TripRepository(schemas);
  tripsRepository = new TripsRepository(schemas);
  serviceBus = new ServiceBus(tripRepository, tripsRepository);

  const event: TripEvent = {
    type: "TripCreated",
    ownerId: "ownerId",
    tripId: "tripId",
    name: "name",
    fromDate: moment("2019-01-01").toDate(),
    toDate: moment("2019-01-10").toDate(),
    isPublic: true
  };

  await serviceBus.emit(event);

});

it("create trip", async () => {
  expect(await tripRepository.get("ownerId", "tripId"))
    .toMatchSnapshot();
});

it("update trip name", async () => {
  const updateEvent: TripEvent = {
    type: "TripNameUpdated",
    ownerId: "ownerId",
    tripId: "tripId",
    name: "name 2",
    isPublic: true
  };
  await serviceBus.emit(updateEvent);

  expect(await tripRepository.get("ownerId", "tripId"))
    .toMatchSnapshot();
});

test("import trip location", async () => {
  const importEvent: TripEvent = {
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
      fromTime: moment("2019-01-01").toDate(),
      toTime: moment("2019-01-10").toDate(),
      images: [],
    }]
  };
  await serviceBus.emit(importEvent);

  expect(await tripRepository.get("ownerId", "tripId"))
    .toMatchSnapshot();
});


test("import trip location with images", async () => {
  const importEvent: TripEvent = {
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
      fromTime: moment("2019-01-01").toDate(),
      toTime: moment("2019-01-10").toDate(),
      images: [{
        imageId: "imageId01",
        url: "url",
        time: moment("2019-01-01").toDate(),
      }],
    }]
  };
  await serviceBus.emit(importEvent);

  const trip = await tripRepository.get("ownerId", "tripId");
  expect(trip).toBeDefined();
  const img = (trip as ITrip).locations[0].images[0];
  expect(img).toMatchSnapshot();
});

test("upload location image", async () => {
  const importEvent: TripEvent = {
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
      fromTime: moment("2019-01-01").toDate(),
      toTime: moment("2019-01-10").toDate(),
      images: [{
        imageId: "imageId01",
        url: "url",
        time: moment("2019-01-01").toDate(),
      }],
    }]
  };
  await serviceBus.emit(importEvent);

  const uploadImageEvent: TripEvent = {
    type: "LocationImageUploaded",
    ownerId: "ownerId",
    tripId: "tripId",
    locationId: "locationId01",
    imageId: "imageId01",
    externalStorageId: "guid01",
  };
  await serviceBus.emit(uploadImageEvent);
  const trip = await tripRepository.get("ownerId", "tripId");
  expect(trip).toBeDefined();
  const img = (trip as ITrip).locations[0].images[0];
  expect(img).toMatchSnapshot();
});

test("favorite location image", async () => {
  const importEvent: TripEvent = {
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
      fromTime: moment("2019-01-01").toDate(),
      toTime: moment("2019-01-10").toDate(),
      images: [{
        imageId: "imageId01",
        url: "url",
        time: moment("2019-01-01").toDate(),
      }],
    }]
  };
  await serviceBus.emit(importEvent);

  const uploadImageEvent: TripEvent = {
    type: "LocationImagesFavored",
    ownerId: "ownerId",
    tripId: "tripId",
    locationId: "locationId01",
    imageId: "imageId01",
    isFavorite: true
  };
  await serviceBus.emit(uploadImageEvent);
  const trip = await tripRepository.get("ownerId", "tripId");
  expect(trip).toBeDefined();
  const img = (trip as ITrip).locations[0].images[0];
  expect(img.isFavorite).toBe(true);
});


test("add a location image", async () => {
  const importEvent: TripEvent = {
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
      fromTime: moment("2019-01-01").toDate(),
      toTime: moment("2019-01-10").toDate(),
      images: [{
        imageId: "imageId01",
        url: "url",
        time: moment("2019-01-01").toDate(),
      }],
    }]
  };
  await serviceBus.emit(importEvent);

  const uploadImageEvent: TripEvent = {
    type: "LocationImageAdded",
    ownerId: "ownerId",
    tripId: "tripId",
    locationId: "locationId01",
    imageId: "imageId02",
    url: "url2",
    time: moment("2019-01-02").toDate()
  };
  await serviceBus.emit(uploadImageEvent);
  const trip = await tripRepository.get("ownerId", "tripId");
  expect(trip).toBeDefined();
  const location = (trip as ITrip).locations[0];
  expect(location.images).toMatchSnapshot();
});