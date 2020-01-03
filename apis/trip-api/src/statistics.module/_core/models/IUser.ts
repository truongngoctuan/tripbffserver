import { IUserTripModel } from "../../../trip.module/_infrastructures/models/IUserTripModel";

export interface IUser {
  userId: string;
  userName: string;
  fullName: string;
  logins: ILogin[];
}

export type ILogin = {
  loginType: "login type..."
}
  | ILoginLocal
  | ILoginFacebook
  | ILoginDevice
  ;

export type ILoginLocal = {
  loginType: "LOCAL",
  local: {
    email: string;
    hash: string;
    salt: string;
  },
  loggedInDate: Date
}

export type ILoginFacebook = {
  loginType: "FACEBOOK",
  facebook: {
    facebookUserId: string,
    accessToken: string,
    id?: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    email?: string
  },
  loggedInDate: Date
};

export type ILoginDevice = {
  loginType: "DEVICE",
  device: {
    uniqueDeviceId: string,
  },
  loggedInDate: Date
};

