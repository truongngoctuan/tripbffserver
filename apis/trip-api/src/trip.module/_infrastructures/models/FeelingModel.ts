import mongoose, { Model, Document } from "mongoose";
import { IFeelingModel } from "./IFeelingModel";

const Schema = mongoose.Schema;

export interface IFeelingDocument extends IFeelingModel, Document {}

const FeelingSchema = new Schema({
    feelingId: String,
    label: String,
    icon: String
});

export const FeelingDocument: Model<IFeelingDocument> = mongoose.model<IFeelingDocument>(
  "Feeling",
  FeelingSchema
);
export default FeelingDocument;
