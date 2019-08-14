import mongoose, { Model, Document } from "mongoose";
import { IUserSettingModel } from "./interfaces/IUserSettingModel";

const Schema = mongoose.Schema;

export interface IUserSettingDocument extends IUserSettingModel, Document {}

const UserSettingSchema = new Schema({
    userId: String,
    locale: String
});

export const UserSettingDocument: Model<IUserSettingDocument> = mongoose.model<IUserSettingDocument>(
  "UserSetting",
  UserSettingSchema
);
export default UserSettingDocument;
