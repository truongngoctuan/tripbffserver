import mongoose, { Model, Document } from 'mongoose';
import { IUser } from '../../_core/models/IUser';

export interface IUserModel extends IUser, Document { }

const { Schema } = mongoose;

const LoginsSchema = new Schema({
  loginType: String,
  local: {
    email: String,
    hash: String,
    salt: String,
  },
  facebook: {
    facebookUserId: String,
    accessToken: String,
  },
});

const UsersSchema = new Schema({
  userId: String,
  userName: String,
  logins: [LoginsSchema]
});

export const Users: Model<IUserModel> = mongoose.model<IUserModel>(
  "Users",
  UsersSchema
);
export default Users;
