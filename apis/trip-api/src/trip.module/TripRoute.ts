import { Server } from "hapi";
const Joi = require("joi");
import uuid from 'uuid/v1'
import { Err } from "../_shared/utils";
import { IoC } from "./IoC";

const tripCommandHandler = IoC.tripCommandHandler;
const tripQueryHandler = IoC.tripQueryHandler;

module.exports = {
  init: function(server: Server) {
    server.route({
      method: "POST",
      path: "/trips",
      handler: async function(request) {
        const { name, fromDate, toDate } = request.payload as any;
        console.log("trip name :" + name);
        console.log("trip from date:" + fromDate);
        console.log("trip to date:" + toDate);

        try {
          const { name, fromDate, toDate } = request.payload as any;
          var tripId = uuid();

          var commandResult = await tripCommandHandler.exec({
            type: "createTrip",
            tripId: tripId.toString(),
            name,
            fromDate,
            toDate,
          });

          if (commandResult.isSucceed) {
            var queryResult = await tripQueryHandler.GetById(tripId.toString());

            if (!queryResult) return Err("can't get data after create trip");
            return queryResult.id;
          }

          return commandResult.errors;
        } catch (error) {
          console.log(error);
        }
      },
      options: {
        // auth: "simple",
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
      method: "GET",
      path: "/trips/{id}",
      handler: function(request) {
        var tripId = request.params.id;
        console.log("trip id :" + tripId);
        var trip = tripQueryHandler.GetById(tripId);
        return trip;
      },
      options: {
        // auth: "simple",
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
