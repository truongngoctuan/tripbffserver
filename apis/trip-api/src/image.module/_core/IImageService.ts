export interface IImageService {
  generateThumbnailUri(relativeImageUri: string, w: number, h: number): string;
  isExist(relativeImageUri: string): Promise<boolean>;
  saveThumbnail(relativeImageUri: string, w: number, h: number): Promise<void>;
}
