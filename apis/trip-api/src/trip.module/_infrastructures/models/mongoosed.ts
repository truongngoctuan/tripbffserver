import { Model, Mongoose } from "mongoose";
import { IUserTripDocument, UserTripSchema } from "./UserTripModel";



export interface IMongooseSchemas {
  UserTripDocument: Model<IUserTripDocument>
}

export function initSchemas(mongoose: any) {
  const UserTripDocument: Model<IUserTripDocument> = (mongoose as Mongoose).model<IUserTripDocument>(
    "UserTrip",
    UserTripSchema
  );

  const SchemaCollections: IMongooseSchemas = {
    UserTripDocument
  }

  return SchemaCollections;
}