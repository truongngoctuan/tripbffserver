import { ISearchLocation } from "././ISearchLocation";

export interface ISearchLocationRepository {
  //   get: (id: number) => Promise<ISearchLocation | undefined>;
  list: (query: string) => Promise<Array<ISearchLocation>>;
  //   insert: (activity: ISearchLocation) => Promise<void>;
  //   update: (activity: ISearchLocation) => Promise<void>;
  insertMany: (locations: Array<ISearchLocation>) => Promise<void>;
}
