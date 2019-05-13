import { IUserLocalService } from "../../_core/services/IUserLocalService";
import Users, { IUserModel } from "../models/users";
import { addToSession } from "./custom-session";
import { IUserVM } from "../../_core/models/IUserVM";
import uuid from "uuid/v4";
import crypto from 'crypto';
import { ILoginLocal } from "../../_core/models/IUser";
import _ from "lodash";

function toUserVM(user: IUserModel | null): IUserVM | null {
  if (!user) return null;
  return {
    id: user.userId,
    userName: user.userName,
  };
}


function getUserLoginLocal(email: string, password: string): ILoginLocal {

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return {
    loginType: "LOCAL",
    local: {
      email,
      salt, hash
    }
  };
};

function validatePassword(userLogin: ILoginLocal, password: string) {
  const hash = crypto.pbkdf2Sync(password, userLogin.local.salt, 10000, 512, 'sha512').toString('hex');
  return userLogin.local.hash === hash;
};

export class UserLocalService implements IUserLocalService {
  async getById(email: string) {
    const userDb = await Users.findOne({ userName: email });
    return toUserVM(userDb);
  }

  async register(email: any, password: any) {
    const userDb = await Users.findOne({ userName: email });
    if (userDb) throw "user existed";

    let userLogin: ILoginLocal = getUserLoginLocal(email, password);

    const finalUser = new Users({
      userId: uuid(),
      userName: email,
      logins: [userLogin]
    });


    return finalUser.save().then(() => toUserVM(finalUser));
  }

  async authenticate(email, password) {
    const user = await Users.findOne({ userName: email });
    const userLoginLocal = _.find(user.logins, login => login.loginType == "LOCAL");

    if (!user || !validatePassword(userLoginLocal, password)) {
      throw { "email or password": "is invalid" };
    }
    return toUserVM(user);
  }

  async login(email: any) {
    const user = await Users.findOne({ userName: email });
    if (!user) {
      throw "email is invalid";
    }

    const authUser = user.toAuthJSON();
    // addToSession(authUser.user, authUser.token);

    return authUser;
  }
}
