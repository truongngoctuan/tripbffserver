import { IFeelingModel } from "./IFeelingModel";
import { IActivityModel } from "./IActivityModel";
import { IHighlightModel } from "./IHighlightModel";

export interface IUserTripsModel {
  userId: string;
  trips: Array<ITripsModel>;
}

export interface ITripsModel {
  tripId: string;
  name: string;
  fromDate: Date;
  toDate: Date;
  isDeleted: boolean;
  locationImages: {
    name: string;
    address: string;
    description: string;
    imageUrl: string;
  }[];
}