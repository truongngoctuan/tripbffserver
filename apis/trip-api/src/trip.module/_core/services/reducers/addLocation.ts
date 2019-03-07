import { ITrip } from "../../models/ITrip";
import { TripLocationAddedEvent } from "../events";
import _ from "lodash";

export function addLocation(
  prevState: ITrip,
  command: TripLocationAddedEvent
): ITrip {

  return {
    ...prevState,
    locations: [
      ...prevState.locations,
      command.location
    ]
  };
}