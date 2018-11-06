import helloService from "./services/hello-service";

const Joi = require("joi");

module.exports = {
  init: function(server) {
    server.route({
      method: "GET",
      path: "/hello",
      handler: function(request, h) {
          try {
              var result = helloService.list();
              
          } catch (error) {
              console.log(error);
          }
        return result;
        // return `${JSON.stringify(request.params)}`;
        // return `hello logged user ${request.auth.credentials.user.name}, params: ${JSON.stringify(request.params)}`;
      },
      options: {
        // auth: "simple",
        tags: ["api"],
        validate: {
        //   params: {
        //     id: Joi.required().description("the id for the todo item")
        //   }
        }
      }
    });

    server.route({
      method: "POST",
      path: "/hello",
      handler: function(request, h) {
        var result = helloService.create(request.payload);
        return result;
        // return `${JSON.stringify(request.params)}`;
        // return `hello logged user ${request.auth.credentials.user.name}, params: ${JSON.stringify(request.params)}`;
      },
      options: {
        // auth: "simple",
        tags: ["api"],
        validate: {
          payload: {
            name: Joi.required().description("name"),
            description: Joi.required().description("description"),
          },
        }
      }
    });
  }
};
