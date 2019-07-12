import { RegisterNotifyDocument } from "../models/RegisterNotifyModel";

export class RegisterNotifyRepository {

    public async list() {
        var registeredItems = await RegisterNotifyDocument.find();
        return registeredItems;
    } 

    public async insert(registeredItem: any) {
        var registerNotifyDocument = new RegisterNotifyDocument(registeredItem);
        registerNotifyDocument.save();
    }    
}

export default RegisterNotifyRepository