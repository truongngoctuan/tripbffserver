
import { ITrip } from "../../models/ITrip";
import { TripLocationImagesRemovedEvent } from "../events";
import _ from "lodash";

export function removeTripLocationImages(
  prevState: ITrip,
  command: TripLocationImagesRemovedEvent
): ITrip {

  //get location
  const locationIdx = _.findIndex(
    prevState.locations,
    loc => loc.locationId == command.locationId
  );

  const location = prevState.locations[locationIdx];

  if (location) {
    location.images = _.remove(location.images, 
      img => _.indexOf(command.imageIds, img.imageId) == -1);
  
    return {
      ...prevState,
      locations: [
        ...prevState.locations.slice(0, locationIdx),
        location,
        ...prevState.locations.slice(locationIdx + 1)
      ]
    };
  }
  
  return prevState;
}