import { Server } from "hapi";

const authService = require("../bootstraping/authentication.js");
const config = require("../config");

const Joi = require("joi");

module.exports = {
  init: function(server: Server) {
    const locationsSchema = Joi.array().items(
      Joi.object({
        locationId: Joi.number(),
        fromTime: Joi.string(),
        toTime: Joi.string(),
        location: Joi.object({
          long: Joi.number().required(),
          lat: Joi.number().required(),
          address: Joi.string()
        }),
        images: Joi.array().items(
          Joi.object({
            url: Joi.string().required(),
            isSelected: Joi.bool().required()
          })
        )
      })
    );

    server.route({
      method: "POST",
      path: "/trips/{id}/locations",
      handler: function(request, h) {
        var selectedLocations = request.payload;
        var tripId = request.params.id;

        // selectedLocations.forEach(element => {
        //     console.log('location long:' + element.location.long);
        //     console.log('location lat:' + element.location.lat);
        //     console.log('location from time :' + element.fromTime);

        //     var images = element.images;
        //     images.forEach(image => {
        //         console.log('image url: ' + image.url);
        //     });
        // });

        // get trip from redis
        //TODO improve
        // var key = `${config.trip.keyPrefix}:${tripId}`;
        // authService.getAsync(key).then(trip => {
        //   trip.locations = selectedLocations;
        //   // store trip with locations into redis
        //   client.set(key, JSON.stringify(trip));
        // });

        return tripId;
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          payload: locationsSchema
        }
      }
    });

    server.route({
      method: "GET",
      path: "/trips/{id}/locations",
      handler: function(request, h) {
        var tripId = request.params.id;
        var key = `${config.trip.keyPrefix}:${tripId}`;
        var trip = authService.getAsync(key);
        return trip;
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.number()
              .required()
              .description("the id for the todo item")
          }
        }
      }
    });
  }
};
