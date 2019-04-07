import mongoose, { Model, Document } from "mongoose";
import { IUserTripModel } from "./IUserTripModel";

const Schema = mongoose.Schema;

export interface IUserTripDocument extends IUserTripModel, Document {}

//schema definition, similar to db model
const TripSchema = new Schema({
  tripId: String,
  name: String,
  fromDate: Date,
  toDate: Date,
  locations: [
    {
      locationId: String,
      name: String,
      location: {
        long: Number,
        lat: Number,
        address: String
      },
      fromTime: Date,
      toTime: Date,
      images: [
        {
          imageId: String,
          url: String
          //todo missing externalId ?
        }
      ],
      feeling: {
        feelingId: Number,
        label: String,
        icon: String
      },
      activity: {
        activityId: Number,
        label: String,
        icon: String
      }
    }
  ],
  infographics: [
    {
      infographicId: String,
      externalStorageId: String,
      status: String
    }
  ]
});

export const UserTripSchema = new Schema({
  userId: String,
  trips: [TripSchema]
});

export const UserTripDocument: Model<IUserTripDocument> = mongoose.model<IUserTripDocument>(
  "UserTrip",
  UserTripSchema
);
export default UserTripDocument;
