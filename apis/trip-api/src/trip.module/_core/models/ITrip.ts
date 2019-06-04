import { Moment } from "moment";

export interface ITrip {
  tripId: string;
  name: string;
  fromDate: Moment;
  toDate: Moment;
  locations: Array<ITripLocation>;
  infographics: Array<IInfographic>;
  isDeleted: boolean
}

export interface ITripLocation {
  locationId: string;
  name: string,
  location: {
    long: number;
    lat: number;
    address: string;
  };
  fromTime: Moment;
  toTime: Moment;
  images: Array<ITripLocationImage>;
  description?: string;
  feeling?: IFeeling;
  activity?: IActivity;
  highlights?: Array<IHighlight>;
}

export interface ITripLocationImage {
  imageId: string;
  time: Moment;
  url: string; //url stored in local mobile, if it failed in upload, it can start to upload again
  externalUrl: string;
  thumbnailExternalUrl: string;
  externalStorageId?: string; //this id will exist after image binary is uploaded to server
  isFavorite: boolean;
}

export interface IInfographic {
  infographicId: string;
  status: InfographicStatus;
  externalStorageId?: string; //this id will exist after image binary is uploaded to server
}

export type InfographicStatus = "CREATED" | "EXPORTED" | "FAILED";

export interface IFeeling {
  feelingId: number,
  label: string,
  icon: string
}

export interface IActivity {
  activityId: number,
  label: string,
  icon: string
}

export interface IHighlight {
  highlightId: string,
  label: string,
  highlightType: string
}