import { ITrip, IFeeling } from "../../models/ITrip";
import { TripLocationUpdatedFeelingEvent } from "../events";
import _ from "lodash";

export function updateLocationFeeling(
  prevState: ITrip,
  event: TripLocationUpdatedFeelingEvent
): ITrip {

  return {
    ...prevState,
    locations: prevState.locations.map(item => {
        return item.locationId !== event.locationId ? item : {
            ...item,
            feeling: {
                feelingId: event.feelingId,
                label_en: event.label_en,
                label_vi: event.label_vi,
                icon: event.feelingIcon
            }
        }
    })
  };
}