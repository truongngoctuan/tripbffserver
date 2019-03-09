import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { Succeed } from "../../../../../_shared/utils";

export type UpdateLocationFeelingCommand = {
  type: "UpdateLocationFeeling",
  ownerId: string,
  tripId: string,
  locationId: string,
  feelingId: number,
  feelingLabel: string
};

export async function UpdateLocationFeeling(
  command: UpdateLocationFeelingCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { ownerId, tripId, locationId, feelingId, feelingLabel } = command;

  var event: TripEvent = {
    type: "LocationFeelingUpdated",
    ownerId,
    tripId,
    locationId,
    feelingId,
    feelingLabel
  };

  eventHandler.save(event);

  await emitter.emit(event);

  return Succeed();
}
