import { ITrip, ITripLocation } from "../../models/ITrip";
import _ from "lodash";
import { TripDateRangeUpdatedEvent } from "../events/TripEvents";
import moment from "moment";

export function updateTripDateRange(
  prevState: ITrip,
  command: TripDateRangeUpdatedEvent
): ITrip {

  const { fromDate, toDate } = command;

  var filteredLocations: ITripLocation[] = [];


  if (fromDate) {
    filteredLocations = prevState.locations.filter(loc => moment(fromDate) <= moment(loc.fromTime));
  }

  if (toDate) {
    filteredLocations = prevState.locations.filter(loc => moment(loc.toTime) <= moment(toDate));
  }

  return {
    ...prevState,
    fromDate: fromDate ? fromDate : prevState.fromDate,
    toDate: toDate ? toDate : prevState.toDate,
    locations: filteredLocations
  };
}