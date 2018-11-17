import { Moment } from "moment";

export interface ITrip {
  id: String,
  name: String,
  fromDate: Moment,
  toDate: Moment,
  locations: Array<ITripLocation>
}

export interface ITripLocation {
    locationId: Number,
    location: {
        long: Number,
        lat: Number,
        address: String
    },
    fromTime: Moment,
    toTime: Moment,
    images: [
        {
            url: String, //url stored in local mobile
            externalId: string,
        }
    ]
}