import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { CommandResult, Succeed } from "../../../../../_shared/utils";
import { Moment } from "moment";

export type CreateTripCommand = {
  type: "createTrip";
  ownerId: string;
  tripId: string;
  name: string;
  fromDate: Moment;
  toDate: Moment;
};

export async function createTrip(command: CreateTripCommand, eventHandler: EventHandler, reducers: TripReducers, emitter: ServiceBus): Promise<CommandResult> {
  //validate
  //todo validation on fromDate, toDate
  //todo add error code as 
  const { ownerId, tripId, name, fromDate, toDate } = command;
  const event: TripEvent = {
    type: "TripCreated",
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
}