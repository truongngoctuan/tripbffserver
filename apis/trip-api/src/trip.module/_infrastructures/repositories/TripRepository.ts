import { UserTripDocument, IUserTripDocument, UserTripSchema } from "../models/UserTripModel";
import { ITripRepository } from "../../_core/models/ITripRepository";
import { ITrip, InfographicStatus } from "../../_core/models/ITrip";
import moment from "moment";
import _ from "lodash";
import { ITripModel } from "../models/IUserTripModel";

export class TripRepository implements ITripRepository {
  toTripDto(o: ITripModel): ITrip {
    return {
      tripId: o.tripId,
      name: o.name,
      fromDate: moment(o.fromDate),
      toDate: moment(o.toDate),
      locations: _.map(o.locations, loc => {
        return {
          locationId: loc.locationId,
          name: loc.name,
          location: loc.location,
          fromTime: moment(loc.fromTime),
          toTime: moment(loc.toTime),
          images: loc.images.map(img => {
            return {
              imageId: img.imageId,
              url: img.url,
              externalStorageId: img.externalStorageId
            };
          }),
          feeling: loc.feeling,
          activity: loc.activity
        };
      }),
      infographics: _.map(o.infographics, infographic => {
        return {
          infographicId: infographic.infographicId,
          externalStorageId: infographic.externalStorageId,
          status: infographic.status as InfographicStatus
        };
      })
    };
  }

  async getUserTrips(userId: string) {
    return await UserTripDocument.findOne({ userId }).exec();
  }

  public async list(ownerId: string) {
    var userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) return [];

    return userTrips.trips.map(item => this.toTripDto(item));
  }

  public async create(ownerId: string, payload: ITrip) {
    const { tripId: id, name, fromDate, toDate } = payload;

    var trip: ITripModel = {
      tripId: id,
      name,
      fromDate: moment(fromDate).toDate(),
      toDate: moment(toDate).toDate()
    }
    var userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) {
      userTrips = new UserTripDocument({
        userId: ownerId
      });
    }

    userTrips.trips.push(trip);
    await userTrips.save();

    var tripModel = userTrips.trips[userTrips.trips.length - 1];

    return this.toTripDto(tripModel);
  }

  public async update(ownerId: string, payload: ITrip) {
    var userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) throw "can't find Trip from user id = " + ownerId;

    var trip = _.find(userTrips.trips, trip => trip.tripId === payload.tripId);
    if (!trip) throw "can't find Trip with id = " + payload.tripId;

    trip.name = payload.name;
    trip.fromDate = payload.fromDate.toDate();
    trip.toDate = payload.toDate.toDate();
    trip.locations = _.map(payload.locations, loc => ({
      locationId: loc.locationId,
      name: loc.name,
      location: loc.location,
      fromTime: moment(loc.fromTime).toDate(),
      toTime: moment(loc.toTime).toDate(),
      images: loc.images,
      feeling: loc.feeling,
      activity: loc.activity
    }));
    trip.infographics = payload.infographics;

    await userTrips.save();
  }

  public async get(ownerId: string, id: String) {
    var trip = await this.getTripModel(ownerId, id);
    if (!trip) return undefined;
    
    return this.toTripDto(trip);
  }

  async getTripModel(ownerId: string, id: String) {
    var userTrips = await this.getUserTrips(ownerId);
    
    if (!userTrips) return undefined;

    var trip = _.find(userTrips.trips, trip => trip.tripId === id);
    if (!trip) return undefined;
    return trip;
  }
}

export default TripRepository;
