import { IHighlight } from "./ITrip";

export interface IHighlightRepository {
  get: (id: number) => Promise<IHighlight | undefined>;
  list: () => Promise<Array<IHighlight>>;
  insert: (highlight: IHighlight) => Promise<void>;
  update: (highlight: IHighlight) => Promise<void>;
  insertMany: (highlights: Array<IHighlight>) => Promise<void>;
}
