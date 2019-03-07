import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { Succeed } from "../../../../../_shared/utils";
import _ from "lodash";
import { ITripLocation } from "../../../models/ITrip";

export type AddLocationCommand = {
  type: "AddLocation";
  ownerId: string;
  tripId: string;
  location: ITripLocation
};

export async function AddLocation(
  command: AddLocationCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { ownerId, tripId, location } = command;

  var event: TripEvent = {
    type: "LocationAdded",
    ownerId,
    tripId,
    location,
  };

  eventHandler.save(event);

  await emitter.emit(event);

  return Succeed();
}
