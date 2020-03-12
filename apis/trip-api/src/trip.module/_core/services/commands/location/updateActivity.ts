import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { Succeed } from "../../../../../_shared/utils";

export type UpdateLocationActivityCommand = {
  type: "UpdateLocationActivity";
  ownerId: string;
  tripId: string;
  locationId: string;
  activityId: string;
  label_en: string;
  label_vi: string;
  activityIcon: string;
};

export async function UpdateLocationActivity(
  command: UpdateLocationActivityCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { ownerId, tripId, locationId, activityId, label_en, label_vi, activityIcon } = command;

  const event: TripEvent = {
    type: "LocationActivityUpdated",
    ownerId,
    tripId,
    locationId,
    activityId,
    label_en,
    label_vi,
    activityIcon
  };

  eventHandler.save(event);

  await emitter.emit(event);

  return Succeed();
}
