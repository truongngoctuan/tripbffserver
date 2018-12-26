import { IUserAuth, IUser } from "../models/IUser";
import { IUserVM } from "../models/IUserVM";

export interface IUserLocalService {
  getById(email: string): Promise<IUserVM>;
  register(email, password): Promise<IUserVM>;
  authenticate(email, password): Promise<IUserVM>;
  login(email): Promise<IUserAuth>;

}