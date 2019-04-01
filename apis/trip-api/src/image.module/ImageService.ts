import { IImageService } from "./IImageService";
const sharp = require('sharp');
import path from "path";
import { fileExists, writeBuffer } from "./FileAsync";

export class ImageService implements IImageService {

  async saveThumbnail(filePath: string, w: number, h: number): Promise<void> {

    const fileExtension = path.parse(filePath).ext;
    const fileThumbnailPath = filePath.replace(fileExtension, `_${w}_${h}${fileExtension}`);

    if (!fileExists(fileThumbnailPath)) {
      var fileThumbnail = await sharp(filePath).resize(w, h).toBuffer();
      await writeBuffer(fileThumbnailPath, fileThumbnail);
    }
  }

}