import mongoose, { Model, Document } from "mongoose";
import { IFeelingModel } from "./IFeelingModel";
import { IActivityModel } from "./IActivityModel";

const Schema = mongoose.Schema;

export interface IActivityDocument extends IActivityModel, Document {}

const ActivitySchema = new Schema({
  activityId: String,
  label_en: String,
  label_vi: String,
  icon: String,
});

export const ActivityDocument: Model<IActivityDocument> = mongoose.model<
  IActivityDocument
>("Activity", ActivitySchema);

export default ActivityDocument;
