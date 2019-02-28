import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { CommandResult, Succeed } from "../../../../../_shared/utils";
import { Moment } from "moment";

export type UpdatePatchTripCommand = {
  type: "updatePatchTrip";
  ownerId: string;
  tripId: string;
  fromDate: Moment;
  toDate: Moment;
};

export async function updatePatchTrip(command: UpdatePatchTripCommand, eventHandler: EventHandler, reducers: TripReducers, emitter: ServiceBus): Promise<CommandResult> {
  
  const { ownerId, tripId, fromDate, toDate } = command;
  
  //validate
  const state = await reducers.getCurrentState(tripId);
  
  if (fromDate || toDate) {
    //todo some validations on the data
    var event: TripEvent = {
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