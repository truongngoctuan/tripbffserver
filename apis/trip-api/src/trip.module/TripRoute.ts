import { Server } from "@hapi/hapi";
import Joi from "@hapi/joi";
import { CUtils } from "../_shared/ControllerUtils";
import moment = require("moment-timezone");
import { failActionInResponse } from "../_shared/joi-utils";

console.log("checking current time in server", moment().format());

import {
  listTripsAction,
  getTripByIdAction,
  getMinimizedTripByIdAction,
  createTripAction,
  patchTripAction,
  deleteTripAction
} from "./actions/TripActions";
import { joiTripSchema, joiMinimizedTripsSchema, IdSchema } from "./JoiSchemas";

module.exports = {
  init: function(server: Server): void {
    server.route({
      method: "GET",
      path: "/trips",
      handler: async request =>
        await listTripsAction(CUtils.getUserId(request)),
      options: {
        auth: "simple",
        tags: ["api"],
        notes: ["get full list of trips"],
        response: {
          // todo setup date/moment validation correctly
          // schema: joiMinimizedTripsSchema
        }
      }
    });

    server.route({
      method: "GET",
      path: "/trips/minimized/{id}",
      handler: async request => {
        const tripId = request.params.id;
        const userId = CUtils.getUserId(request);

        return await getMinimizedTripByIdAction(userId, tripId);
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          params: IdSchema
        },
        response: {
          schema: joiTripSchema
        }
      }
    });

    type postPayloadType = {
      name: string;
      fromDate: string;
      toDate: string;
    };
    const postPayloadSchema = Joi.object({
      name: Joi.string().required(),
      fromDate: Joi.string().required(),
      toDate: Joi.string().required()
    });

    server.route({
      method: "POST",
      path: "/trips",
      handler: async request => {
        const { name, fromDate, toDate } = request.payload as postPayloadType;
        const ownerId = CUtils.getUserId(request);

        return await createTripAction(ownerId, name, fromDate, toDate);
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          payload: postPayloadSchema
        },
        response: {
          schema: Joi.string()
        }
      }
    });

    server.route({
      method: "PATCH",
      path: "/trips/{id}",
      handler: async function(request) {
        const tripId = request.params.id;
        const { name, fromDate, toDate } = request.payload as postPayloadType;
        console.log("trip name", name);
        console.log("trip from date:", fromDate);
        console.log("trip to date:", toDate);

        const ownerId = CUtils.getUserId(request);

        return await patchTripAction(ownerId, tripId, name, fromDate, toDate);
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          params: IdSchema,
          payload: postPayloadSchema
        },
        response: {
          status: {
            200: joiTripSchema
          }
        }
      }
    });

    server.route({
      method: "GET",
      path: "/trips/{id}",
      handler: async function(request) {
        const tripId = request.params.id;
        const userId = CUtils.getUserId(request);

        return await getTripByIdAction(userId, tripId);
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          params: IdSchema,
        },
        response: {
          status: {
            200: joiTripSchema
          },
          failAction: failActionInResponse
        }
      }
    });

    server.route({
      method: "DELETE",
      path: "/trips/{id}",
      handler: async function(request) {
        const tripId = request.params.id;
        const ownerId = CUtils.getUserId(request);
        return await deleteTripAction(ownerId, tripId);
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          params: IdSchema
        }
      }
    });
  }
};
