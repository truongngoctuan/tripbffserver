export function resolveImageUrlFromExternalStorageId(externalStorageId: string) {
  return `${process.env.SERVER_HOST}/images/${externalStorageId}`;
}

//todo improve with multiple thumbnail size url
export function resolveThumbnailImageUrlFromExternalStorageId(externalStorageId: string) {
  return `${process.env.SERVER_HOST}/images/${externalStorageId}/thumbnail`;
}