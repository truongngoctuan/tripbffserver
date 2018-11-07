import { Foo, FooSchema, IFooModel } from "../models/Foo";

function toFooDto(o: IFooModel) {
  return {
    id: o._id,
    name: o.name,
    description: o.description
  };
}

async function list() {
  var foos = await Foo.find().exec();
  return foos.map(item => toFooDto(item));
}

function create(payload: { name: String; description: String }) {
  const { name, description } = payload;
  var foo = new Foo({
    name,
    description,
    aaa: 222
  });
  foo.save();

  return toFooDto(foo);
}

const fooRepository = {
  list,
  create
};

export default fooRepository;
