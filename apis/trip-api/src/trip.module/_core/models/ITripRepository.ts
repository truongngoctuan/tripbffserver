import { ITrip } from "./ITrip";

export interface ITripRepository {
  get: (loggedUserId: string, id: string, createdById: string) => Promise<ITrip | undefined>;
  list: (ownerId: string) => Promise<Array<ITrip>>;
  create: (ownerId: string, payload: ITrip) => Promise<ITrip>;
  update: (ownerId: string, payload: ITrip) => Promise<void>;
}