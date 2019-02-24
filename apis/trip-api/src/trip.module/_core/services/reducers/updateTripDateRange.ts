import { ITrip } from "../../models/ITrip";
import _ from "lodash";
import { TripDateRangeUpdatedEvent } from "../events/TripEvents";

export function updateTripDateRange(
  prevState: ITrip,
  command: TripDateRangeUpdatedEvent
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