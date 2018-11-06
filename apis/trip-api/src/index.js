import * as Hapi from "hapi";
const authService = require("./bootstraping/authentication.js");
const swaggerUiService = require("./bootstraping/swagger-documentation");
const mongoService = require('./bootstraping/mongo-connection');

import helloRoutes from './sample.module/route';

const config = require('./config');
const Joi = require('joi');
var redis = require("redis");

(async () => {
    // Create a server with a host and port
    const server = Hapi.server({
        host: 'localhost',
        // host: '192.168.0.109', // local: should use IP4 of current local computer to allow call API from native app
        port: 8000
    });

    var client = redis.createClient({
        host: config.redisStore.host,
        port: config.redisStore.port,
    })

    await swaggerUiService.addSwaggerUi(server);
    await authService.addAuth(server);
    await mongoService.init();


    // Add the route
    helloRoutes.init(server);

    // server.route({
    //     method: 'GET',
    //     path: '/hello/{id}',
    //     handler: function (request, h) {
    //         var result = helloService.index(request.params);
    //         return JSON.stringify(result);
    //         // return `${JSON.stringify(request.params)}`;
    //         // return `hello logged user ${request.auth.credentials.user.name}, params: ${JSON.stringify(request.params)}`;
    //     },
    //     options: {
    //         // auth: "simple",
    //         tags: ["api"],
    //         validate: {
    //             params: {
    //                 id: Joi.number()
    //                     .required()
    //                     .description('the id for the todo item'),
    //             }
    //         },
    //     }
    // });

    ///////////////// TRIP API /////////////////////

    server.route({
        method: 'POST',
        path: '/trips',
        handler: function (request, h) {
            console.log('trip name :' + request.payload.name);
            console.log('trip from date:' + request.payload.fromDate);
            console.log('trip to date:' + request.payload.toDate);

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
                    name: Joi.string().required().description('the id for the todo item'),
                    fromDate: Joi.date().required().description('the fromDate'),
                    toDate: Joi.date().required().description('the toDate'),
                }
            },
        }
    });


    server.route({
        method: 'GET',
        path: '/trips/{id}',
        handler: function (request, h) {
            var tripId = request.params.id;
            console.log('trip id :' + tripId);
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
                        .description('the id for the todo item'),
                }
            },
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

        console.log('Server running at:', server.info.uri);
    };

    start();
})();