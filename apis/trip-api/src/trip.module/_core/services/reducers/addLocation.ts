import { ITrip } from "../../models/ITrip";
import { TripLocationAddedEvent } from "../TripEvent";
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