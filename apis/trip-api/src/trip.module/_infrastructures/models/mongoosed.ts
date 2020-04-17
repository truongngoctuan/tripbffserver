import { Model, Mongoose } from "mongoose";
import { IUserTripDocument, UserTripSchema } from "./UserTripModel";
import { IUserTripsDocument, UserTripsSchema } from "./UserTripsModel";

export interface IMongooseSchemas {
  UserTripDocument: Model<IUserTripDocument>;
  UserTripsDocument: Model<IUserTripsDocument>;
}

export function initSchemas(mongoose: any) {
  const UserTripDocument: Model<IUserTripDocument> = (mongoose as Mongoose).model<
    IUserTripDocument
  >("UserTrip", UserTripSchema);
  const UserTripsDocument: Model<IUserTripsDocument> = (mongoose as Mongoose).model<
    IUserTripsDocument
  >("UserMinimizedTrips", UserTripsSchema);

  const SchemaCollections: IMongooseSchemas = {
    UserTripDocument,
    UserTripsDocument,
  };

  return SchemaCollections;
}
