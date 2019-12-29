import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { Succeed } from "../../../../../_shared/utils";
import _ from "lodash";
import { Moment } from "moment";

export type AddLocationImageCommand = {
  type: "AddLocationImage";
  ownerId: string;
  tripId: string;
  locationId: string;
  imageId: string;
  url: string;
  time: Moment;
};

export async function AddLocationImage(
  command: AddLocationImageCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { ownerId, tripId, locationId, imageId, url, time } = command;

  const event: TripEvent = {
    type: "LocationImageAdded",
    ownerId,
    tripId,
    locationId,
    imageId, url, time,
  };

  eventHandler.save(event);

  await emitter.emit(event);

  return Succeed();
}
