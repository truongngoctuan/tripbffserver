import { IFooRepository } from "./IFooRepository";

export class FooService {
  constructor(private fooRepository: IFooRepository) {

  }

  public list(payload: {}) {
    var results = this.fooRepository.list();
    return results;
  }
  
  public create(payload: { name: String; description: String }) {
    var foo = this.fooRepository.create(payload);
    return foo;
  }

}
export default FooService;