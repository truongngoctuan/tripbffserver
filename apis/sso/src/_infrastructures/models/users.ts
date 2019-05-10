import mongoose, { Model, Document } from 'mongoose';
import { IUser } from '../../_core/models/IUser';
const jwt = require('jsonwebtoken');


export interface IUserModel extends IUser, Document {}

const { Schema } = mongoose;

const LoginsSchema = new Schema({
  loginType: String,
  local: {
    email: String,
    hash: String,
    salt: String,
  },
  facebook: Object,
});

const UsersSchema = new Schema({
  userId: String,
  userName: String,
  logins: [LoginsSchema]
});

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  //todo use another secret that read from a private.key generated from RSA 256
  return jwt.sign({
    userName: this.userName,
    id: this.userId,
    exp: expirationDate.getTime() / 1000 // parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret',{
    // algorithm: 'RS256',
  });
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    user: {
      id: this.userId,
      email: this.userName
    },
    token: this.generateJWT()
  };
};

export const Users: Model<IUserModel> = mongoose.model<IUserModel>(
  "Users",
  UsersSchema
);
export default Users;
