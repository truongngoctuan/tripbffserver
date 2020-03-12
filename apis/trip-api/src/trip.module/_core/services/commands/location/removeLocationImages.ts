import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { Succeed, BadRequest } from "../../../../../_shared/utils";
import _ from "lodash";

export type RemoveLocationImagesCommand = {
  type: "RemoveLocationImages";
  ownerId: string;
  tripId: string;
  locationId: string;
  imageIds: string[];
};

export async function RemoveLocationImages(
  command: RemoveLocationImagesCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { ownerId, tripId, locationId, imageIds } = command;

  const state = await reducers.getCurrentState(tripId);
  const location = _.find(state.locations, loc => loc.locationId == locationId);
  if (!location) return BadRequest("LocationNotFound");

  imageIds.forEach(imageId => {
    if (!_.find(location.images, img => img.imageId == imageId)) return BadRequest("LocationImageNotFound");
  });

  const event: TripEvent = {
    type: "LocationImagesRemoved",
    ownerId,
    tripId,
    locationId,
    imageIds,
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}
