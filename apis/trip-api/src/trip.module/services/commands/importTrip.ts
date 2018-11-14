import { EventHandler, TripEvent } from "../TripEvent";
import { TripReducers } from "../TripReducer";
import { ServiceBus } from "../TripServiceBus";
import { CommandResult, Succeed } from "../../../_shared/utils";
import { ITripLocation } from "../../models/ITrip";

export type ImportTripCommand = {
  type: "importTrip";
  TripId: String;
  locations?: Array<ITripLocation>
};

export async function importTrip(command: ImportTripCommand, eventHandler: EventHandler, reducers: TripReducers, emitter: ServiceBus): Promise<CommandResult> {
  //validate

  const { TripId, locations } = command;
  var event: TripEvent = {
    type: "TripImportLocations",
    TripId,
    locations
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}