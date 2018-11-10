import mongoose, { Model, Document } from "mongoose";
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this is db model, schemas
export interface ITrip {
  name: String;
  fromDate: Date;
  toDate: Date;
}

export interface ITripModel extends ITrip, Document {}

//schema definition, similar to db model
export const TripSchema = new Schema({
  id: String,
  name: String,
  fromDate: Date,
  toDate: Date,
});

export const Trip: Model<ITripModel> = mongoose.model<ITripModel>(
  "Trip",
  TripSchema
);
export default Trip;
