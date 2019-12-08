import mongoose, { Model, Document } from 'mongoose';
import { IUser } from '../../_core/models/IUser';

export interface IUserModel extends IUser, Document { }

const { Schema } = mongoose;

const LoginsSchema = new Schema({
  loginType: String,
  device: {
    uniqueDeviceId: String,
  },
  local: {
    email: String,
    hash: String,
    salt: String,
  },
  facebook: {
    facebookUserId: String,
    accessToken: String,
    id: String,
    name: String,
    first_name: String,
    last_name: String,
  },
  loggedInDate: Date
});

const UsersSchema = new Schema({
  userId: String,
  userName: String,
  fullName: String,
  logins: [LoginsSchema]
});

export const Users: Model<IUserModel> = mongoose.model<IUserModel>(
  "Users",
  UsersSchema
);
export default Users;
