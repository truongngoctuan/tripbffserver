import { IUserAuth } from "../models/IUser";
import { IUserVM } from "../models/IUserVM";

export interface IUserLocalService {
  getById(email: string): Promise<IUserVM | null>;
  register(email: any, password: any): Promise<IUserVM>;
  authenticate(email: any, password: any): Promise<IUserVM>;
  login(email: any): Promise<IUserAuth>;

}