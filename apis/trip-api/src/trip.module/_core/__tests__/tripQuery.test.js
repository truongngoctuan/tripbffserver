import mongoose from "mongoose";

import { ServiceBus } from "../services/TripServiceBus";
import { TripRepository } from "../../_infrastructures/repositories/TripRepository";
import moment from "moment";
import { initSchemas } from "../../_infrastructures/models/mongoosed";

//test mongodb connection
mongoose.connection.once("open", () => {
  // console.log("connected to mongodb database");
});
let mongoosed;
let connection;
let db;
let schemas;

beforeAll(async () => {
  // console.log("mongo config: ", global.__MONGO_URI__);
  // console.log("mongo config: ", global.__MONGO_DB_NAME__);

  mongoosed = await mongoose.connect(global.__MONGO_URI__)
  .catch(err => {
    console.log("error on connect to mongo db");
    console.log(err);
  });
  // console.log("n connections", mongoosed.connections.length);
  // console.log("connection", mongoosed.connection);

  connection = mongoosed.connection;
  // console.log("connection db", mongoose.connection.db);
  console.log(mongoose.Schema);
  db = connection.db;

  //setup db schemas
  schemas = initSchemas(mongoose);

});

afterAll(async () => {
  if (connection) {
    await connection.close();
    // await db.close();
  }
});

beforeEach(async () => {
  async function clearDB() {
    if (connection) {
      await Promise.all(
        Object.keys(connection.collections).map(async (key) => {
          return await connection.collections[key].remove({});
        }),
      );
    }
    
  }

  await clearDB();

});
it('create trip', async () => {
  var tripRepository = new TripRepository(schemas);
  // console.log("schemas", connection);
  var serviceBus = new ServiceBus(tripRepository);

  var event = {
    type: "TripCreated",
    ownerId: "ownerId",
    tripId: "tripId",
    name: "name",
    fromDate: moment('2019-01-01'),
    toDate: moment('2019-01-10')
  };

  serviceBus.emit(event);

  expect(tripRepository.get("ownerId", "tripId"))
  .toMatchSnapshot();
});
