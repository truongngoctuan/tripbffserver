import { ITrip } from "../../models/ITrip";
import { TripLocationUpdatedHighlightEvent } from "../events";
import _ from "lodash";

export function updateLocationHighlight(
  prevState: ITrip,
  event: TripLocationUpdatedHighlightEvent
): ITrip {
  return {
    ...prevState,
    locations: prevState.locations.map((item) => {
      return item.locationId !== event.locationId
        ? item
        : {
            ...item,
            highlights: event.highlights,
          };
    }),
  };
}
