import { IFoo } from "./IFoo";

export interface IFooRepository {
  get: (id: string) => Promise<IFoo | undefined>;
  create: (payload: IFoo) => Promise<IFoo>;
  update: (payload: IFoo) => Promise<void>;
  list: () => Promise<IFoo[]>;
}
