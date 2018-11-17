import { Stream } from "stream";

export interface IFileStorageRepository {
  save: (
    file: Stream,
    category: string,
    fileName: string,
  ) => Promise<{ externalId: string; slug: string }>;
  getById: (externalId: string) => Promise<{ file: Stream }>;
}
