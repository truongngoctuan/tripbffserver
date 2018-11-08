import { IFoo } from "./IFoo";
import { IFooRepository } from "./IFooRepository";

export class FooQueryHandler {
  constructor(private fooRepository: IFooRepository) {}

  async GetById(id: String): Promise<IFoo> {
    return {
      id: "0",
      name: "aa",
      description: "aaaa",
    }
  }

  async list(): Promise<IFoo[]> {
    var results = this.fooRepository.list();
    return results;
  }
}