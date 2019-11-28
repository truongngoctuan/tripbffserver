import mongoose, { Model, Document } from "mongoose";
import { ISearchLocationModel } from "./ISearchLocationModel";

const Schema = mongoose.Schema;

export interface ISearchLocationDocument extends ISearchLocationModel, Document {}

const SearchLocationSchema = new Schema({
    title: String,
    address: String,
    long: Number,
    lat: Number
});

SearchLocationSchema.index({ title: "text" })

export const SearchLocationDocument: Model<ISearchLocationDocument> = mongoose.model<ISearchLocationDocument>(
  "SearchLocation",
  SearchLocationSchema
);
export default SearchLocationDocument;
