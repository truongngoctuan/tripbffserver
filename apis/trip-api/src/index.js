import * as Hapi from "hapi";
const authService = require("./bootstraping/authentication.js");
const swaggerUiService = require("./bootstraping/swagger-documentation");

const Joi = require('joi');

(async () => {
    // Create a server with a host and port
    const server = Hapi.server({
        //host: 'localhost',
        host: '192.168.2.101', // local: should use IP4 of current local computer to allow call API from native app
        port: 8000
    });

    await swaggerUiService.addSwaggerUi(server);
    await authService.addAuth(server);

    // Add the route
    server.route({
        method: 'GET',
        path: '/hello/{id}',
        handler: function (request, h) {
            console.log(request.auth);
            return `hello logged user ${request.auth.credentials.user.name}, params: ${JSON.stringify(request.params)}`;
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