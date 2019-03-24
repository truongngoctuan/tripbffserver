import { Stream } from "stream";

export interface IFileStorageService {
  save: (
    file: Stream | Buffer,
    category: string,
    fileName: string,
  ) => Promise<{ externalId: string; slug: string }>;
  getById: (externalId: string) => Promise<{ file: Stream, fileInfo: IFileInfo }>;
  getInfoById: (externalId: string) => Promise<{ fileInfo: IFileInfo }>;
}

export interface IFileInfo {
  externalId: string;
  category: string;
  fileName: string;
  mimeType: string;
  path: string;
}