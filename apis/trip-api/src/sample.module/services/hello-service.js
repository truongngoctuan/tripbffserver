const fooRepository = require("../infrastructures/repositories/foo-repository");
module.exports = {
  list: function(payload) {
    var results = fooRepository.list();
    return results;
  },
  create: function(payload) {
    var foo = fooRepository.create(payload);
    return foo;
  }
};
