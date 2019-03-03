import { ITrip, ITripLocation } from "../../models/ITrip";
import _ from "lodash";
import { TripDateRangeUpdatedEvent } from "../events/TripEvents";

export function updateTripDateRange(
  prevState: ITrip,
  command: TripDateRangeUpdatedEvent
): ITrip {

  const { fromDate, toDate } = command;

  var filteredLocations: ITripLocation[] = [];
  if (fromDate) {
    filteredLocations = prevState.locations.filter(loc => fromDate <= loc.fromTime );
  }

  if (toDate) {
    filteredLocations = prevState.locations.filter(loc => loc.toTime <= toDate);
  }
  return {
    ...prevState,
    fromDate: fromDate ? fromDate : prevState.fromDate,
    toDate: toDate ? toDate : prevState.toDate,
    locations: filteredLocations
  };
}