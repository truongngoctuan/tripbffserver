import * as Hapi from "hapi";
const authService = require("./bootstraping/authentication.js");
const swaggerUiService = require("./bootstraping/swagger-documentation");
const mongoService = require('./bootstraping/mongo-connection');

import helloRoutes from './sample.module/route';
import tripRoutes from './trip.module/TripRoute';

const config = require('./config');
const Joi = require('joi');
var redis = require("redis");

(async () => {
    // Create a server with a host and port
    const server = Hapi.server({
        //host: 'localhost',
        host: '192.168.2.101', // local: should use IP4 of current local computer to allow call API from native app
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


    // Add routes
    helloRoutes.init(server);
    tripRoutes.init(server);

    ////////////// TRIP IMPORT API ////////////

    const locationsSchema = Joi.array().items(Joi.object({
        locationId: Joi.number(),
        fromTime: Joi.string(),
        toTime: Joi.string(),
        location: Joi.object({
            long: Joi.number().required(),
            lat: Joi.number().required(),
            address: Joi.string()
        })
        ,
        images: Joi.array().items(Joi.object({
            url: Joi.string().required(),
            isSelected: Joi.bool().required()
        }))
    }));

    server.route({
        method: 'POST',
        path: '/trips/{id}/locations',
        handler: function (request, h) {
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
            authService.getAsync(key).then((trip) => {
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
            },
        }        
    });
    

    server.route({
        method: 'GET',
        path: '/trips/{id}/locations',
        handler: function (request, h) {
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