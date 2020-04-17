import { Lifecycle } from "@hapi/hapi";
import Boom from "boom";

export const failActionInResponse: Lifecycle.Method = async (
  request,
  h,
  err
): Promise<void> => {
  if (err) {
    if (process.env.NODE_ENV === "production") {
      // In prod, log a limited error message and throw the default Bad Request error.
      console.error("ValidationError:", err.message);
      throw Boom.internal("Invalid request payload output");
    } else {
      // During development, log and respond with the full error.
      console.error((err as any).details[0]);
      throw Boom.badRequest(
        `response data validation failed ${JSON.stringify(
          (err as any).details[0]
        )}`,
        (err as any).details[0]
      );
      // throw err;
    }
  } else {
    console.error("unknown error");
  }
};
