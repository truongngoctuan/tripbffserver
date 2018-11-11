import { ITrip } from "./ITrip";

export interface ITripRepository {
  get: (id: String) => Promise<ITrip | undefined>;
  create: (payload: ITrip) => Promise<ITrip>;
  update: (payload: ITrip) => Promise<void>;
}
