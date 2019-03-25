import { Stream } from "stream";
import { IFileInfo } from "./IFileStorageService";

export interface IImageService {
  createThumbnail(buffer: Buffer, w: number, h: number): Promise<Buffer>;
  saveThumbnail(filePath: string, w: number, h: number): Promise<Buffer>;
  getThumbnailById: (externalId: string, w: number, h: number) => Promise<{ file: Stream, fileInfo: IFileInfo }>;
}