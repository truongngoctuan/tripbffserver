import { Trip, TripSchema, ITripModel } from "../models/Trip";
import { ITripRepository } from "../../models/ITripRepository";
import { ITrip } from "../../models/ITrip";
import moment from "moment";

export class TripRepository implements ITripRepository {
  toTripDto(o: ITripModel): ITrip {
    return {
      id: o.id,
      name: o.name,
      fromDate: moment(o.fromDate),
      toDate: moment(o.toDate),
      locations: o.locations.map(loc => {
        return {
          locationId: loc.locationId,
          location: loc.location,
          fromTime: moment(loc.fromTime),
          toTime: moment(loc.toTime),
          images: loc.images.map(img => {
            return {
              imageId: img.imageId,
              url: img.url,
              externalStorageId: img.externalStorageId
            };
          })
        };
      }),
      infographics: o.infographics.map(infographic => {
        return {
          infographicId: infographic.infographicId,
          externalStorageId:infographic.externalStorageId,
          status: infographic.status
        };
      })
    };
  }

  public async list(ownerId: string) {
    var Trips = await Trip.find({ ownerId }).exec();
    return Trips.map(item => this.toTripDto(item));
  }

  public async create(ownerId: string, payload: ITrip) {
    const { id, name, fromDate, toDate } = payload;
    var trip = new Trip({
      ownerId,
      id,
      name,
      fromDate,
      toDate
    });
    await trip.save();

    return this.toTripDto(trip);
  }

  public async update(ownerId: string, payload: ITrip) {
    var trip = await Trip.findOne({ ownerId, id: payload.id })
      .exec();
    if (!trip) throw "can't find Trip with id = " + payload.id;

    trip.name = payload.name;
    trip.fromDate = payload.fromDate.toDate();
    trip.toDate = payload.toDate.toDate();
    trip.locations = payload.locations;
    trip.infographics = payload.infographics;

    await trip.save();
  }

  public async get(ownerId: string, id: String) {
    var trip = await Trip.findOne({ ownerId, id })
      .exec();
    if (!trip) return undefined;

    return this.toTripDto(trip);
  }
}

export default TripRepository;
