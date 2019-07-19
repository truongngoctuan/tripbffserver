async function init() {
  const mongoose = require("mongoose");

  var mongoDbConnectionString = process.env.MONGODB_CONNECTION_STRING;
  mongoose.connect(mongoDbConnectionString, {
      useNewUrlParser: true
    })
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