export interface IImageService {
  saveThumbnail(filePath: string, w: number, h: number): Promise<void>;
}