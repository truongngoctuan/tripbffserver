import { Succeed } from "../../../../../_shared/utils";
import { TripEvent, EventHandler } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";

export type DeleteTripCommand = {
  type: "deleteTrip";
  ownerId: string;
  tripId: string;
  isDeleted: boolean;
};

export async function deleteTrip(command: DeleteTripCommand, eventHandler: EventHandler, reducers: TripReducers, emitter: ServiceBus) {
  const { ownerId, tripId, isDeleted } = command;
  
  var event: TripEvent = {
    type: "TripDeleted",
    ownerId,
    tripId,
    isDeleted
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
};