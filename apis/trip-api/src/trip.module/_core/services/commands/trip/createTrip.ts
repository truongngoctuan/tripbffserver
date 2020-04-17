import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { CommandResult, Succeed } from "../../../../../_shared/utils";

export type CreateTripCommand = {
  type: "createTrip";
  ownerId: string;
  tripId: string;
  name: string;
  fromDate: Date;
  toDate: Date;
  isPublic: boolean;
};

export async function createTrip(
  command: CreateTripCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
): Promise<CommandResult> {
  //validate
  //todo validation on fromDate, toDate
  //todo add error code as
  const { ownerId, tripId, name, fromDate, toDate, isPublic } = command;
  const event: TripEvent = {
    type: "TripCreated",
    ownerId,
    tripId,
    name,
    fromDate,
    toDate,
    isPublic,
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}
