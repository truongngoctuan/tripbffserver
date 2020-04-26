import mongoose, { Model, Document } from "mongoose";
import { IUserFeedbackModel } from "./interfaces/IUserFeedbackModel";

const Schema = mongoose.Schema;

export interface IUserFeedbackDocument extends IUserFeedbackModel, Document {}

const UserFeedbackSchema = new Schema({
  userId: String,
  feedback: String,
  email: String,
});

export const UserFeedbackDocument: Model<IUserFeedbackDocument> = mongoose.model<
  IUserFeedbackDocument
>("UserFeedback", UserFeedbackSchema);
export default UserFeedbackDocument;
