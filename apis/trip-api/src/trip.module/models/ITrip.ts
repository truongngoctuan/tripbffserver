import { Moment } from "moment";

export interface ITrip {
  id: String,
  name: String,
  fromDate: Moment,
  toDate: Moment,
}