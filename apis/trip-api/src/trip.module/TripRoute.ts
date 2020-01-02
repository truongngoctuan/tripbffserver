import { Server } from "@hapi/hapi";
import Joi from "@hapi/joi";
import uuid from "uuid/v1";
import { Err } from "../_shared/utils";
import { IoC } from "./IoC";
import { CUtils } from "../_shared/ControllerUtils";
import moment = require("moment-timezone");

console.log("checking current time in server", moment().format());

const tripCommandHandler = IoC.tripCommandHandler;
const tripQueryHandler = IoC.tripQueryHandler;
const minimizedTripQueryHandler = IoC.minimizedTripsQueryHandler;

import { joiTripSchema, joiTripsSchema } from "./JoiSchemas";

module.exports = {
  init: function(server: Server): void {
    server.route({
      method: "GET",
      path: "/trips",
      handler: async function(request) {
        const userId = CUtils.getUserId(request);
        const trips = await minimizedTripQueryHandler.list(userId);

        if (!trips) return Err("can't get data after create trip");

        console.log(trips.length);
        return trips;
      },
      options: {
        auth: "simple",
        tags: ["api"],
        notes: ["get full list of trips"],
        response: {
          schema: joiTripsSchema
        }
      },
    });

    server.route({
      method: "GET",
      path: "/trips/minimized/{id}",
      handler: async function(request) {
        const tripId = request.params.id;
        const userId = CUtils.getUserId(request);

        console.log("trip id :" + tripId);
        const trip = await minimizedTripQueryHandler.getById(userId, tripId);
        if (!trip) throw "trip not found";
        return trip;
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          params: Joi.object({
            id: Joi.required().description("the id for the todo item")
          })
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
      handler: async function(request) {
        const { name, fromDate, toDate } = request.payload as postPayloadType;
        console.log("trip name :" + name);
        console.log("trip from date:" + fromDate);
        console.log("trip to date:" + toDate);

        try {
          const tripId = uuid();
          const ownerId = CUtils.getUserId(request);

          const commandResult = await tripCommandHandler.exec({
            type: "createTrip",
            ownerId,
            tripId: tripId.toString(),
            name,
            fromDate: moment(fromDate),
            toDate: moment(toDate)
          });

          if (commandResult.isSucceed) {
            const queryResult = await tripQueryHandler.GetById(
              ownerId,
              tripId.toString()
            );

            if (!queryResult) return Err("can't get data after create trip");
            return queryResult.tripId;
          }

          return commandResult.errors;
        } catch (error) {
          console.log(error);
        }
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

        try {
          const ownerId = CUtils.getUserId(request);

          const commandResult = await tripCommandHandler.exec({
            type: "updatePatchTrip",
            ownerId,
            tripId,
            name,
            fromDate: moment(fromDate),
            toDate: moment(toDate)
          });

          if (commandResult.isSucceed) {
            const queryResult = await tripQueryHandler.GetById(
              ownerId,
              tripId.toString()
            );

            if (!queryResult) return Err("can't get data after patch trip");
            return queryResult;
          }

          return commandResult.errors;
        } catch (error) {
          console.log(error);
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          params: Joi.object({
            id: Joi.required().description("the id for the todo item")
          }),
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

        console.log("trip id :" + tripId);
        const trip = await tripQueryHandler.GetById(userId, tripId);
        if (!trip) throw "trip not found";
        return trip;
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          params: Joi.object({
            id: Joi.required()
          })
        },
        response: {
          status: {
            200: Joi.array().items(joiTripSchema)
          }
        }
      }
    });

    server.route({
      method: "DELETE",
      path: "/trips/{id}",
      handler: async function(request) {
        const tripId = request.params.id;
        const ownerId = CUtils.getUserId(request);

        const commandResult = await tripCommandHandler.exec({
          type: "deleteTrip",
          ownerId,
          tripId,
          isDeleted: true
        });

        if (commandResult.isSucceed) {
          return true;
        }

        return commandResult.errors;
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          params: Joi.object({
            id: Joi.required()
          })
        }
      }
    });
  }
};
