export function resolveImageUrlFromExternalStorageId(externalStorageId: string) {
  return `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/images/${externalStorageId}`;
}

// todo improve with multiple thumbnail size url
export function resolveThumbnailImageUrlFromExternalStorageId(externalStorageId: string, size = 400) {
  return `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/images/${externalStorageId}/thumbnail?s=${size}`;
}