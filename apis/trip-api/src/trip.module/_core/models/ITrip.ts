export interface ITrip {
  tripId: string;
  name: string;
  fromDate: Date;
  toDate: Date;
  locations: Array<ITripLocation>;
  infographics: Array<IInfographic>;
  isDeleted: boolean;
  createdById: string;
}

export interface ITripLocation {
  locationId: string;
  name: string;
  location: {
    long: number;
    lat: number;
    address: string;
  };
  fromTime: Date;
  toTime: Date;
  images: Array<ITripLocationImage>;
  description?: string;
  feeling?: IFeeling;
  activity?: IActivity;
  highlights?: Array<IHighlight>;
}

export interface ITripLocationImage {
  imageId: string;
  time: Date;
  url: string; //url stored in local mobile, if it failed in upload, it can start to upload again
  externalUrl?: string;
  thumbnailExternalUrl?: string;
  externalStorageId?: string; //this id will exist after image binary is uploaded to server
  isFavorite: boolean;
}

export interface IInfographic {
  infographicId: string;
  status: InfographicStatus;
  externalStorageId?: string; //this id will exist after image binary is uploaded to server
}

export type InfographicStatus = "CREATED" | "EXPORTED" | "FAILED" | "SHARED";

export interface IFeeling {
  feelingId: string;
  label_en: string;
  label_vi: string;
  icon: string;
}

export interface IActivity {
  activityId: string;
  label_en: string;
  label_vi: string;
  icon: string;
}

export interface IHighlight {
  highlightId: string;
  label_en: string;
  label_vi: string;
  highlightType: string;
}