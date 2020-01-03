import { IUserTripRepository } from "./IUserTripRepository";
import moment, { Moment } from "moment";
import _ from "lodash";
import { IMongooseSchemas } from "../models/mongoosed";

export class UserTripRepository implements IUserTripRepository {
  constructor(private _mg: IMongooseSchemas) {
  }   

  public async list(fromDate: Moment, toDate: Moment) {
    var userTrips = await this._mg.UsersDocument
    .aggregate(
      [{$match: {
        logins: 
          { 
            $elemMatch: 
            { 
              "loginType": "DEVICE", 
              "loggedInDate":
                { 
                  $gt: fromDate.toDate(),
                  $lt: toDate.toDate()
                }
            }
      
                }
      }}, {$lookup: {
        from: 'usertrips',
        localField: 'userId',
        foreignField: 'userId',
        as: 'trip'
      }}]);    
      
    return userTrips;
  } 
}

export default UserTripRepository;
