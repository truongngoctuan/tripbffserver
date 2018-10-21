import * as Hapi from "hapi";

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');
const Joi = require('joi');

(async () => {
    // Create a server with a host and port
    const server = Hapi.server({
        host: 'localhost',
        port: 8000
    });

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: Pack.version,
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    // Add the route
    server.route({
        method: 'GET',
        path: '/hello/{id}',
        handler: function (request, h) {

            return 'hello world2';
        },
        options: {
            tags: ["api"],
            validate: {
                params: {
                    id : Joi.number()
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