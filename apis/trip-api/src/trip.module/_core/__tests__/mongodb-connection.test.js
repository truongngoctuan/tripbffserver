const mongoose = require("mongoose");

//test mongodb connection
mongoose.connection.once("open", () => {
  console.log("connected to mongodb database");
});

let mongoosed;
let connection;
let db;

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
  // console.log("connection db", connection.db);
  db = connection.db;
});

afterAll(async () => {
  if (connection) {
    await connection.close();
    // await db.close();
  }
});

beforeEach(async () => {
  async function clearDB() {
    await Promise.all(
      Object.keys(connection.collections).map(async (key) => {
        return await connection.collections[key].remove({});
      }),
    );
  }

  await clearDB();

});

it("should aggregate docs from collection", async () => {
  // expect(db.getInstanceInfo()).toMatchSnapshot();
});

it("should aggregate docs from collection 2", async () => {
  // expect(db.getInstanceInfo()).toMatchSnapshot();
});

it("should aggregate docs from collection 3", async () => {
  // expect(db.getInstanceInfo()).toMatchSnapshot();
});