import { IUserLocalService } from "./_core/services/IUserLocalService";

import { UserService } from "./_infrastructures/services/UserService";
import { UserLocalService } from "./_infrastructures/services/UserLocalService";
import { UserFacebookService } from "./_infrastructures/services/UserFacebookService";
import { UserDeviceService } from "./_infrastructures/services/UserDeviceService";

const userService = new UserService();

const userLocalService: IUserLocalService = new UserLocalService(userService);
const userFacebookService = new UserFacebookService(userService);
const userDeviceService = new UserDeviceService(userService);

export const IoC = {
  userService,
  userLocalService,
  userFacebookService,
  userDeviceService,
}