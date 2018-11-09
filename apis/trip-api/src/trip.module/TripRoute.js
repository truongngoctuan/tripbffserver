//TODO: move routes into here
import tripService from "./services/TripService";

const Joi = require("joi");

module.exports = {
  init: function(server) {
    server.route({
      method: "POST",
      path: "/trips",
      handler: function(request, h) {
        console.log("trip name :" + request.payload.name);
        console.log("trip from date:" + request.payload.fromDate);
        console.log("trip to date:" + request.payload.toDate);

        var data = {
          name: request.payload.name,
          fromDate: request.payload.fromDate,
          toDate: request.payload.toDate
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
