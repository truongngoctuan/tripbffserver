import { Request } from "@hapi/hapi";

function getUserId(request: Request): string {
  // todo check and throw appropriate error
  return (request.auth.credentials.user as any).id;
}

export const CUtils = {
  getUserId,
};
