import { IImageService } from "../_core/IImageService";
import path from "path";
import { fileExists, read, writeBuffer } from "./S3Async";
import sharp = require("sharp");

export class ImageS3Service implements IImageService {

  generateThumbnailUri(relativeImageUri: string, w: number, h: number): string {
    const parsedPath = path.parse(relativeImageUri);
    return path.join(parsedPath.dir, `${parsedPath.name}_${w}_${h}${parsedPath.ext}`);
  }

  isExist(relativeImageUri: string): Promise<boolean> {
    throw "Not implemented";
  }

  async saveThumbnail(relativeImageUri: string, w: number, h: number): Promise<void> {

    const fileThumbnailPath = this.generateThumbnailUri(relativeImageUri, w, h);
    // console.log("file thumbnail path", fileThumbnailPath);

    if (!(await fileExists(fileThumbnailPath))) {
      console.log("file does not exist", fileThumbnailPath);
      const buf = await read(relativeImageUri);
      const thumbnailBuf = await sharp(buf, { failOnError: false })
      .resize(w, h)
      .withMetadata()
      .toBuffer();

      await writeBuffer(fileThumbnailPath, thumbnailBuf);
    }
  }

}