import { Moment } from "moment";

export interface ITripMinimized {
  tripId: string;
  name: string;
  fromDate: Moment;
  toDate: Moment;
  isDeleted: boolean;
  locationImages: {
    name: string;
    address: string;
    description: string;
    imageUrl: string;
  }[];
}

export interface ITripsRepository {
  list: (ownerId: string) => Promise<Array<ITripMinimized>>;
  create: (ownerId: string, payload: ITripMinimized) => Promise<ITripMinimized>;
  update: (ownerId: string, payload: ITripMinimized) => Promise<void>;
  getById: (ownerId: string, tripId: string) => Promise<ITripMinimized | undefined>;
}