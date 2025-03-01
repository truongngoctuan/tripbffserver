import { ITripEventRepository, TripEvent } from "../../_core/services/events";
import mongoose, { Model, Document } from "mongoose";
const Schema = mongoose.Schema;

interface ITripEvent {
  TripId: string;
  data: TripEvent;
}
interface ITripEventModel extends ITripEvent, Document {}

const TripEventSchema = new Schema({
  TripId: String,
  data: Object,
});

const TripEventModel: Model<ITripEventModel> = mongoose.model<ITripEventModel>(
  "TripEvent",
  TripEventSchema
);

export class TripEventRepository implements ITripEventRepository {
  async save(event: TripEvent) {
    const dbEvent = new TripEventModel({
      TripId: event.tripId,
      data: event,
    });
    dbEvent.save();
  }

  async getAll(id: string): Promise<TripEvent[]> {
    const Trips = await TripEventModel.find({ TripId: id }).exec();
    return Trips.map((item) => item.data);
  }
}
