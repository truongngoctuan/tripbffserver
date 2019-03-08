import { IFeeling } from "./ITrip";

export interface IFeelingRepository {
  get: (id: string) => Promise<IFeeling | undefined>;
  list: () => Promise<Array<IFeeling>>;
  // insert: (feeling: IFeeling) => Promise<void>;
  // update: (feeling: IFeeling) => Promise<void>;
  // insertMany: (feelings: Array<IFeeling>) => Promise<void>;
}
