import { Succeed } from "../../../_shared/utils";
import { TripEvent, EventHandler } from "../TripEvent";
import { TripReducers } from "../TripReducer";
import { ServiceBus } from "../TripServiceBus";

export type UpdateTripCommand = {
  type: "updateTrip";
  TripId: String;
  name: String;
  fromDate: Date;
  toDate: Date;
};

export async function updateTrip(command: UpdateTripCommand, eventHandler: EventHandler, reducers: TripReducers, emitter: ServiceBus) {
  //validate

  const { TripId, name, fromDate, toDate } = command;
  const state = await reducers.getCurrentState(TripId);

  //get current state
  if (state.name == name && state.fromDate == fromDate && state.toDate == toDate) {
    return Succeed();
  }

  var event: TripEvent = {
    type: "TripUpdated",
    TripId,
    name,
    fromDate,
    toDate,
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
};