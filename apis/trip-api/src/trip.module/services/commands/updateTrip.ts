import { Succeed } from "../../../_shared/utils";
import { TripEvent, EventHandler } from "../TripEvent";
import { TripReducers } from "../TripReducer";
import { ServiceBus } from "../TripServiceBus";
import { Moment } from "moment";

export type UpdateTripCommand = {
  type: "updateTrip";
  tripId: string;
  name: string;
  fromDate: Moment;
  toDate: Moment;
};

export async function updateTrip(command: UpdateTripCommand, eventHandler: EventHandler, reducers: TripReducers, emitter: ServiceBus) {
  const { tripId, name, fromDate, toDate } = command;
  
  //validate
  const state = await reducers.getCurrentState(tripId);

  //get current state
  if (state.name == name && state.fromDate == fromDate && state.toDate == toDate) {
    return Succeed();
  }

  var event: TripEvent = {
    type: "TripUpdated",
    tripId,
    name,
    fromDate,
    toDate,
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
};