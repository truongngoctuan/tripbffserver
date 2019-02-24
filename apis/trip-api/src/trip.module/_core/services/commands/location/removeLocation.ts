import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { Succeed, BadRequest } from "../../../../../_shared/utils";
import _ from "lodash";

export type RemoveLocationCommand = {
  type: "RemoveLocation";
  ownerId: string;
  tripId: string;
  locationId: string;
};

export async function RemoveLocation(
  command: RemoveLocationCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { ownerId, tripId, locationId } = command;

  const state = await reducers.getCurrentState(tripId);

  const location = _.find(state.locations, loc => loc.locationId == locationId);
  if (!location) return BadRequest("LocationNotFound");

  var event: TripEvent = {
    type: "LocationRemoved",
    ownerId,
    tripId,
    locationId,
  };

  eventHandler.save(event);

  await emitter.emit(event);

  return Succeed();
}
