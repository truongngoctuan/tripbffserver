import mongoose, { Model, Document } from "mongoose";
import { IUserTripsModel } from "./IUserTripsModel";

const Schema = mongoose.Schema;

export interface IUserTripsDocument extends IUserTripsModel, Document {}

//schema definition, similar to db model
const TripsSchema = new Schema({
  tripId: String,
  name: String,
  fromDate: Date,
  toDate: Date,
  locationImages: [String],
});

export const UserTripsSchema = new Schema({
  userId: String,
  trips: [TripsSchema]
});