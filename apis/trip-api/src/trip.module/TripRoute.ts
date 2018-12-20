import { Server } from "hapi";
const Joi = require("joi");
import uuid from 'uuid/v1'
import { TripCommandHandler } from "./services/commands/_commandHandler";
import { TripQueryHandler } from "./services/TripQuery";
import { ServiceBus } from "./services/TripServiceBus";
import { Err } from "../_shared/utils";
import { TripEventRepository } from "./infrastructures/repositories/TripEventRepository";
import TripRepository from "./infrastructures/repositories/TripRepository";
var fs = require("fs");

const tripEventRepository = new TripEventRepository();
const tripRepository = new TripRepository();
const tripCommandHandler = new TripCommandHandler(
  tripEventRepository,
  new ServiceBus(tripRepository)
);
const tripQueryHandler = new TripQueryHandler(new TripRepository());

module.exports = {
  init: function(server: Server) {
    server.route({
      method: "POST",
      path: "/trips",
      handler: async function(request, h) {
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
      handler: function(request, h) {
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

    server.route({
      method: "GET",
      path: "/trips/{id}/infographic",
      handler: function(request, h) {
        var tripId = request.params.id;
        console.log("trip id get infographic:" + tripId);

        //TODO: trigger create infographic for this trip: date, location name, location description
        //var trip = tripQueryHandler.GetById(tripId);
        
        //return infographic
      var base64Img = fs.readFileSync('svg-info-graphic.png', 'base64');
      return base64Img;
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
