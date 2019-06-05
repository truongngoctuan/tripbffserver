import { Server } from "hapi";
const Joi = require("joi");
import uuid from "uuid/v1";
import { Err } from "../_shared/utils";
import { IoC } from "./IoC"
import { CUtils } from "./ControllerUtils";
import moment = require("moment-timezone");

console.log("checking current time in server", moment().format());


const tripCommandHandler = IoC.tripCommandHandler;
const tripQueryHandler = IoC.tripQueryHandler;
const minimizedTripQueryHandler = IoC.minimizedTripsQueryHandler;

module.exports = {
  init: function(server: Server) {
    server.route({
      method: "GET",
      path: "/trips",
      handler: async function(request) {
        const userId = CUtils.getUserId(request);
        var trips = await minimizedTripQueryHandler.list(userId);

        if (!trips) return Err("can't get data after create trip");

        trips = trips.filter(item => item.isDeleted != true);
        console.log(trips.length)
        return trips;
      },
      options: {
        auth: "simple",
        tags: ["api"]
      }
    });

    server.route({
      method: "POST",
      path: "/trips",
      handler: async function(request) {
        const { name, fromDate, toDate } = request.payload as any;
        console.log("trip name :" + name);
        console.log("trip from date:" + fromDate);
        console.log("trip to date:" + toDate);

        try {
          var tripId = uuid();
          const ownerId = CUtils.getUserId(request);

          var commandResult = await tripCommandHandler.exec({
            type: "createTrip",
            ownerId,
            tripId: tripId.toString(),
            name,
            fromDate,
            toDate
          });

          if (commandResult.isSucceed) {
            var queryResult = await tripQueryHandler.GetById(ownerId, tripId.toString());

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
          payload: {
            name: Joi.string()
              .required()
              .description("the id for the todo item"),
            fromDate: Joi.string()
              .required()
              .description("the fromDate"),
            toDate: Joi.string()
              .required()
              .description("the toDate")
          }
        }
      }
    });

    server.route({
      method: "PATCH",
      path: "/trips/{id}",
      handler: async function(request) {
        var tripId = request.params.id;
        const { name, fromDate, toDate } = request.payload as any;
        console.log("trip name", name);
        console.log("trip from date:", fromDate);
        console.log("trip to date:", toDate);

        try {
          const ownerId = CUtils.getUserId(request);

          var commandResult = await tripCommandHandler.exec({
            type: "updatePatchTrip",
            ownerId,
            tripId,
            name,
            fromDate: moment(fromDate),
            toDate: moment(toDate)
          });

          if (commandResult.isSucceed) {
            var queryResult = await tripQueryHandler.GetById(ownerId, tripId.toString());

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
          params: {
            id: Joi.required().description("the id for the todo item")
          },
          payload: {
            name: Joi.string()
              .description("the id for the todo item"),
            fromDate: Joi.string()
              .description("the fromDate"),
            toDate: Joi.string()
              .description("the toDate")
          }
        }
      }
    });

    server.route({
      method: "GET",
      path: "/trips/{id}",
      handler: async function(request) {
        var tripId = request.params.id;
        const userId = CUtils.getUserId(request);

        console.log("trip id :" + tripId);
        var trip = await tripQueryHandler.GetById(userId, tripId);
        if (!trip) throw "trip not found";
        return trip;
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.required().description("the id for the todo item")
          }
        }
      }
    });    

    server.route({
      method: "DELETE",
      path: "/trips/{id}",
      handler: async function(request) {
        var tripId = request.params.id;
        const ownerId = CUtils.getUserId(request);

        var commandResult = await tripCommandHandler.exec({
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
          params: {
            id: Joi.required().description("the id for the todo item")
          }
        }
      }
    });  
  }
};
