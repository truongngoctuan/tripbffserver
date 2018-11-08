import { Foo, FooSchema, IFooModel } from "../models/Foo";
import { IFooRepository } from "../../services/IFooRepository";
import { IFoo } from "../../models/IFoo";

export class FooRepository implements IFooRepository {
  toFooDto(o: IFooModel) {
    return {
      id: o._id,
      name: o.name,
      description: o.description
    };
  }

  public async list() {
    var foos = await Foo.find().exec();
    return foos.map(item => this.toFooDto(item));
  }

  public create(payload: { name: String; description: String }) {
    const { name, description } = payload;
    var foo = new Foo({
      name,
      description,
      aaa: 222
    });
    foo.save();

    return this.toFooDto(foo);
  }

  public update(payload: IFoo) {
    return {} as IFoo;
  }

  public get(id: String) {
    return {} as IFoo;
  }
}

export default FooRepository;
