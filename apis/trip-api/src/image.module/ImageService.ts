import { IImageService } from "./IImageService";
import sharp from 'sharp';
import path from "path";
import { fileExists, writeBuffer } from "./FileAsync";

export class ImageService implements IImageService {

  async saveThumbnail(filePath: string, w: number, h: number): Promise<void> {

    const fileExtension = path.parse(filePath).ext;
    const fileThumbnailPath = filePath.replace(fileExtension, `_${w}_${h}${fileExtension}`);

    if (!fileExists(fileThumbnailPath)) {
      await sharp(filePath)
      .resize(w, h)
      .withMetadata()
      .toFile(fileThumbnailPath);
    }
  }

}