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
  createdDate: Date;
  isPublic: boolean;
  locationImages: {
    name: string;
    address: string;
    description: string;
    imageUrl?: string;
  }[];
}
