import { IFoo } from "../models/IFoo";
import { IFooRepository } from "../models/IFooRepository";

export class FooQueryHandler {
  constructor(private fooRepository: IFooRepository) {}

  async GetById(id: string): Promise<IFoo | undefined> {
    return this.fooRepository.get(id);
  }

  async list(): Promise<IFoo[]> {
    const results = this.fooRepository.list();
    return results;
  }
}
