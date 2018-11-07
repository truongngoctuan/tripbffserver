import { FooService } from "./services/hello-service";
import { Server } from "hapi";
import {FooRepository} from "./infrastructures/repositories/foo-repository";
const Joi = require("joi");

var helloService = new FooService(new FooRepository());
module.exports = {
  init: function(server: Server) {
    server.route({
      method: "GET",
      path: "/hello",
      handler: function(request, h) {
        try {
          var result = helloService.list({});
          return result;
        } catch (error) {
          console.log(error);
        }
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
        const { name, description } = request.payload as any;
        var result = helloService.create({ name, description });
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
            description: Joi.required().description("description")
          }
        }
      }
    });
  }
};
