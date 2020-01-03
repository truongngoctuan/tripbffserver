import { ITrip } from "../../_core/models/ITrip";
import { Moment } from "moment";

export interface IUserTripRepository {  
  list: (fromDate: Moment, toDate: Moment) => Promise<Array<ITrip>>;
}