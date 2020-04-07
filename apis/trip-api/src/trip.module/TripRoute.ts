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
  deleteTripAction,
  listNewsFeedTripsAction
} from "./actions/TripActions";
import { joiTripSchema, joiMinimizedTripSchema, IdSchema } from "./JoiSchemas";

module.exports = {
  init: function(server: Server): void {
    server.route({
      method: "GET",
      path: "/trips",
      handler: async request => {
        const { page } = request.payload as any;
        const userId = CUtils.getUserId(request);
        return await listTripsAction(userId);
      },        
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
          schema: joiMinimizedTripSchema,
          failAction: failActionInResponse
        }
      }
    });

    type postPayloadType = {
      name: string;
      fromDate: string;
      toDate: string;
      isPublic: boolean;
    };
    const postPayloadSchema = Joi.object({
      name: Joi.string().required(),
      fromDate: Joi.string().required(),
      toDate: Joi.string().required(),
      isPublic: Joi.boolean().required()
    });

    server.route({
      method: "POST",
      path: "/trips",
      handler: async request => {
        const { name, fromDate, toDate, isPublic } = request.payload as postPayloadType;
        const ownerId = CUtils.getUserId(request);

        return await createTripAction(ownerId, name, fromDate, toDate, isPublic);
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
        const { name, fromDate, toDate , isPublic } = request.payload as postPayloadType;
        console.log("trip name", name);
        console.log("trip from date:", fromDate);
        console.log("trip to date:", toDate);

        const ownerId = CUtils.getUserId(request);

        return await patchTripAction(ownerId, tripId, name, fromDate, toDate, isPublic);
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
        const createdById = request.query.createdById as string;
        const loggedUserId = CUtils.getUserId(request);
        
        return await getTripByIdAction(loggedUserId, tripId, createdById)
        .then(trip => {
          return trip;
        });
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

    server.route({
      method: "GET",
      path: "/newsFeed/trips",
      handler: async request => {
        const page = parseInt(request.query.page as string);
        const userId = CUtils.getUserId(request);
        return await listNewsFeedTripsAction(userId, page);
      },        
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

  }
};
