import * as Hapi from "hapi";
const authService = require("./bootstraping/authentication.js");
const swaggerUiService = require("./bootstraping/swagger-documentation");

const Joi = require('joi');

(async () => {
    // Create a server with a host and port
    const server = Hapi.server({
        host: 'localhost',
        port: 8000
    });

    await swaggerUiService.addSwaggerUi(server);
    await authService.addAuth(server);

    // Add the route
    server.route({
        method: 'GET',
        path: '/hello/{id}',
        handler: function (request, h) {
            return 'hello world2';
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