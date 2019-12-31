require("dotenv").config(); // red config from .env file
import { setupExtraFunction } from "./_shared/utils";
setupExtraFunction();

// -------------------
// setup timezone to utc
import moment from "moment-timezone";
console.log("checking current time in server", moment().format());

moment.tz.setDefault("Zulu");

console.log("checking current time in server", moment().format());
console.log(moment.tz.guess());
// -------------------

import { Server } from "@hapi/hapi";
import { registerModules } from "./trip.module/_core/services/commands";
const authService = require("./bootstraping/authentication.js");
const swaggerUiService = require("./bootstraping/swagger-documentation");
const mongoService = require("./bootstraping/mongo-connection");
const monitoringService = require("./bootstraping/prometheus-client");

// import helloRoutes from './sample.module/route';
const helloRoutes = require("./sample.module/route");
const tripRoutes = require("./trip.module/TripRoute");
const imageRoutes = require("./trip.module/ImageRoute");
const tripLocationRoutes = require("./trip.module/TripLocationRoute");
const tripInfographicRoutes = require("./trip.module/TripInfographicRoute");
const dataSourceRoutes = require("./trip.module/DataSourceRoute");
const userSettingRoutes = require("./setting.module/UserSettingRoute");

const redis = require("redis");

(async () => {
  // Create a server with a host and port
  const server = new Server({
    port: process.env.INTERNAL_SERVER_PORT,
    routes: {
      validate: {
        failAction: async (request, h, err) => {
          console.error("ERR:", JSON.stringify(err));

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

  monitoringService.addMonitoringService(server);

  // log requests
  server.ext("onRequest", (request, h) => {
    request.headers["x-req-start"] = (new Date()).getTime().toString();
    return h.continue;
  });

  server.events.on("response", (request) => {
    const start = parseInt(request.headers["x-req-start"]);
    const end = (new Date()).getTime();
    const responseTime = end - start;
    console.log(request.info.remoteAddress + ": " + `${responseTime.toString().padStart(6, "0")} milli ` + request.method.toUpperCase() + " " + request.path + " --> " + (request.response as any).statusCode);
  });

  const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    secret: process.env.REDIS_SECRET,
  });

  client.on("error", (err: any) => {
    console.log(`Error ${err}`);
  });

  client.on("connect", () => {
    console.log("redis connected");
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
  userSettingRoutes.init(server);

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
