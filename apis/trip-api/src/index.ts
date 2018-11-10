import { Server } from "hapi";
const authService = require("./bootstraping/authentication.js");
const swaggerUiService = require("./bootstraping/swagger-documentation");
const mongoService = require("./bootstraping/mongo-connection");

// import helloRoutes from './sample.module/route';
const helloRoutes = require("./sample.module/route");

const config = require("./config");
const Joi = require("joi");
var redis = require("redis");

(async () => {
  // Create a server with a host and port
  const server = new Server({
    //host: 'localhost',
    host: '192.168.2.101', // local: should use IP4 of current local computer to allow call API from native app
    // host: '192.168.0.109', // local: should use IP4 of current local computer to allow call API from native app
    port: 8000
  });

  var client = redis.createClient({
    host: config.redisStore.host,
    port: config.redisStore.port
  });

  client.on("error", function(err: any) {
    console.log("Error " + err);
  });

  await swaggerUiService.addSwaggerUi(server);
  await authService.addAuth(server);
  await mongoService.init();

  // Add the route
  helloRoutes.init(server);

  ///////////////// TRIP API /////////////////////

  server.route({
    method: "POST",
    path: "/trips",
    handler: function(request, h) {
      console.log("trip name :" + request.payload.name);
      console.log("trip from date:" + request.payload.fromDate);
      console.log("trip to date:" + request.payload.toDate);

      //TODO: should create tripId later when we have mongo DB
      var tripId = Math.floor(Math.random() * 100);
      var data = {
        id: tripId,
        name: request.payload.name,
        fromDate: request.payload.fromDate,
        toDate: request.payload.toDate
      };
      // store trip info into Redis and return tripId
      client.set(`${config.trip.keyPrefix}:${tripId}`, JSON.stringify(data));
      return tripId;
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
      var trip = authService.getAsync(`${config.trip.keyPrefix}:${tripId}`);
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

  ////////////// TRIP IMPORT API ////////////

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
      var key = `${config.trip.keyPrefix}:${tripId}`;
      authService.getAsync(key).then(trip => {
        trip.locations = selectedLocations;
        // store trip with locations into redis
        client.set(key, JSON.stringify(trip));
      });

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

  // Start the server
  async function start() {
    try {
      await server.start();
    } catch (err) {
      console.log(err);
      process.exit(1);
    }

    console.log("Server running at:", server.info.uri);
  }

  start();
})();
