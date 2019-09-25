import { IImageService } from "../_core/IImageService";
import path from "path";
import { fileExists, read, writeBuffer } from "./S3Async";
import sharp = require("sharp");

const THUMBNAIL_IMAGE_SIZES = {
  HD: 1080,
  MEDIUM: 700,
  SMALL: 400,
};

export class ImageS3Service implements IImageService {

  generateThumbnailUri(relativeImageUri: string, w: number, h: number): string {
    const parsedPath = path.parse(relativeImageUri);
    return path.join(parsedPath.dir, `${parsedPath.name}_${w}_${h}${parsedPath.ext}`);
  }

  isExist(relativeImageUri: string): Promise<boolean> {
    throw "Not implemented";
  }

  async internalSaveThumbnail(fromUri: string, toUri: string, w: number, h: number): Promise<void> {
    const buf = await read(fromUri);

    // https://sharp.pixelplumbing.com/en/stable/api-operation/#rotate
    // rotate will implicitly using EXIF orientation, so we don't need to use withMetadata anymore
    const thumbnailBuf = await sharp(buf, { failOnError: false })
    .rotate()
    .resize(w, h)
    // .withMetadata()
    .toBuffer();

    await writeBuffer(toUri, thumbnailBuf);
  }

  // async saveThumbnail(relativeImageUri: string, w: number, h: number): Promise<void> {

  //   const fileThumbnailPath = this.generateThumbnailUri(relativeImageUri, w, h);
  //   // console.log("file thumbnail path", fileThumbnailPath);

  //   if (!(await fileExists(fileThumbnailPath))) {
  //     console.log("file does not exist", fileThumbnailPath);
  //     await this.internalSaveThumbnail(relativeImageUri, fileThumbnailPath, w, h);
  //   }
  // }

  async saveThumbnail(relativeImageUri: string, w: number, h: number): Promise<void> {
    let fromUri: string;
    let toUri: string;
    let upscaleW: number;
    let upscaleH: number;

    if (w >= THUMBNAIL_IMAGE_SIZES.HD) {
      upscaleW = THUMBNAIL_IMAGE_SIZES.HD;
      upscaleH = THUMBNAIL_IMAGE_SIZES.HD;
      fromUri = relativeImageUri;
    } else if (w >= THUMBNAIL_IMAGE_SIZES.MEDIUM) {
      upscaleW = THUMBNAIL_IMAGE_SIZES.MEDIUM;
      upscaleH = THUMBNAIL_IMAGE_SIZES.MEDIUM;
      fromUri = this.generateThumbnailUri(
        relativeImageUri,
        THUMBNAIL_IMAGE_SIZES.HD,
        THUMBNAIL_IMAGE_SIZES.HD);
    } else {
      upscaleW = THUMBNAIL_IMAGE_SIZES.SMALL;
      upscaleH = THUMBNAIL_IMAGE_SIZES.SMALL;
      fromUri = this.generateThumbnailUri(
        relativeImageUri,
        THUMBNAIL_IMAGE_SIZES.MEDIUM,
        THUMBNAIL_IMAGE_SIZES.MEDIUM);
    }

    toUri = this.generateThumbnailUri(relativeImageUri, upscaleW, upscaleH);

    if (!(await fileExists(toUri))) {
      console.log("file does not exist", toUri);
      if (!(await fileExists(fromUri))) {
        await this.internalSaveThumbnail(relativeImageUri, fromUri, w, h);
      }
      await this.internalSaveThumbnail(fromUri, toUri, w, h);
    }

  }

}
