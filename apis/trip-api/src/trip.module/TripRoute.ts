//TODO: move routes into here
import tripService from "./services/TripService";
import { Server } from "hapi";

const Joi = require("joi");

module.exports = {
  init: function(server: Server) {
    server.route({
      method: "POST",
      path: "/trips",
      handler: function(request, h) {
        const {name, fromDate, toDate} = request.payload as any;
        console.log("trip name :" + name);
        console.log("trip from date:" + fromDate);
        console.log("trip to date:" + toDate);

        var data = {
          name,
          fromDate,
          toDate,
        };
        var newTrip = tripService.create(data);

        return newTrip.id;
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
      method: "GET",
      path: "/trips/{id}",
      handler: function(request, h) {
        var tripId = request.params.id;
        console.log("trip id :" + tripId);
        var trip = tripService.getById(tripId);
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
  }
};
