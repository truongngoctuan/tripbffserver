import Users from "../models/users";
import uuid from "uuid/v4";
import { ILoginFacebook } from "../../_core/models/IUser";
import _ from "lodash";
import axios from "axios";
import { UserService } from "./UserService";
import { toUserVM } from "./utils";
import { LOGIN_TYPE } from "../../_core/models/constants";
import { IoC } from "../../IoC";

const FACEBOOK_APP_ID = '2341289862566899';
const FACEBOOK_APP_SECRET = 'fb968c05bbcda85d56acd9c50304750f';

function getUserName(facebookUserId: string) {
  return "facebook:" + facebookUserId;
}

type FbDebugTokenReturn = {
  app_id: string,
  user_id: string,
  is_valid: boolean,
}

type FbProfileReturn = {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
}

export class UserFacebookService {

  constructor(private _userService: UserService) {

  }

  async getById(facebookUserId: string) {
    const userDb = await Users.findOne({ userName: getUserName(facebookUserId) });
    return toUserVM(userDb);
  }

  async register(facebookUserId: string, access_token: string, logged_user_id: string, facebook_user_email: string) {
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
        accessToken: access_token,
        email: facebook_user_email
      },
      loggedInDate: new Date()
    }

    let finalUser;

    if (logged_user_id) {
      finalUser = await IoC.userService.getById(logged_user_id);
      finalUser.logins.push(userLogin);
      finalUser.userName = getUserName(facebookUserId);
    }
    else {
      finalUser = new Users({
        userId: uuid(),
        userName: getUserName(facebookUserId),
        logins: [userLogin]
      });
    }

    return finalUser.save().then(() => toUserVM(finalUser));
  }

  async authenticate(facebookUserId: string, app_id: string, user_id: string, is_valid: boolean) {
    const user = await Users.findOne({ userName: getUserName(facebookUserId) });
    const userLoginFacebook = _.find(user.logins, login => login.loginType == LOGIN_TYPE.FACEBOOK) as ILoginFacebook;

    if (app_id == FACEBOOK_APP_ID
      && userLoginFacebook
      && userLoginFacebook.facebook.facebookUserId == user_id
      && is_valid) {
      return true;
    }

    console.log("facebook authentication failed");
    return false;
  }

  async login(facebookUserId: string, new_access_token: string) {
    const userDb = await Users.findOne({ userName: getUserName(facebookUserId) });
    // console.log("user db", userDb);
    const loginIndex = _.findIndex(userDb.logins, login => login.loginType == LOGIN_TYPE.FACEBOOK);
    let login = userDb.logins[loginIndex] as ILoginFacebook;
    // console.log("user db login " + loginIndex, login);
    login.facebook.accessToken = new_access_token;
    userDb.logins[loginIndex] = login;

    if (!login.facebook.name) {
      const facebookProfile = await this.getUserProfile(new_access_token);
      login.facebook = {
        ...login.facebook,
        ...facebookProfile
      }
      userDb.fullName = facebookProfile.name;
    }

    return userDb.save().then(() => this._userService.getAuthObject(userDb));
  }

  async getVerification(access_token: string): Promise<FbDebugTokenReturn> {
    console.log("access_token", access_token);

    //todo: cache appResult
    const appLink = 'https://graph.facebook.com/oauth/access_token?client_id=' + FACEBOOK_APP_ID + '&client_secret=' + FACEBOOK_APP_SECRET + '&grant_type=client_credentials'
    var appResult = await axios.get(appLink);
    // console.log("appResult", appResult.data);

    const appToken = appResult.data.access_token;
    console.log("appToken", appToken);

    const verifyLink = 'https://graph.facebook.com/debug_token?input_token=' + access_token + '&access_token=' + appToken;

    var verifyResult = await axios.get(verifyLink);
    console.log("verifyResult", verifyResult.data.data);
    return verifyResult.data.data;
  }

  async getUserProfile(accessToken: string) {
    var profileResult: FbProfileReturn = await axios.get(`https://graph.facebook.com/me?fields=id,name,first_name,last_name&access_token=${accessToken}`)
      .then(json => json.data);

    console.log("user data from graph", profileResult);
    // var user = {
    //   // Some user object has been set up somewhere, build that user here
    //   email: profileResult.email ? profileResult.email : profileResult.id,
    //   password: '123456',
    //   username: profileResult.name,
    //   lastName: "",
    //   firstName: "",
    //   fullName: profileResult.name
    // };
    // console.log(user);
    return profileResult
  }
}
