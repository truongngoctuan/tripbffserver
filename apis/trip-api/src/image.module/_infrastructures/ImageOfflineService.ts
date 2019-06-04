
import { IImageService } from "../_core/IImageService";
import path from "path";
import { fileExists, writeBuffer } from "../FileAsync";
import sharp = require("sharp");

export class ImageOfflineService implements IImageService {

  generateThumbnailUri(relativeImageUri: string, w: number, h: number): string {
    const parsedPath = path.parse(relativeImageUri);
    return path.join(parsedPath.dir, `${parsedPath.name}_${w}_${h}${parsedPath.ext}`);
  }

  isExist(relativeImageUri): Promise<boolean> {
    throw "Not implemented";
  }

  async saveThumbnail(relativeImageUri: string, w: number, h: number): Promise<void> {
    
    const fileExtension = path.parse(relativeImageUri).ext;
    const fileThumbnailPath = relativeImageUri.replace(fileExtension, `_${w}_${h}${fileExtension}`);

    if (!fileExists(fileThumbnailPath)) {
      await sharp(relativeImageUri)
      .resize(w, h)
      .withMetadata()
      .toFile(fileThumbnailPath);
    }
  }

}