import mongoose, { Model, Document } from "mongoose";
const Schema = mongoose.Schema;

export interface IUserSettingModel {
    userId: string;
    locale: string;
}

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
