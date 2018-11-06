import helloService from './services/hello_index';

const Joi = require('joi');

module.exports = {
    init: function(server) {
        server.route({
            method: 'GET',
            path: '/hello/{id}',
            handler: function (request, h) {
                var result = helloService.index(request.params);
                return result;
                // return `${JSON.stringify(request.params)}`;
                // return `hello logged user ${request.auth.credentials.user.name}, params: ${JSON.stringify(request.params)}`;
            },
            options: {
                // auth: "simple",
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




    }
}