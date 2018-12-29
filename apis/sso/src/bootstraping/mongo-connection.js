async function init() {
  const mongoose = require("mongoose");

  var host = process.env.MONGODB_HOST;
  var port = process.env.MONGODB_PORT;
  mongoose.connect(`mongodb://${host}:${port}/`)
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
