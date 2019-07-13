import { RegisterNotifyDocument } from "../models/RegisterNotifyModel";

export class RegisterNotifyRepository {
    toRegisterdItem(o: any): any {
        return {
            email: o.email,
            createdDate: o.createdDate
        }
    }

    public async list() {
        var registeredItems = await RegisterNotifyDocument.find();
        return registeredItems.map(it => this.toRegisterdItem(it));
    } 

    public async insert(registeredItem: any) {
        var registerNotifyDocument = new RegisterNotifyDocument(registeredItem);
        registerNotifyDocument.save();
    }    
}

export default RegisterNotifyRepository