// ref: https://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/
import mongoose, { Model, Document } from "mongoose";
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this is db model, schemas
export interface IFoo {
  name: String;
  description: String;
}

export interface IFooModel extends IFoo, Document {}

//schema definition, similar to db model
export const FooSchema = new Schema({
  id: String,
  name: String,
  description: String
});

export const Foo: Model<IFooModel> = mongoose.model<IFooModel>(
  "Foo",
  FooSchema
);
export default Foo;
// module.exports = mongoose.model('Foo', FooSchema);
