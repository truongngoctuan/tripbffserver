import { UserFeedbackRepository } from "./_infrastructures/repositories/UserFeedbackRepository";
import { UserSettingRepository } from "./_infrastructures/repositories/UserSettingRepository";

const userFeedbackRepository = new UserFeedbackRepository();
const userSettingRepository = new UserSettingRepository();

export const IoC = {
  userFeedbackRepository,
  userSettingRepository,
};
