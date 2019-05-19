import { Moment } from "moment";

export interface ITripMinimized {
  tripId: string;
  name: string;
  fromDate: Moment;
  toDate: Moment;
  locationImages: string[]
}

export interface ITripsRepository {
  list: (ownerId: string) => Promise<Array<ITripMinimized>>;
  create: (ownerId: string, payload: ITripMinimized) => Promise<ITripMinimized>;
  update: (ownerId: string, payload: ITripMinimized) => Promise<void>;
}