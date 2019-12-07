export interface IUser {
  userId: string;
  userName: string;
  fullName: string;
  logins: ILogin[];
}

type ILogin = {
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
  loggedInDate
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
  },
  loggedInDate
};

export type ILoginDevice = {
  loginType: "DEVICE",
  device: {
    uniqueDeviceId: string,
  },
  loggedInDate
};

export interface IUserAuth {
  user: {
    id: string;
    userName: string;
    fullName: string;
    facebook?: {
      accessToken
    },
    locale: string;
  },
  token: string;
}