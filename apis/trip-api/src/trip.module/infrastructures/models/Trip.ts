import mongoose, { Model, Document } from "mongoose";
import { ITripLocation, IInfographic } from "../../models/ITrip";
import { string } from "joi";

// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//todo re-use ITrip model from core
// this is db model, schemas
export interface ITrip {
  ownerId: string;
  name: string;
  fromDate: Date;
  toDate: Date;
  locations: Array<ITripLocation>;
  infographics: Array<IInfographic>;
}

export interface ITripModel extends ITrip, Document {}

//schema definition, similar to db model
export const TripSchema = new Schema({
  ownerId: String,
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
          url: String
          //todo missing externalId ?
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
  ]
});

export const Trip: Model<ITripModel> = mongoose.model<ITripModel>(
  "Trip",
  TripSchema
);
export default Trip;
