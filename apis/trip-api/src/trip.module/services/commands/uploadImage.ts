import { Stream } from "stream";
import fs from "fs";
import { EventHandler, TripEvent } from "../TripEvent";
import { TripReducers } from "../TripReducer";
import { ServiceBus } from "../TripServiceBus";
import { CommandResult, Succeed } from "../../../_shared/utils";
import _ from "lodash";
import { assert } from "joi";

export type UploadImageCommand = {
  type: "uploadImage";
  tripId: string;
  locationId: string;
  imageId: string;
  externalStorageId: string;
};

//todo move this utils function to somewhere else
function nullCheck<T>(value: T | undefined, message: string): T {
  if (value) {
    return value as T;
  }
  throw message;
}

export async function uploadImage(
  command: UploadImageCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { tripId, locationId, imageId, externalStorageId } = command;

  //validation: external id
  const state = await reducers.getCurrentState(tripId);
  // console.log("trip state")
  // console.log(state)
  const location = nullCheck(
    _.find(state.locations, loc => loc.locationId == locationId),
    "location not found"
  );
  const image = nullCheck(
    _.find(location.images, img => img.imageId == imageId),
    "image not found"
  );

  var event: TripEvent = {
    type: "LocationImageUploaded",
    tripId,
    locationId,
    imageId,
    externalStorageId
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}
