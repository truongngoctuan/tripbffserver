import { Request } from "hapi";

function getUserId(request: Request): string {
  //todo check and throw appropriate error
  return request.auth.credentials.user.id;
}

export const CUtils = {
  getUserId
}