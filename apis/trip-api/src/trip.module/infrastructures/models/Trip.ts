import mongoose, { Model, Document } from "mongoose";
import { ITripLocation } from "../../models/ITrip";

// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this is db model, schemas
export interface ITrip {
  name: string;
  fromDate: Date;
  toDate: Date;
  locations: Array<ITripLocation>
}

export interface ITripModel extends ITrip, Document {}

//schema definition, similar to db model
export const TripSchema = new Schema({
  id: String,
  name: String,
  fromDate: Date,
  toDate: Date,
  locations: [
    {
      locationId: String,
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
              url: String,
          }
      ]
    }
  ]
});

export const Trip: Model<ITripModel> = mongoose.model<ITripModel>(
  "Trip",
  TripSchema
);
export default Trip;
