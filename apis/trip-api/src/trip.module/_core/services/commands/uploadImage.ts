import { EventHandler, TripEvent } from "../events";
import { TripReducers } from "../reducers/_tripReducer";
import { ServiceBus } from "../TripServiceBus";
import { Succeed } from "../../../../_shared/utils";
import _ from "lodash";

export type UploadImageCommand = {
  type: "uploadImage";
  ownerId: string;
  tripId: string;
  locationId: string;
  imageId: string;
  externalStorageId: string;
};
// todo move to location folder
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
  const { ownerId, tripId, locationId, imageId, externalStorageId } = command;

  //validation: external id
  const state = await reducers.getCurrentState(tripId);
  // console.log("trip state")
  // console.log(state)
  const location = nullCheck(
    _.find(state.locations, loc => loc.locationId == locationId),
    "location not found"
  );

  const event: TripEvent = {
    type: "LocationImageUploaded",
    ownerId,
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
