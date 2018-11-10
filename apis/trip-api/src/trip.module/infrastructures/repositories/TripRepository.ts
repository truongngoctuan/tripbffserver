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
    };
  }

  public async list() {
    var Trips = await Trip.find().exec();
    return Trips.map(item => this.toTripDto(item));
  }

  public async create(payload: ITrip) {
    const { id, name, fromDate, toDate } = payload;
    var trip = new Trip({
      id,
      name,
      fromDate,
      toDate,
    });
    await trip.save();

    return this.toTripDto(trip);
  }

  public async update(payload: ITrip) {
    var trip = await Trip.findOne()
      .where("id")
      .equals(payload.id)
      .exec();
    if (!trip) throw "can't find Trip with id = " + payload.id;

    trip.name = payload.name;
    trip.fromDate = payload.fromDate.toDate();
    trip.toDate = payload.toDate.toDate();

    await trip.save();
  }

  public async get(id: String) {
    var trip = await Trip.findOne()
      .where("id")
      .equals(id)
      .exec();
    if (!trip) return undefined;

    return this.toTripDto(trip);
  }
}

export default TripRepository;
