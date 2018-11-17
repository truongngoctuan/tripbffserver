import mongoose, { Model, Document } from "mongoose";
const Schema = mongoose.Schema;

// this is db model, schemas
export interface IFile {
  externalId: String;
  category: String;
  fileName: String;
}

export interface IFileModel extends IFile, Document {}

//schema definition, similar to db model
export const FileSchema = new Schema({
  externalId: String,
  category: String,
  fileName: String,
});

export const File: Model<IFileModel> = mongoose.model<IFileModel>(
  "File",
  FileSchema
);
export default File;
