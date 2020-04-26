export interface ITrip {
  userId: string;
  tripId: string;
  name: string;
  fromDate: Date;
  toDate: Date;
  infographics: Array<IInfographic>;
  isDeleted: boolean;
  isPublic: boolean;
}

export interface IInfographic {
  infographicId: string;
  status: InfographicStatus;
  externalStorageId?: string; //this id will exist after image binary is uploaded to server
}

export type InfographicStatus = "CREATED" | "EXPORTED" | "FAILED";
