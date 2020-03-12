import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { Succeed } from "../../../../../_shared/utils";
import { IHighlight } from "../../../models/ITrip";

export type UpdateLocationHighlightCommand = {
  type: "UpdateLocationHighlight";
  ownerId: string;
  tripId: string;
  locationId: string;
  highlights: Array<IHighlight>;
};

export async function UpdateLocationHighlight(
  command: UpdateLocationHighlightCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { ownerId, tripId, locationId, highlights } = command;

  const event: TripEvent = {
    type: "LocationHighlightUpdated",
    ownerId,
    tripId,
    locationId,
    highlights
  };

  eventHandler.save(event);

  await emitter.emit(event);

  return Succeed();
}
