import { IFoo } from "../models/IFoo";

export interface IFooRepository {
  get: (id: String) => Promise<IFoo | undefined>;
  create: (payload: IFoo) => Promise<IFoo>;
  update: (payload: IFoo) => Promise<void>;
  list: () => Promise<IFoo[]>;
}
