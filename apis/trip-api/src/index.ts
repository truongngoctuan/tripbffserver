require("dotenv").config(); // red config from .env file

//-------------------
//setup timezone to utc
import moment from "moment-timezone";
console.log("checking current time in server", moment().format());

moment.tz.setDefault("Zulu");

console.log("checking current time in server", moment().format());
console.log(moment.tz.guess());
//-------------------

import { Server } from "hapi";
import { registerModules } from "./trip.module/_core/services/commands";
const authService = require("./bootstraping/authentication.js");
const swaggerUiService = require("./bootstraping/swagger-documentation");
const mongoService = require("./bootstraping/mongo-connection");

// import helloRoutes from './sample.module/route';
const helloRoutes = require("./sample.module/route");
const tripRoutes = require("./trip.module/TripRoute");
const imageRoutes = require("./trip.module/ImageRoute");
const tripLocationRoutes = require("./trip.module/TripLocationRoute");
const tripInfographicRoutes = require("./trip.module/TripInfographicRoute");
const dataSourceRoutes = require("./trip.module/DataSourceRoute");

const redis = require("redis");

(async () => {
  // Create a server with a host and port
  const server = new Server({
    // host: process.env.SERVER_HOST,
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
        },
      },
    },
  });

  const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

  client.on("error", function (err: any) {
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
  imageRoutes.init(server);
  dataSourceRoutes.init(server);

  registerModules();

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
