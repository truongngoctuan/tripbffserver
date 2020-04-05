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

  private toTripDto(o: ITripsModel, loggedUserId: string, createdTripUserId: string): ITripMinimized {
    return {
      tripId: o.tripId,
      name: o.name,
      fromDate: moment(o.fromDate).toDate(),
      toDate: moment(o.toDate).toDate(),
      locationImages: o.locationImages,
      isDeleted: o.isDeleted,
      createdById: createdTripUserId,
      canContribute: loggedUserId == createdTripUserId,
      isPublic: o.isPublic
    };
  }

  private async getUserTrips(userId: string) {
    return await this._mg.UserTripsDocument.findOne({ userId }).exec();
  }
  
  public async getById(ownerId: string, tripId: string) {
    const userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) return undefined;

    const trip = _.find(userTrips.trips, trip => trip.tripId === tripId);
    if (!trip) return undefined;
    return this.toTripDto(trip, ownerId, ownerId);    
  }

  public async list(ownerId: string) {
    const userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) return [];

    return userTrips.trips.map(item => this.toTripDto(item, ownerId, ownerId));
  }

  private async getPublicTrips() {
    return await this._mg.UserTripsDocument.find({ "trips.isPublic": true  }).exec();
  }

  public async listNewsFeed(userId: string) {
    const userTrips = await this.getPublicTrips();

    if (!userTrips) return [];

    var publicTrips: ITripMinimized[] = [];

    userTrips.forEach(user => {
      var trips = user.trips.filter(item => item.isPublic).map(item => this.toTripDto(item, userId, user.userId));
      publicTrips = [...publicTrips, ...trips];
    });

    return publicTrips;
  }

  public async create(ownerId: string, payload: ITripMinimized) {
    const { tripId, name, fromDate, toDate, locationImages, isDeleted, isPublic } = payload;

    const trip: ITripsModel = {
      tripId,
      name,
      fromDate: moment(fromDate).toDate(),
      toDate: moment(toDate).toDate(),
      locationImages,
      isDeleted: isDeleted,
      isPublic: isPublic
    };

    let userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) {
      userTrips = new this._mg.UserTripsDocument({
        userId: ownerId
      });
    }

    userTrips.trips.push(trip);
    await userTrips.save();

    const tripModel = userTrips.trips[userTrips.trips.length - 1];

    return this.toTripDto(tripModel, ownerId, ownerId);
  }

  public async update(ownerId: string, payload: ITripMinimized) {
    const userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) throw "can't find Trip from user id = " + ownerId;

    const trip = _.find(userTrips.trips, trip => trip.tripId === payload.tripId);
    if (!trip) throw "can't find Trip with id = " + payload.tripId;

    trip.name = payload.name;
    trip.fromDate = payload.fromDate;
    trip.toDate = payload.toDate;
    trip.locationImages = payload.locationImages;
    trip.isDeleted = payload.isDeleted;
    trip.isPublic = payload.isPublic;

    await userTrips.save();
  }
}

export default TripsRepository;
