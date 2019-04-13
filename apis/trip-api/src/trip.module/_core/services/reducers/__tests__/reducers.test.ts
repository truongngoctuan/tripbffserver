import {
  TripReducers
} from "../_tripReducer";
import moment from "moment";
import { TripEvent, ITripEventRepository } from "../../events";
import { TripCreatedEvent } from "../../events/TripEvents";
import { ITripLocation } from "../../../models/ITrip";

test('hello world example', () => {
  var tripReducer = new TripReducers();
  expect(tripReducer.helloWorld()).toBe("hello world");
});

class MockTripEventRepository implements ITripEventRepository {
  constructor(private events: TripEvent[]) { }

  save: (event: TripEvent) => Promise<void>;
  getAll = (id: string): Promise<TripEvent[]> => {
    return new Promise<TripEvent[]>((resolve, reject) => {
      resolve(this.events);
    })
  };

}

test('create trip', async () => {
  var tripEventRepository = new MockTripEventRepository([{
    type: "TripCreated",
    ownerId: "ownerId",
    tripId: "tripId",
    name: "name",
    fromDate: moment('2019-01-01'),
    toDate: moment('2019-01-10')
  }]);

  var tripReducer = new TripReducers(tripEventRepository);
  return tripReducer.getCurrentState("tripId")
    .then(data => {
      expect(data).toMatchSnapshot();
    });
});


test('update trip name', async () => {
  var tripEventRepository = new MockTripEventRepository([
    {
      type: "TripCreated",
      ownerId: "ownerId",
      tripId: "tripId",
      name: "name",
      fromDate: moment('2019-01-01'),
      toDate: moment('2019-01-10')
    },
    {
      type: "TripNameUpdated",
      ownerId: "ownerId",
      tripId: "tripId",
      name: "name 2",
    }
  ]);

  var tripReducer = new TripReducers(tripEventRepository);
  return tripReducer.getCurrentState("tripId")
    .then(data => {
      expect(data).toMatchSnapshot();
    });
});


test('import trip location', async () => {
  var tripEventRepository = new MockTripEventRepository([
    {
      type: "TripCreated",
      ownerId: "ownerId",
      tripId: "tripId",
      name: "name",
      fromDate: moment('2019-01-01'),
      toDate: moment('2019-01-10')
    },
    {
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
      }] as ITripLocation[]
    }
  ]);

  var tripReducer = new TripReducers(tripEventRepository);
  return tripReducer.getCurrentState("tripId")
    .then(data => {
      expect(data).toMatchSnapshot();
    });
});


test('upload location image', async () => {
  var tripEventRepository = new MockTripEventRepository([
    {
      type: "TripCreated",
      ownerId: "ownerId",
      tripId: "tripId",
      name: "name",
      fromDate: moment('2019-01-01'),
      toDate: moment('2019-01-10')
    },
    {
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
          thumbnailExternalUrl: "" //todo why do I require this data ?
        }],
      }] as ITripLocation[]
    },
    {
      type: "LocationImageUploaded",
      ownerId: "ownerId",
      tripId: "tripId",
      locationId: "locationId01",
      imageId: "imageId01",
      externalStorageId: "guid01",
    }
  ]);

  var tripReducer = new TripReducers(tripEventRepository);
  return tripReducer.getCurrentState("tripId")
    .then(data => {
      expect(data).toMatchSnapshot();
    });
});