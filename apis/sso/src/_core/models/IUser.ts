export interface IUser {
  email: string;
  hash: string;
  salt: string;
  setPassword(password: string);
  validatePassword(password: string): boolean;
  generateJWT(): string;
  toAuthJSON(): IUserAuth;
}

export interface IUserAuth {
  user: {
    id: string;
    email: string;
  },
  token: string;
}