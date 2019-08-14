import { IUserSettingRepository } from "../../_core/models/IUserSettingRepository";
import { IUserSetting } from "../../_core/models/IUserSetting";
import UserSettingDocument from "../models/UserSettingModel";

export class UserSettingRepository implements IUserSettingRepository {

    public async update(userSetting: IUserSetting) {
        var { userId, locale } = userSetting;
        var settingDocument = await UserSettingDocument.findOne({ userId: userId});

        if (settingDocument) {
            settingDocument.locale = locale;
            settingDocument.save();
        }  
    } 
}

export default UserSettingRepository;