import { IActivity } from "./ITrip";

export interface IActivityRepository {
  get: (id: number) => Promise<IActivity | undefined>;
  list: () => Promise<Array<IActivity>>;
  insert: (activity: IActivity) => Promise<void>;
  update: (activity: IActivity) => Promise<void>;
  insertMany: (activities: Array<IActivity>) => Promise<void>;
}
