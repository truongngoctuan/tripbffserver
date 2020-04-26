import { IUserTripRepository } from "./IUserTripRepository";
import moment, { Moment } from "moment";
import _ from "lodash";
import { IMongooseSchemas } from "../models/mongoosed";
import { IUserTrip } from "../../_core/models/IUserTrip";

export class UserTripRepository implements IUserTripRepository {
  constructor(private _mg: IMongooseSchemas) {}

  public async list(
    fromDate: Moment,
    toDate: Moment
  ): Promise<Array<IUserTrip>> {
    const userTrips = await this._mg.UsersDocument.aggregate([
      {
        $match: {
          logins: {
            $elemMatch: {
              loginType: "DEVICE",
              loggedInDate: {
                $gt: fromDate.toDate(),
                $lt: toDate.toDate(),
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "usertrips",
          localField: "userId",
          foreignField: "userId",
          as: "trip",
        },
      },
      {
        $project: {
          userId: 1,
          logins: {
            loginType: 1,
            loggedInDate: 1,
          },
          trip: {
            trips: {
              infographics: 1,
            },
          },
        },
      },
    ]);

    return userTrips.map((item) => {
      const userTrip: IUserTrip = {
        userId: item.userId,
        logins: item.logins,
        trips: item.trip.length > 0 ? item.trip[0].trips : [],
      };
      return userTrip;
    });
  }
}

export default UserTripRepository;
