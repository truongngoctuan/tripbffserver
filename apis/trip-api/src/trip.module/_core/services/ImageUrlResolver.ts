export function resolveImageUrlFromExternalStorageId(externalStorageId: string): string {
  return `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/images/${externalStorageId}`;
}

export function resolveThumbnailImageUrlFromExternalStorageId(
  externalStorageId: string,
  size?: number): string {
  return size
  ? `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/images/${externalStorageId}/thumbnail?s=${size}`
  : `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/images/${externalStorageId}/thumbnail`;
}

export function resolveSignOnlyThumbnailImageUrlFromExternalStorageId(
  externalStorageId: string,
  size?: number): string {
  return size
  ? `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/images/${externalStorageId}/thumbnail/sign-only?s=${size}`
  : `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/images/${externalStorageId}/thumbnail/sign-only`;
}