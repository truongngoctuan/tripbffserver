import mongoose, { Model, Document } from "mongoose";
import { IFeelingModel } from "./IFeelingModel";

const Schema = mongoose.Schema;

export interface IFeelingDocument extends IFeelingModel, Document {}

const FeelingSchema = new Schema({
  feelingId: String,
  label_en: String,
  label_vi: String,
  icon: String,
});

export const FeelingDocument: Model<IFeelingDocument> = mongoose.model<
  IFeelingDocument
>("Feeling", FeelingSchema);
export default FeelingDocument;
