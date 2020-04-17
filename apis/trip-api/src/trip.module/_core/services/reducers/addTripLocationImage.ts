import { ITrip, ITripLocationImage } from "../../models/ITrip";
import { TripLocationImageAddedEvent } from "../events";
import _ from "lodash";

export function addTripLocationImage(
  prevState: ITrip,
  command: TripLocationImageAddedEvent
): ITrip {
  //get location
  const locationIdx = _.findIndex(
    prevState.locations,
    (loc) => loc.locationId == command.locationId
  );

  const location = prevState.locations[locationIdx];

  const { imageId, url, time } = command;
  const newImage: ITripLocationImage = {
    imageId,
    url,
    time,
    externalUrl: "", //todo: should it be optional ?
    thumbnailExternalUrl: "",
    isFavorite: false,
  };
  //update state
  location.images.push(newImage);
  location.images = _.sortBy(location.images, [(img) => img.time]);

  return {
    ...prevState,
    locations: [
      ...prevState.locations.slice(0, locationIdx),
      location,
      ...prevState.locations.slice(locationIdx + 1),
    ],
  };
}
