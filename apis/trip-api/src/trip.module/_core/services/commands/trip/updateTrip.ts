import { Succeed } from "../../../../../_shared/utils";
import { TripEvent, EventHandler } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";

export type UpdateTripCommand = {
  type: "updateTrip";
  ownerId: string;
  tripId: string;
  name: string;
  fromDate: Date;
  toDate: Date;
};

export async function updateTrip(command: UpdateTripCommand, eventHandler: EventHandler, reducers: TripReducers, emitter: ServiceBus) {
  const { ownerId, tripId, name, fromDate, toDate } = command;
  
  //validate
  const state = await reducers.getCurrentState(tripId);

  //get current state
  if (state.name == name && state.fromDate == fromDate && state.toDate == toDate) {
    return Succeed();
  }

  const event: TripEvent = {
    type: "TripUpdated",
    ownerId,
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