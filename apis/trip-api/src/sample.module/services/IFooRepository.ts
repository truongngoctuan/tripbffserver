import { IFoo } from "./IFoo";

export interface IFooRepository {
  get: (id: String) => IFoo
  create: (payload: { name: String; description: String }) => IFoo;
  update: (payload: { id: String; name: String; description: String })  => IFoo;
  list: () => Promise<IFoo[]>;
}