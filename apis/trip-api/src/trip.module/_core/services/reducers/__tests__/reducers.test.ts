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

  save = (event: TripEvent): Promise<void> => {
    return new Promise(() => {});
  };
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

test('remove location images', async () => {
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
        }],
      }] as ITripLocation[]
    },
    {
      type: "LocationImagesRemoved",
      ownerId: "ownerId",
      tripId: "tripId",
      locationId: "locationId01",
      imageIds: ["imageId01"],
    }
  ]);

  var tripReducer = new TripReducers(tripEventRepository);
  return tripReducer.getCurrentState("tripId")
    .then(data => {
      expect(data.locations[0].images).toMatchSnapshot();
    });
});


test('remove location multi mages', async () => {
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
        },
        {
          imageId: "imageId02",
          url: "url",
          externalUrl: "",
          thumbnailExternalUrl: ""
        },
        {
          imageId: "imageId03",
          url: "url",
          externalUrl: "",
          thumbnailExternalUrl: ""
        },
        {
          imageId: "imageId04",
          url: "url",
          externalUrl: "",
          thumbnailExternalUrl: ""
        },],
      }] as ITripLocation[]
    },
    {
      type: "LocationImagesRemoved",
      ownerId: "ownerId",
      tripId: "tripId",
      locationId: "locationId01",
      imageIds: ["imageId01", "imageId03"],
    }
  ]);

  var tripReducer = new TripReducers(tripEventRepository);
  return tripReducer.getCurrentState("tripId")
    .then(data => {
      expect(data.locations[0].images.map(img => img.imageId)).toMatchSnapshot();
    });
});

test('favorite location image', async () => {
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
        }],
      }] as ITripLocation[]
    },
    {
      type: "LocationImagesFavored",
      ownerId: "ownerId",
      tripId: "tripId",
      locationId: "locationId01",
      imageId: "imageId01",
      isFavorite: true
    }
  ]);

  var tripReducer = new TripReducers(tripEventRepository);
  return tripReducer.getCurrentState("tripId")
    .then(data => {
      expect(data.locations[0].images[0].isFavorite).toBe(true);
    });
});


test('un-favorite location image', async () => {
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
        }],
      }] as ITripLocation[]
    },
    {
      type: "LocationImagesFavored",
      ownerId: "ownerId",
      tripId: "tripId",
      locationId: "locationId01",
      imageId: "imageId01",
      isFavorite: true
    },
    {
      type: "LocationImagesFavored",
      ownerId: "ownerId",
      tripId: "tripId",
      locationId: "locationId01",
      imageId: "imageId01",
      isFavorite: false
    }
  ]);

  var tripReducer = new TripReducers(tripEventRepository);
  return tripReducer.getCurrentState("tripId")
    .then(data => {
      expect(data.locations[0].images[0].isFavorite).toBe(false);
    });
});



test('add a location image', async () => {
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
          time: moment('2019-01-01'),
        }],
      }] as ITripLocation[]
    },
    {
      type: "LocationImageAdded",
      ownerId: "ownerId",
      tripId: "tripId",
      locationId: "locationId01",
      imageId: "imageId02",
      url: "url2",
      time: moment('2019-01-02'),
    }
  ]);

  var tripReducer = new TripReducers(tripEventRepository);
  return tripReducer.getCurrentState("tripId")
    .then(data => {
      expect(data.locations[0].images).toMatchSnapshot();
    });
});