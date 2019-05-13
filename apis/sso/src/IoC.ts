import { IUserLocalService } from "./_core/services/IUserLocalService";
import { UserLocalService } from "./_infrastructures/services/UserLocalService";
import { UserFacebookService } from "./_infrastructures/services/UserFacebookService";

const userLocalService: IUserLocalService = new UserLocalService();
const userFacebookService = new UserFacebookService();
export const IoC = {
  userLocalService,
  userFacebookService
}