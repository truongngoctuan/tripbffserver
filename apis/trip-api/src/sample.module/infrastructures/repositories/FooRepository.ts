import { Foo, FooSchema, IFooModel } from "../models/Foo";
import { IFooRepository } from "../../models/IFooRepository";
import { IFoo } from "../../models/IFoo";

export class FooRepository implements IFooRepository {
  toFooDto(o: IFooModel) {
    return {
      id: o.id,
      name: o.name,
      description: o.description,
    };
  }

  public async list() {
    const foos = await Foo.find().exec();
    return foos.map((item) => this.toFooDto(item));
  }

  public async create(payload: IFoo) {
    const { id, name, description } = payload;
    const foo = new Foo({
      id,
      name,
      description,
    });
    await foo.save();

    return this.toFooDto(foo);
  }

  public async update(payload: IFoo) {
    const foo = await Foo.findOne().where("id").equals(payload.id).exec();
    if (!foo) throw "can't find foo with id = " + payload.id;

    foo.name = payload.name;
    foo.description = payload.description;

    await foo.save();
  }

  public async get(id: string) {
    const foo = await Foo.findOne().where("id").equals(id).exec();
    if (!foo) return undefined;

    return this.toFooDto(foo);
  }
}

export default FooRepository;
