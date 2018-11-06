import * as Hapi from "hapi";
const authService = require("./bootstraping/authentication.js");
const swaggerUiService = require("./bootstraping/swagger-documentation");

import helloRoutes from './sample.module/route';

(async () => {
    // Create a server with a host and port
    const server = Hapi.server({
        host: 'localhost',
        port: 8000
    });

    await swaggerUiService.addSwaggerUi(server);
    await authService.addAuth(server);

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