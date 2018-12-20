import { ITrip } from "./ITrip";

export interface ITripRepository {
  get: (id: string) => Promise<ITrip | undefined>;
  list: () => Promise<Array<ITrip>>;
  create: (payload: ITrip) => Promise<ITrip>;
  update: (payload: ITrip) => Promise<void>;
}
