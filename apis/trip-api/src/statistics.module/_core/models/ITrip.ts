import { Moment } from "moment";

export interface ITrip {  
  userId: string;
  tripId: string;
  name: string;
  fromDate: Moment;
  toDate: Moment;
  infographics: Array<IInfographic>;
  isDeleted: boolean
}

export interface IInfographic {
  infographicId: string;
  status: InfographicStatus;
  externalStorageId?: string; //this id will exist after image binary is uploaded to server
}

export type InfographicStatus = "CREATED" | "EXPORTED" | "FAILED";
