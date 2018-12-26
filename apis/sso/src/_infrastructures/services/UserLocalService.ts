import { IUserLocalService } from "../../_core/services/IUserLocalService";
import Users, { IUserModel } from "../models/users";
import { addToSession } from "./custom-session";
import { IUserVM } from "../../_core/models/IUserVM";

function toUserVM(user: IUserModel): IUserVM {
  if (!user) return null;
  return {
    id: user._id,
    email: user.email
  };
}

export class UserLocalService implements IUserLocalService {
  async getById(email: string) {
    const userDb = await Users.findOne({ email });
    return toUserVM(userDb);
  }

  async register(email: any, password: any) {
    const userDb = await Users.findOne({ email });
    if (userDb) throw "user existed";

    const finalUser = new Users({ email });


    finalUser.setPassword(password);

    return finalUser.save().then(() => toUserVM(finalUser));
  }

  async authenticate(email, password) {
    const user = await Users.findOne({ email });

    if (!user || !user.validatePassword(password)) {
      throw { "email or password": "is invalid" };
    }
    return toUserVM(user);
  }

  async login(email: any) {
    const user = await Users.findOne({ email });
    if (!user) {
      throw "email is invalid";
    }

    const authUser = user.toAuthJSON();
    addToSession(authUser.user, authUser.token);

    return authUser;
  }
}
