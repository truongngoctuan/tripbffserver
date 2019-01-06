async function init() {
  const mongoose = require("mongoose");
  mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/`)
  .catch(err => {
    console.log("error on connect to mongo db");
    console.log(err);
  });
  //test mongodb connection
  mongoose.connection.once("open", () => {
    console.log("connected to mongodb database");
  });
}
module.exports.init = init;
