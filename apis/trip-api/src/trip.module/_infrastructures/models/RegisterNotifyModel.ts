import mongoose, { Model, Document } from "mongoose";
const Schema = mongoose.Schema;

export interface IRegisterNotifyDocument extends Document {}

const RegisterNotifySchema = new Schema({
    email: String,
    createdDate: Date
});

export const RegisterNotifyDocument: Model<IRegisterNotifyDocument> = mongoose.model<IRegisterNotifyDocument>(
  "RegisterNotify",
  RegisterNotifySchema
);

export default RegisterNotifyDocument;
