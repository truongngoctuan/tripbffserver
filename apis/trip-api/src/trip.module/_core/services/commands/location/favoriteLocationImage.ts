import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { Succeed, BadRequest } from "../../../../../_shared/utils";
import _ from "lodash";

export type FavoriteLocationImageCommand = {
  type: "FavoriteLocationImage";
  ownerId: string;
  tripId: string;
  locationId: string;
  imageId: string;
  isFavorite: boolean;
};

export async function FavoriteLocationImage(
  command: FavoriteLocationImageCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { ownerId, tripId, locationId, imageId, isFavorite } = command;

  const state = await reducers.getCurrentState(tripId);
  const location = _.find(state.locations, loc => loc.locationId == locationId);
  if (!location) return BadRequest("LocationNotFound")

  const image = _.find(location.images, img => img.imageId == imageId);
  if (!image) return BadRequest("LocationImageNotFound");
  if (image.isFavorite != isFavorite) {

    var event: TripEvent = {
      type: "LocationImagesFavored",
      ownerId,
      tripId,
      locationId,
      imageId,
      isFavorite
    };
  
    eventHandler.save(event);
  
    //update read store synchronously
    await emitter.emit(event);
  }
  //consider success here even we haven't add any event in our system

  return Succeed();
}
