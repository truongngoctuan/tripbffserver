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
    var Trip = new Trip({
      id,
      name,
      fromDate,
      toDate,
    });
    await Trip.save();

    return this.toTripDto(Trip);
  }

  public async update(payload: ITrip) {
    var Trip = await Trip.findOne()
      .where("id")
      .equals(payload.id)
      .exec();
    if (!Trip) throw "can't find Trip with id = " + payload.id;

    Trip.name = payload.name;
    Trip.description = payload.description;

    await Trip.save();
  }

  public async get(id: String) {
    var Trip = await Trip.findOne()
      .where("id")
      .equals(id)
      .exec();
    if (!Trip) return undefined;

    return this.toTripDto(Trip);
  }
}

export default TripRepository;
