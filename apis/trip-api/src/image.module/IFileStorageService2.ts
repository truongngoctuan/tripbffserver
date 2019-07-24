import { Stream } from "stream";

export interface IFileStorageService2 {
  signUpload(category: string, mimeType: string): Promise<{ signedRequest: string, externalId: string, fullPath: string }>;
  signGet(fullPath: string, expires?: number): Promise<string>;

  save: (fullPath: string) => Promise<{ externalId: string; slug: string }>;
  getInfoById: (externalId: string) => Promise<{ fileInfo: IFileInfo }>;
}

export interface IFileInfo {
  externalId: string;
  category: string;
  fileName: string;
  mimeType: string;
  path: string;
}