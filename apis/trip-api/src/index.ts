require('dotenv').config() //red config from .env file

import { Server } from "hapi";
const authService = require("./bootstraping/authentication.js");
const swaggerUiService = require("./bootstraping/swagger-documentation");
const mongoService = require("./bootstraping/mongo-connection");

// import helloRoutes from './sample.module/route';
const helloRoutes = require("./sample.module/route");
const tripRoutes = require("./trip.module/TripRoute");
const tripLocationRoutes = require("./trip.module/TripLocationRoute");
const tripInfographicRoutes = require("./trip.module/TripInfographicRoute");

const config = require("./config");
var redis = require("redis");

(async () => {
  // Create a server with a host and port
  const server = new Server({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    routes: {
      validate: {
        failAction: async (request, h, err) => {
          console.error("ERR:" + JSON.stringify(err));

          throw err;
          // if (process.env.NODE_ENV === 'production') {
          //   // In prod, log a limited error message and throw the default Bad Request error.
          //   console.error('ValidationError:', err.message);
          //   throw Boom.badRequest(`Invalid request payload input`);
          // } else {
          //   // During development, log and respond with the full error.
          //   console.error("ERR:" + JSON.stringify(err));
          //   throw err;
          // }
        }
      }
    }
  });

  var client = redis.createClient({
    host: config.redisStore.host,
    port: config.redisStore.port,
  });

  client.on("error", function(err: any) {
    console.log("Error " + err);
  });

  await swaggerUiService.addSwaggerUi(server);
  await authService.addAuth(server);
  await mongoService.init();

  // Add the route
  helloRoutes.init(server);
  tripRoutes.init(server);
  tripLocationRoutes.init(server);
  tripInfographicRoutes.init(server);

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
