import { Server } from "hapi";
const authService = require("./bootstraping/authentication.js");
const swaggerUiService = require("./bootstraping/swagger-documentation");
const mongoService = require("./bootstraping/mongo-connection");

// import helloRoutes from './sample.module/route';
const helloRoutes = require("./sample.module/route");
const tripRoutes = require("./trip.module/TripRoute");
const tripLocationRoutes = require("./trip.module/TripLocationRoute");

const config = require("./config");
var redis = require("redis");

(async () => {
  // Create a server with a host and port
  const server = new Server({
    //host: 'localhost',
    //  host: '192.168.2.101', // local: should use IP4 of current local computer to allow call API from native app
    host: '192.168.1.8',
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
  tripRoutes.init(server);
  tripLocationRoutes.init(server);

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
