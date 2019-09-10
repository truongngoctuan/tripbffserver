import { ITripsRepository, ITripMinimized } from "../../_core/models/ITripsRepository";
import { ITrip, InfographicStatus } from "../../_core/models/ITrip";
import moment from "moment";
import _ from "lodash";
import { ITripModel } from "../models/IUserTripModel";
import { IMongooseSchemas } from "../models/mongoosed";
import { ITripsModel } from "../models/IUserTripsModel";

export class TripsRepository implements ITripsRepository {
  constructor(private _mg: IMongooseSchemas) {

  }

  private toTripDto(o: ITripsModel): ITripMinimized {
    return {
      tripId: o.tripId,
      name: o.name,
      fromDate: moment(o.fromDate),
      toDate: moment(o.toDate),
      locationImages: o.locationImages,
      isDeleted: o.isDeleted
    };
  }

  private async getUserTrips(userId: string) {
    return await this._mg.UserTripsDocument.findOne({ userId }).exec();
  }

  public async getById(ownerId: string, tripId: string) {
    var userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) return undefined;

    var trip = _.find(userTrips.trips, trip => trip.tripId === tripId);
    if (!trip) return undefined;
    return this.toTripDto(trip);    
  }

  public async list(ownerId: string) {
    var userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) return [];

    return userTrips.trips.map(item => this.toTripDto(item));
  }

  public async create(ownerId: string, payload: ITripMinimized) {
    const { tripId, name, fromDate, toDate, locationImages, isDeleted } = payload;

    var trip: ITripsModel = {
      tripId,
      name,
      fromDate: moment(fromDate).toDate(),
      toDate: moment(toDate).toDate(),
      locationImages,
      isDeleted: isDeleted
    }

    var userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) {
      userTrips = new this._mg.UserTripsDocument({
        userId: ownerId
      });
    }

    userTrips.trips.push(trip);
    await userTrips.save();

    var tripModel = userTrips.trips[userTrips.trips.length - 1];

    return this.toTripDto(tripModel);
  }

  public async update(ownerId: string, payload: ITripMinimized) {
    var userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) throw "can't find Trip from user id = " + ownerId;

    var trip = _.find(userTrips.trips, trip => trip.tripId === payload.tripId);
    if (!trip) throw "can't find Trip with id = " + payload.tripId;

    trip.name = payload.name;
    trip.fromDate = payload.fromDate.toDate();
    trip.toDate = payload.toDate.toDate();
    trip.locationImages = payload.locationImages;
    trip.isDeleted = payload.isDeleted;

    await userTrips.save();
  }
}

export default TripsRepository;
