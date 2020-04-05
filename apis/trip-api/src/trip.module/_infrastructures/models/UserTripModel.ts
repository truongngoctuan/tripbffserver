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
      description: String,
      images: [
        {
          imageId: String,
          url: String,
          time: Date,
          externalStorageId: String,
          isFavorite: Boolean,
        }
      ],
      feeling: {
        feelingId: String,
        label_en: String,
        label_vi: String,
        icon: String
      },
      activity: {
        activityId: String,
        label_en: String,
        label_vi: String,
        icon: String
      },
      highlights: [
        {
          highlightId: String,
          label_en: String,
          label_vi: String,
          highlightType: String
        }
      ]
    }
  ],
  infographics: [
    {
      infographicId: String,
      externalStorageId: String,
      status: String
    }
  ],
  isDeleted: Boolean,
  createdDate: Date,
  isPublic: Boolean
});

export const UserTripSchema = new Schema({
  userId: String,
  trips: [TripSchema]
});

// export const UserTripDocument: Model<IUserTripDocument> = mongoose.model<IUserTripDocument>(
//   "UserTrip",
//   UserTripSchema
// );
// console.log("should have new schemas UserTripDocument from here");
// // console.log(mongoose.connection);
// export default UserTripDocument;
