import { IImageService } from "./IImageService";
import { Stream, Writable } from "stream";
import { IFileInfo } from "./IFileStorageService";
const sharp = require('sharp');
import path from "path";

export class ImageService implements IImageService {

  async createThumbnail(buffer: Buffer, w: number, h: number) {
    return await sharp(buffer)
      .resize(w, h)
      .toBuffer();
  }

  async saveThumbnail(filePath: string, w: number, h: number): Promise<Buffer> {
    var fileResult = await sharp(filePath).resize(w, h).toBuffer();
    return fileResult;
  }
  async getThumbnailById(externalId: string, w: number, h: number): Promise<{ file: Stream, fileInfo: IFileInfo }> {

  }

}