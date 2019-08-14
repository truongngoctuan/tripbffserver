import { IUserSetting } from "./IUserSetting";

export interface IUserSettingRepository {
  update: (setting: IUserSetting) => Promise<void>; 
}
