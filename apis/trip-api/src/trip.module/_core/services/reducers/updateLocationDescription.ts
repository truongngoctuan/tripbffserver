import { ITrip } from "../../models/ITrip";
import { TripLocationUpdatedDescriptionEvent } from "../events";
import _ from "lodash";

export function updateLocationDescription(
  prevState: ITrip,
  event: TripLocationUpdatedDescriptionEvent
): ITrip {
  return {
    ...prevState,
    locations: prevState.locations.map((item) => {
      return item.locationId !== event.locationId
        ? item
        : {
            ...item,
            description: event.description,
          };
    }),
  };
}
