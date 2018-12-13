import { EventHandler, TripEvent } from "../TripEvent";
import { TripReducers } from "../TripReducer";
import { ServiceBus } from "../TripServiceBus";
import { CommandResult, Succeed } from "../../../_shared/utils";
import { Moment } from "moment";

export type CreateTripCommand = {
  type: "createTrip";
  tripId: string;
  name: string;
  fromDate: Moment;
  toDate: Moment;
};

export async function createTrip(command: CreateTripCommand, eventHandler: EventHandler, reducers: TripReducers, emitter: ServiceBus): Promise<CommandResult> {
  //validate

  const { tripId, name, fromDate, toDate } = command;
  var event: TripEvent = {
    type: "TripCreated",
    tripId,
    name,
    fromDate,
    toDate,
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}