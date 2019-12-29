import { Server } from "hapi";
import { FooRepository } from "./infrastructures/repositories/FooRepository";
import { FooCommandHandler } from "./services/commands/_commandHandler";
import { ServiceBus } from "./services/ServiceBus";
import { FooQueryHandler } from "./services/FooQuery";
import { FooEventRepository } from "./infrastructures/repositories/FooEventRepository";
const Joi = require("joi");

const fooEventRepository = new FooEventRepository();
const fooRepository = new FooRepository();
const fooCommandHandler = new FooCommandHandler(
  fooEventRepository,
  new ServiceBus(fooRepository)
);
const fooQueryHandler = new FooQueryHandler(new FooRepository());

module.exports = {
  init: function(server: Server) {
    server.route({
      method: "GET",
      path: "/hello",
      handler: async function(request, h) {
        try {
          const result = await fooQueryHandler.list();
          return result;
        } catch (error) {
          console.log(error);
        }
        // return `${JSON.stringify(request.params)}`;
        // return `hello logged user ${request.auth.credentials.user.name}, params: ${JSON.stringify(request.params)}`;
      },
      options: {
        auth: "simple",
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
      handler: async function(request, h) {
        try {
          const { name, description } = request.payload as any;
          const fooId = Math.floor(Math.random() * 100);

          const commandResult = await fooCommandHandler.exec({
            type: "createFoo",
            fooId: fooId.toString(),
            name,
            description
          });

          if (commandResult.isSucceed) {
            const queryResult = await fooQueryHandler.GetById(fooId.toString());
            return queryResult;
          }

          return commandResult.errors;
        } catch (error) {
          console.log(error);
        }
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

    server.route({
      method: "PUT",
      path: "/hello/{id}",
      handler: async function(request, h) {
        try {
          const { name, description } = request.payload as any;
          const fooId = request.params.id;

          const commandResult = await fooCommandHandler.exec({
            type: "updateFoo",
            fooId: fooId.toString(),
            name,
            description
          });

          if (commandResult.isSucceed) {
            const queryResult = await fooQueryHandler.GetById(fooId.toString());
            return queryResult;
          }

          return commandResult.errors;
        } catch (error) {
          console.log(error);
        }
      },
      options: {
        // auth: "simple",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.required().description("the id for the todo item")
          },
          payload: {
            name: Joi.required().description("name"),
            description: Joi.required().description("description")
          }
        }
      }
    });
  }
};
