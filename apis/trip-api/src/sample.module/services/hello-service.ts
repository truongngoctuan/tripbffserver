import fooRepository from "../infrastructures/repositories/foo-repository";

function list(payload: {}) {
  var results = fooRepository.list();
  return results;
}

function create(payload: { name: String; description: String }) {
  var foo = fooRepository.create(payload);
  return foo;
}

const fooService = {
  list,
  create,
}

export default fooService;