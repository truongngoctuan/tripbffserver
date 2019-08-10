export interface IUser {
  userId: string;
  userName: string;
  fullName: string;
  logins: ILogin[];
  locale: string;
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
    id?: string;
    name?: string;
    first_name?: string;
    last_name?: string;
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
    fullName: string;
    facebook?: {
      accessToken
    },
    locale: string;
  },
  token: string;
}