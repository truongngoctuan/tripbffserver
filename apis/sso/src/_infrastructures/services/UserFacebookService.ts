import { IUserLocalService } from "../../_core/services/IUserLocalService";
import Users, { IUserModel } from "../models/users";
import { addToSession } from "./custom-session";
import { IUserVM } from "../../_core/models/IUserVM";
import uuid from "uuid/v4";
import crypto from 'crypto';
import { ILoginLocal, ILoginFacebook } from "../../_core/models/IUser";
import _ from "lodash";
import axios from "axios";

const FACEBOOK_APP_ID = '2341289862566899';
const FACEBOOK_APP_SECRET = 'fb968c05bbcda85d56acd9c50304750f';

function toUserVM(user: IUserModel | null): IUserVM | null {
  if (!user) return null;
  return {
    id: user.userId,
    userName: user.userName,
  };
}

function getUserName(facebookUserId: string) {
  return "facebook:" + facebookUserId;
}

export class UserFacebookService {
  async getById(facebookUserId: string) {
    const userDb = await Users.findOne({ userName: getUserName(facebookUserId) });
    return toUserVM(userDb);
  }

  async register(facebookUserId: string, access_token: string) {
    const userDb = await Users.findOne({ userName: getUserName(facebookUserId) });
    if (userDb) throw "user existed";

    const verifyResult = await this.getVerification(access_token);

    const { app_id, user_id, is_valid } = verifyResult;


    if (app_id != FACEBOOK_APP_ID || !is_valid) {
      throw "verify facebook access token failed";
    }

    //todo should check user_id

    let userLogin: ILoginFacebook = {
      loginType: "FACEBOOK",
      facebook: {
        ...verifyResult,
        facebookUserId,
      }
    }

    const finalUser = new Users({
      userId: uuid(),
      userName: getUserName(facebookUserId),
      logins: [userLogin]
    });

    return finalUser.save().then(() => toUserVM(finalUser));
  }

  async authenticate(facebookUserId: string, access_token: string) {
    const { app_id, user_id, is_valid } = await this.getVerification(access_token);

    const user = await Users.findOne({ userName: getUserName(facebookUserId) });
    const userLoginFacebook: ILoginFacebook = _.find(user.logins, login => login.loginType == "FACEBOOK");

    if (app_id == FACEBOOK_APP_ID
      && userLoginFacebook
      && userLoginFacebook.facebook.facebookUserId == user_id
      && is_valid) {
      return true;
    }
    
    console.log("facebook authentication failed");
    return false;
  }


  async login(facebookUserId: string) {
    const userDb = await Users.findOne({ userName: getUserName(facebookUserId) });
    return userDb.toAuthJSON();
  }

  async getVerification(access_token: string) {
    console.log("access_token", access_token);

    //todo: cache appResult
    const appLink = 'https://graph.facebook.com/oauth/access_token?client_id=' + FACEBOOK_APP_ID + '&client_secret=' + FACEBOOK_APP_SECRET + '&grant_type=client_credentials'
    var appResult = await axios.get(appLink);
    console.log("appResult", appResult.data);

    const appToken = appResult.data.access_token;
    console.log("appToken", appToken);

    const verifyLink = 'https://graph.facebook.com/debug_token?input_token=' + access_token + '&access_token=' + appToken;

    var verifyResult = await axios.get(verifyLink);
    console.log("verifyResult", verifyResult.data.data);
    return verifyResult.data.data;
  }

}
