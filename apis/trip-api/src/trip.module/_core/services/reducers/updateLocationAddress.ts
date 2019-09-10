import { ITrip } from "../../models/ITrip";
import { TripLocationUpdatedAddressEvent } from "../events";
import _ from "lodash";

export function updateLocationAddress(
  prevState: ITrip,
  event: TripLocationUpdatedAddressEvent
): ITrip {

  return {
    ...prevState,
    locations: prevState.locations.map(item => {
        return item.locationId !== event.locationId ? item : {
            ...item,
            name: event.name,
            location: {
                address: event.address,
                long: event.long,
                lat: event.lat
            }
        }
    })
  };
}