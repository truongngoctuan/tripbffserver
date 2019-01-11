import { ITrip } from "../../models/ITrip";
import { TripLocationRemovedEvent } from "../TripEvent";
import _ from "lodash";

export function removeLocation(
  prevState: ITrip,
  command: TripLocationRemovedEvent
): ITrip {

  //get location
  var locationIdx = _.findIndex(
    prevState.locations,
    loc => loc.locationId == command.locationId
  );

  return {
    ...prevState,
    locations: [
      ...prevState.locations.slice(0, locationIdx),
      ...prevState.locations.slice(locationIdx + 1)
    ]
  };
}