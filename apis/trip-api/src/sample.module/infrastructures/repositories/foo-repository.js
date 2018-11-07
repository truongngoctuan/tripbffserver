const Foo = require("../models/Foo");

function toFooDto(o) {
    return {
        id: o._id,
        name: o.name,
        description: o.description,
    };
}

module.exports = {
  list: async function() {
    var foos = await Foo.find().exec();
    return foos.map(item => toFooDto(item));
  },
  create: function(payload) {
    const { name, description } = payload;
    var foo = Foo({
      name,
      description
    });
    foo.save();

    return toFooDto(foo);
  },
};