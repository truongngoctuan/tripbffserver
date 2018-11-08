import { IFoo } from "../models/IFoo";
import { IFooRepository } from "../models/IFooRepository";

export class FooQueryHandler {
  constructor(private fooRepository: IFooRepository) {}

  async GetById(id: String): Promise<IFoo | undefined> {
    return this.fooRepository.get(id);
  }

  async list(): Promise<IFoo[]> {
    var results = this.fooRepository.list();
    return results;
  }
}