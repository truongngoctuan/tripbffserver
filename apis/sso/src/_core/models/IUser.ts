export interface IUser {
  userId: string;
  userName: string;
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
  }
}

export type ILoginFacebook = {
  loginType: "FACEBOOK",
  facebook: {
    facebookUserId: string,
    accessToken: string,
  }
};

export type ILoginDevice = {
  loginType: "DEVICE",
  device: {
    uniqueDeviceId: string,
  }
};

export interface IUserAuth {
  user: {
    id: string;
    userName: string;
    facebook?: {
      accessToken
    }
  },
  token: string;
}