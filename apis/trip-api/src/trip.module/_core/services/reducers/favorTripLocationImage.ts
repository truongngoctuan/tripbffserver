import { ITrip } from "../../models/ITrip";
import { TripLocationImageFavoredEvent } from "../events";
import _ from "lodash";

export function favorTripLocationImage(
  prevState: ITrip,
  command: TripLocationImageFavoredEvent
): ITrip {
  //get location
  const locationIdx = _.findIndex(
    prevState.locations,
    (loc) => loc.locationId == command.locationId
  );

  const location = prevState.locations[locationIdx];

  if (location) {
    //get image
    const imageIdx = _.findIndex(
      location.images,
      (img) => img.imageId == command.imageId
    );
    const image = location.images[imageIdx];

    if (image) {
      image.isFavorite = command.isFavorite;

      //update state
      location.images = [
        ...location.images.slice(0, imageIdx),
        image,
        ...location.images.slice(imageIdx + 1),
      ];
      return {
        ...prevState,
        locations: [
          ...prevState.locations.slice(0, locationIdx),
          location,
          ...prevState.locations.slice(locationIdx + 1),
        ],
      };
    }
  }

  return prevState;
}
