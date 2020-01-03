import { Model, Mongoose } from "mongoose";
import { IUserTripDocument, UserTripSchema } from "./UserTripModel";
import { IUserDocument, UsersSchema } from "./Users";

export interface IMongooseSchemas {
  UserTripsDocument: Model<IUserTripDocument>
  UsersDocument: Model<IUserDocument>
}

export function initSchemas(mongoose: any) {
  console.log('mongoose models: ' + mongoose.models);
  const UserTripsDocument: Model<IUserTripDocument> = 
     mongoose.models && mongoose.models.UserTrip
        ? mongoose.models.UserTrip 
        : (mongoose as Mongoose).model<IUserTripDocument>("UserTrip", UserTripSchema
  );
  const UsersDocument: Model<IUserDocument> = (mongoose as Mongoose).model<IUserDocument>(
    "Users",
    UsersSchema
  );

  const SchemaCollections: IMongooseSchemas = {
    UserTripsDocument,
    UsersDocument
  }

  return SchemaCollections;
}