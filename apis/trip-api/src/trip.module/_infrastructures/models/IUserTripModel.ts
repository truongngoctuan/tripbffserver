import { IFeelingModel } from "./IFeelingModel";
import { IActivityModel } from "./IActivityModel";
import { IHighlightModel } from "./IHighlightModel";

export interface IUserTripModel {
  userId: string;
  trips: Array<ITripModel>;
}

export interface ITripModel {
  tripId: string;
  name: string;
  fromDate: Date;
  toDate: Date;
  locations?: Array<ITripLocationModel>;
  infographics?: Array<IInfographicModel>;
  isDeleted: boolean;
  createdDate: Date;
  isPublic: boolean;
}

export interface ITripLocationModel {
  locationId: string;
  name: string;
  location: {
    long: number;
    lat: number;
    address: string;
  };
  fromTime: Date;
  toTime: Date;
  images: Array<ITripLocationImageModel>;
  feeling?: IFeelingModel;
  activity?: IActivityModel;
  highlights?: Array<IHighlightModel>;
  description?: string;
}

export interface ITripLocationImageModel {
  imageId: string;
  url: string; //url stored in local mobile
  time: Date;
  externalStorageId?: string; //this id will exist after image binary is uploaded to server
  isFavorite: boolean;
}

export interface IInfographicModel {
  infographicId: string;
  status: string;
  externalStorageId?: string; //this id will exist after image binary is uploaded to server
}
