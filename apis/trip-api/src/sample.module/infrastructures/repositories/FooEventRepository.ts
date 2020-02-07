import { IFooEventRepository, FooEvent } from "../../services/FooEvent";
import mongoose, { Model, Document } from "mongoose";
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

interface IFooEvent {
  fooId: string;
  data: FooEvent;
}
interface IFooEventModel extends IFooEvent, Document {}

const FooEventSchema = new Schema({
  fooId: String,
  data: Object,
});

const FooEventModel: Model<IFooEventModel> = mongoose.model<IFooEventModel>(
  "FooEvent",
  FooEventSchema
);

export class FooEventRepository implements IFooEventRepository {
  async save(event: FooEvent) {
    const dbEvent = new FooEventModel({
      fooId: event.fooId,
      data: event,
    });
    dbEvent.save();
  }

  async getAll(id: string): Promise<FooEvent[]> {
    const foos = await FooEventModel.find({ fooId: id }).exec();
    return foos.map(item => item.data);
  }
}