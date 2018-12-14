const config = require('../config');

async function init() {
  const mongoose = require("mongoose");
  mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/`)
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
