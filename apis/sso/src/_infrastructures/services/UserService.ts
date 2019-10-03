
import { IUser, IUserAuth, ILoginFacebook } from "../../_core/models/IUser";
import { LOGIN_TYPE } from "../../_core/models/constants";
const jwt = require('jsonwebtoken');
import _ from "lodash";
import Users from "../models/users";
import UserSettingDocument from "../models/userSettings";
import { toUserVM } from "./utils";

export class UserService {

  async getById(userId: string) {
    const userDb = await Users.findOne({ userId: userId });
    return userDb;
  }

  async getAuthObject(userObject: IUser): Promise<IUserAuth> {
    const facebookLogin = _.find(userObject.logins, login => login.loginType == LOGIN_TYPE.FACEBOOK) as ILoginFacebook;
    let userSetting = await UserSettingDocument.findOne({userId: userObject.userId});
    return {
      user: {
        id: userObject.userId,
        userName: userObject.userName,
        fullName: userObject.fullName,
        facebook: facebookLogin == null ? undefined : {
          accessToken: facebookLogin.facebook.accessToken
        },
        locale: userSetting ? userSetting.locale : null
      },
      token: this.generateJWT(userObject),
    };
  }

  generateJWT(userObject: IUser) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    //todo use another secret that read from a private.key generated from RSA 256
    return jwt.sign({
      userName: userObject.userName,
      id: userObject.userId,
      exp: expirationDate.getTime() / 1000 // parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret', {
        // algorithm: 'RS256',
      });
  }

  async insertDefaultLocale(userId, locale) {
    var userSetting = new UserSettingDocument({
      userId: userId,
      locale: locale
    });
    userSetting.save();
  }
}