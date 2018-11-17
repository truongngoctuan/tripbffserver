import { Stream } from "stream";
import fs from "fs";
import { EventHandler, TripEvent } from "../TripEvent";
import { TripReducers } from "../TripReducer";
import { ServiceBus } from "../TripServiceBus";
import { CommandResult, Succeed } from "../../../_shared/utils";

export type UploadImageCommand = {
  type: "uploadImage";
  tripId: string;
  externalId: string;
  fileName: string;
};
export async function uploadImage(
  command: UploadImageCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { tripId, fileName, externalId } = command;

  //validation: external id
  const state = await reducers.getCurrentState(tripId);
  var isExternalIdExisted = false;
  state.locations.forEach(location => {
    if (location.images.filter(img => img.externalId == externalId).length > 0)
      isExternalIdExisted = true;
  });

  if (!isExternalIdExisted) throw "externalId is not found";

  //emit event
}
