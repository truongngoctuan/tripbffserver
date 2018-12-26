import { IUserLocalService } from "./_core/services/IUserLocalService";
import { UserLocalService } from "./_infrastructures/services/UserLocalService";

const userLocalService: IUserLocalService = new UserLocalService();
export const IoC = {
  userLocalService
}