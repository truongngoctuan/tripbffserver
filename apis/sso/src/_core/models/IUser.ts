export interface IUser {
  userId: string;
  userName: string;
  logins: ILogin[];

  setPassword(password: string);
  validatePassword(password: string): boolean;
  generateJWT(): string;
  toAuthJSON(): IUserAuth;
}

type ILogin = {
  loginType: "login type..."
}
| ILoginLocal
| ILoginFacebook
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
    userId: string,
    email: string,
  }
};

export interface IUserAuth {
  user: {
    id: string;
    userName: string;
  },
  token: string;
}