import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { Succeed } from "../../../../../_shared/utils";

export type UpdateLocationDescriptionCommand = {
  type: "UpdateLocationDescription",
  ownerId: string,
  tripId: string,
  locationId: string,
  description: string
};

export async function UpdateLocationDescription(
  command: UpdateLocationDescriptionCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { ownerId, tripId, locationId, description } = command;

  var event: TripEvent = {
    type: "LocationDescriptionUpdated",
    ownerId,
    tripId,
    locationId,
    description
  };

  eventHandler.save(event);

  await emitter.emit(event);

  return Succeed();
}
