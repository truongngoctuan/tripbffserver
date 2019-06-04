import { ITrip } from "../../models/ITrip";
import _ from "lodash";
import { TripDeletedEvent  } from "../events/TripEvents";

export function deleteTrip(
  prevState: ITrip,
  command: TripDeletedEvent
): ITrip {

  const { isDeleted } = command;

  return {
    ...prevState,
    isDeleted: isDeleted
  };
}