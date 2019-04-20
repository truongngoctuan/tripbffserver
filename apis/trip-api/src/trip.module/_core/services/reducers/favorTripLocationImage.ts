
import { ITrip } from "../../models/ITrip";
import { TripLocationImageFavoredEvent } from "../events";
import _ from "lodash";

export function favorTripLocationImage(
  prevState: ITrip,
  command: TripLocationImageFavoredEvent
): ITrip {

  //get location
  var locationIdx = _.findIndex(
    prevState.locations,
    loc => loc.locationId == command.locationId
  );

  var location = prevState.locations[locationIdx];

  //get image
  var imageIdx = _.findIndex(
    location.images,
    img => img.imageId == command.imageId
  );
  var image = location.images[imageIdx];
  image.isFavorite = command.isFavorite;

  //update state
  location.images = [
    ...location.images.slice(0, imageIdx),
    image,
    ...location.images.slice(imageIdx + 1)
  ];
  return {
    ...prevState,
    locations: [
      ...prevState.locations.slice(0, locationIdx),
      location,
      ...prevState.locations.slice(locationIdx + 1)
    ]
  };
}