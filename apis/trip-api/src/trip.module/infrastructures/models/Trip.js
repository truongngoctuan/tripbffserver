const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  id: String,
  name: String,
  fromDate: String,
  toDate: String,
});

module.exports = mongoose.model("Trip", TripSchema);
