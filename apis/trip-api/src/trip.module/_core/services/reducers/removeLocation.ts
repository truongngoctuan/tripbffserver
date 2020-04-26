import { ITrip } from "../../models/ITrip";
import { TripLocationRemovedEvent } from "../events";
import _ from "lodash";

export function removeLocation(
  prevState: ITrip,
  command: TripLocationRemovedEvent
): ITrip {
  return {
    ...prevState,
    locations: prevState.locations.filter(
      (lo) => lo.locationId != command.locationId
    ),
  };
}
