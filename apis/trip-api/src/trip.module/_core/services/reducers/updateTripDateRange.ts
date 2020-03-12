import { ITrip, ITripLocation } from "../../models/ITrip";
import _ from "lodash";
import { TripDateRangeUpdatedEvent } from "../events/TripEvents";
import moment from "moment";

export function updateTripDateRange(
  prevState: ITrip,
  command: TripDateRangeUpdatedEvent
): ITrip {

  const { fromDate, toDate } = command;

  let filteredLocations: ITripLocation[] = [];

  filteredLocations = prevState.locations.filter(loc => 
    (!fromDate || moment(fromDate) <= moment(loc.fromTime)) &&
    (!toDate || moment(loc.toTime) <= moment(toDate)));  
 
  return {
    ...prevState,
    fromDate: fromDate ? fromDate : prevState.fromDate,
    toDate: toDate ? toDate : prevState.toDate,
    locations: filteredLocations
  };
}