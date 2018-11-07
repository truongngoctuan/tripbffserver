import mongoose, { Model, Document } from "mongoose";
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: move to services/, this is Business model
export interface IFoo {
  name: String;
  description: String;
}

// this is db model, schemas
export interface IFooModel extends IFoo, Document {}

export const FooSchema = new Schema({
  name: String,
  description: String
});

export const Foo: Model<IFooModel> = mongoose.model<IFooModel>(
  "Foo",
  FooSchema
);
export default Foo;
// module.exports = mongoose.model('Foo', FooSchema);
