const tripRepository = require("../infrastructures/repositories/TripRepository");
module.exports = {
  create: function(payload) {
    var foo = tripRepository.create(payload);
    return foo;
  },
  getById: async function getById(id) {
    return tripRepository.getById(id);
  }
};
