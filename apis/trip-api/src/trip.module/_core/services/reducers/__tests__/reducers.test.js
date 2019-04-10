import {
  TripReducers
} from "../_tripReducer";
import moment from "moment";

test('hello world example', () => {
  var tripReducer = new TripReducers();
  expect(tripReducer.helloWorld()).toBe("hello world");
});

test('get event', async () => {
  //todo do a proper mock
  var tripEventRepository = {
    getAll: (id) => {
      return [{
        type: "TripCreated",
        ownerId: "ownerId",
        tripId: "tripId",
        name: "name",
        fromDate: moment('2019-01-01'),
        toDate: moment('2019-01-10')
      }];
    }
  };

  var tripReducer = new TripReducers(tripEventRepository);
  return tripReducer.getCurrentState("tripId")
    .then(data => {
      expect(data).toMatchSnapshot();
    });
})