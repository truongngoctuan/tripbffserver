import { IUserLocalService } from "../../_core/services/IUserLocalService";
import { UserService } from "./UserService";
import Users from "../models/users";
import UserSettingDocument from "../models/userSettings";
import uuid from "uuid/v4";
import crypto from 'crypto';
import { ILoginLocal } from "../../_core/models/IUser";
import _ from "lodash";
import { toUserVM } from "./utils";
import { IoC } from "../../IoC";

function getUserLoginLocal(email: string, password: string): ILoginLocal {

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return {
    loginType: "LOCAL",
    local: {
      email,
      salt, hash
    },
    loggedInDate: new Date()
  };
};

function validatePassword(userLogin: ILoginLocal, password: string) {
  const hash = crypto.pbkdf2Sync(password, userLogin.local.salt, 10000, 512, 'sha512').toString('hex');
  return userLogin.local.hash === hash;
};

export class UserLocalService implements IUserLocalService {

  constructor(private _userService: UserService) {

  }

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
      fullName: "Quest",
      logins: [userLogin]
    });

    return finalUser.save().then(() => toUserVM(finalUser));
  }

  async authenticate(email, password) {
    const user = await Users.findOne({ userName: email });
    const userLoginLocal = _.find(user.logins, login => login.loginType == "LOCAL") as ILoginLocal;

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

    const authUser = this._userService.getAuthObject(user);
    // addToSession(authUser.user, authUser.token);

    return authUser;
  }
}
