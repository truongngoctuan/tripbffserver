import { ITripRepository } from "../../_core/models/ITripRepository";
import { ITrip, InfographicStatus } from "../../_core/models/ITrip";
import moment from "moment";
import _ from "lodash";
import { ITripModel } from "../models/IUserTripModel";
import { IMongooseSchemas } from "../models/mongoosed";

export class TripRepository implements ITripRepository {
  constructor(private _mg: IMongooseSchemas) {}

  toTripDto(o: ITripModel, loggedUserId: string, createdById: string): ITrip {
    return {
      tripId: o.tripId,
      name: o.name,
      fromDate: o.fromDate,
      toDate: o.toDate,
      locations: _.map(o.locations, (loc) => {
        return {
          locationId: loc.locationId,
          name: loc.name,
          location: {
            long: loc.location.long,
            lat: loc.location.lat,
            address: loc.location.address,
          },
          fromTime: loc.fromTime,
          toTime: loc.toTime,
          images: loc.images.map((img) => {
            return {
              imageId: img.imageId,
              url: img.url,
              time: img.time,
              externalStorageId: img.externalStorageId,
              isFavorite: img.isFavorite,
            };
          }),
          description: loc.description,
          feeling: loc.feeling
            ? {
                feelingId: loc.feeling.feelingId,
                label_en: loc.feeling.label_en,
                label_vi: loc.feeling.label_vi,
                icon: loc.feeling.icon,
              }
            : undefined,
          activity: loc.activity
            ? {
                activityId: loc.activity.activityId,
                label_en: loc.activity.label_en,
                label_vi: loc.activity.label_vi,
                icon: loc.activity.icon,
              }
            : undefined,
          highlights:
            loc.highlights != undefined
              ? loc.highlights.map((item) => {
                  return {
                    highlightId: item.highlightId,
                    label_en: item.label_en,
                    label_vi: item.label_vi,
                    highlightType: item.highlightType,
                  };
                })
              : undefined,
        };
      }),
      infographics: _.map(o.infographics, (infographic) => {
        return {
          infographicId: infographic.infographicId,
          externalStorageId: infographic.externalStorageId,
          status: infographic.status as InfographicStatus,
        };
      }),
      isDeleted: o.isDeleted,
      createdById: createdById,
      canContribute: loggedUserId == createdById,
      isPublic: o.isPublic,
      createdDate: o.createdDate,
    };
  }

  async getUserTrips(userId: string) {
    return await this._mg.UserTripDocument.findOne({ userId }).exec();
  }

  public async list(ownerId: string) {
    const userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) return [];

    return userTrips.trips.map((item) =>
      this.toTripDto(item, ownerId, ownerId)
    );
  }

  public async create(ownerId: string, payload: ITrip) {
    const { tripId: id, name, fromDate, toDate, isDeleted, isPublic } = payload;

    const trip: ITripModel = {
      tripId: id,
      name,
      fromDate: moment(fromDate).toDate(),
      toDate: moment(toDate).toDate(),
      isDeleted: isDeleted,
      createdDate: new Date(),
      isPublic: isPublic,
    };
    let userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) {
      userTrips = new this._mg.UserTripDocument({
        userId: ownerId,
      });
    }

    userTrips.trips.push(trip);
    await userTrips.save();

    const tripModel = userTrips.trips[userTrips.trips.length - 1];

    return this.toTripDto(tripModel, ownerId, ownerId);
  }

  public async update(ownerId: string, payload: ITrip) {
    const userTrips = await this.getUserTrips(ownerId);
    if (!userTrips) throw "can't find Trip from user id = " + ownerId;

    const trip = _.find(
      userTrips.trips,
      (trip) => trip.tripId === payload.tripId
    );
    if (!trip) throw "can't find Trip with id = " + payload.tripId;

    trip.name = payload.name;
    trip.fromDate = payload.fromDate;
    trip.toDate = payload.toDate;
    trip.isPublic = payload.isPublic;
    trip.locations = _.map(payload.locations, (loc) => ({
      locationId: loc.locationId,
      name: loc.name,
      location: loc.location,
      fromTime: moment(loc.fromTime).toDate(),
      toTime: moment(loc.toTime).toDate(),
      images: loc.images.map((img) => ({
        ...img,
        time: img.time,
      })),
      description: loc.description,
      feeling: loc.feeling,
      activity: loc.activity,
      highlights: loc.highlights,
    }));
    trip.infographics = payload.infographics;
    trip.isDeleted = payload.isDeleted;

    await userTrips.save();
  }

  public async get(loggedUserId: string, id: string, createdById: string) {
    const trip = await this.getTripModel(createdById, id);
    if (!trip) return undefined;

    return this.toTripDto(trip, loggedUserId, createdById);
  }

  async getTripModel(createdById: string, id: string) {
    const userTrips = await this.getUserTrips(createdById);

    if (!userTrips) return undefined;

    const trip = _.find(userTrips.trips, (trip) => trip.tripId === id);
    if (!trip) return undefined;
    return trip;
  }
}

export default TripRepository;
