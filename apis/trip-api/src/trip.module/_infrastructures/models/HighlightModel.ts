import mongoose, { Model, Document } from "mongoose";
import { IHighlightModel } from "./IHighlightModel";

const Schema = mongoose.Schema;

export interface IHighlightDocument extends IHighlightModel, Document {}

const HighlightSchema = new Schema({
  highlightId: String,
  label_en: String,
  label_vi: String,
  highlightType: String,
});

export const HighlightDocument: Model<IHighlightDocument> = mongoose.model<
  IHighlightDocument
>("Highlight", HighlightSchema);

export default HighlightDocument;
