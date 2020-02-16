import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { CommandResult, Succeed } from "../../../../../_shared/utils";

export type UpdatePatchTripCommand = {
  type: "updatePatchTrip";
  ownerId: string;
  tripId: string;
  name: string;
  fromDate: Date;
  toDate: Date;
};

export async function updatePatchTrip(command: UpdatePatchTripCommand, eventHandler: EventHandler, reducers: TripReducers, emitter: ServiceBus): Promise<CommandResult> {
  
  const { ownerId, tripId, name, fromDate, toDate } = command;
  
  //validate
  const state = await reducers.getCurrentState(tripId);

  if (name) {
    //todo some validations on the data
    const event: TripEvent = {
      type: "TripNameUpdated",
      ownerId,
      tripId,
      name
    };

    eventHandler.save(event);

    //update read store synchronously
    await emitter.emit(event);
  }

  if (fromDate || toDate) {
    //todo some validations on the data
    const event: TripEvent = {
      type: "TripDateRangeUpdated",
      ownerId,
      tripId,
      fromDate,
      toDate,
    };

    eventHandler.save(event);

    //update read store synchronously
    await emitter.emit(event);
  }

  //todo handle multi-event that 
  return Succeed();
}