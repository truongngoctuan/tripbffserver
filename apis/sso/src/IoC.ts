import { IUserLocalService } from "./_core/services/IUserLocalService";
import { UserLocalService } from "./_infrastructures/services/UserLocalService";
import { UserFacebookService } from "./_infrastructures/services/UserFacebookService";
import { UserDeviceService } from "./_infrastructures/services/UserDeviceService";

const userLocalService: IUserLocalService = new UserLocalService();
const userFacebookService = new UserFacebookService();
const userDeviceService = new UserDeviceService();
export const IoC = {
  userLocalService,
  userFacebookService,
  userDeviceService,
}