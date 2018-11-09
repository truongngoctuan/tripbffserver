const Trip = require("../models/Trip");

function toTripBusinessEntity(o) {
  return {
    id: o._id,
    name: o.name,
    fromDate: o.fromDate,
    toDate: o.toDate
  };
}

module.exports = {
  create: function(payload) {
    const { name, fromDate, toDate } = payload;
    var trip = Trip({
      name,
      fromDate,
      toDate
    });
    trip.save();

    return toTripBusinessEntity(trip);
  },
  getById: async function getById(id) {
    var trip = await Trip.findOne()
      .where({ _id: id })
      .exec();
    return toTripBusinessEntity(trip);
  }
};
