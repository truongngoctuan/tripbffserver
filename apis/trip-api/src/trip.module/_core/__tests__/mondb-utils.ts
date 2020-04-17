import mongoose from "mongoose";

import { initSchemas } from "../../_infrastructures/models/mongoosed";

mongoose.connection.once("open", () => {
  // console.log("connected to mongodb database");
});
let mongoosed;
let connection: any;
let db;
// let schemas = {}; //: IMongooseSchemas;

async function beforeAll() {
  // console.log("mongo config: ", global.__MONGO_URI__);
  // console.log("mongo config: ", global.__MONGO_DB_NAME__);

  mongoosed = await mongoose
    .connect((global as any).__MONGO_URI__)
    .catch((err) => {
      console.log("error on connect to mongo db");
      console.log(err);
    });
  // console.log("n connections", mongoosed.connections.length);
  // console.log("connection", mongoosed.connection);

  connection = (mongoosed as any).connection;
  // console.log("connection db", mongoose.connection.db);
  // console.log(mongoose.Schema);
  db = connection.db;

  //setup db schemas
  const schemas = initSchemas(mongoose);
  return schemas;
}

async function afterAll() {
  if (connection) {
    await connection.close();
    // await db.close();
  }
}

async function beforeEach() {
  async function clearDB() {
    if (connection) {
      await Promise.all(
        Object.keys(connection.collections).map(async (key) => {
          return await connection.collections[key].remove({});
        })
      );
    }
  }

  await clearDB();
}

export default {
  beforeAll,
  afterAll,
  beforeEach,
  // schemas
};
