import { Moment } from "moment";
import { IUserTrip } from "../../_core/models/IUserTrip";

export interface IUserTripRepository {  
  list: (fromDate: Moment, toDate: Moment) => Promise<Array<IUserTrip>>;
}