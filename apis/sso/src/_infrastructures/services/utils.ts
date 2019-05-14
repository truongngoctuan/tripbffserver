import { IUserModel } from "../models/users";
import { IUserVM } from "../../_core/models/IUserVM";

export function toUserVM(user: IUserModel | null): IUserVM | null {
  if (!user) return null;
  return {
    id: user.userId,
    userName: user.userName,
  };
}