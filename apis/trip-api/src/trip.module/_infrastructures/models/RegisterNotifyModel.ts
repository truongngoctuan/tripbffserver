import mongoose, { Model, Document } from "mongoose";
const Schema = mongoose.Schema;

export type IRegisterNotifyDocument = Document

const RegisterNotifySchema = new Schema({
    email: String,
    createdDate: Date
});

export const RegisterNotifyDocument: Model<IRegisterNotifyDocument> = mongoose.model<IRegisterNotifyDocument>(
  "RegisterNotify",
  RegisterNotifySchema
);

export default RegisterNotifyDocument;
