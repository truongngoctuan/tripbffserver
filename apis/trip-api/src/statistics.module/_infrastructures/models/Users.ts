import mongoose, { Model, Document } from 'mongoose';
import { IUser } from '../../_core/models/IUser';

export interface IUserDocument extends IUser, Document { }

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
    email: String
  },
  loggedInDate: Date
});

export const UsersSchema = new Schema({
  userId: String,
  userName: String,
  fullName: String,
  logins: [LoginsSchema]
});

