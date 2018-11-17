import { Server } from "hapi";
const Joi = require("joi");
import { TripCommandHandler } from "./services/commands/_commandHandler";
import { TripQueryHandler } from "./services/TripQuery";
import { ServiceBus } from "./services/TripServiceBus";
import { Err } from "../_shared/utils";
import { TripEventRepository } from "./infrastructures/repositories/TripEventRepository";
import TripRepository from "./infrastructures/repositories/TripRepository";
import { uploadImage } from "./services/commands/uploadImage";

//todo remove duplication in here by using some sort of DI ??
const tripEventRepository = new TripEventRepository();
const tripRepository = new TripRepository();
const tripCommandHandler = new TripCommandHandler(
  tripEventRepository,
  new ServiceBus(tripRepository)
);
const tripQueryHandler = new TripQueryHandler(new TripRepository());

module.exports = {
  init: function(server: Server) {
    server.route({
      method: "POST",
      path: "/images",
      handler: async function(request, h) {
        try {
        const { name, file } = request as any;
        // await uploadImage(file, name);

        } catch (error) {
          console.log(error);
        }
      },
      options: {
        // auth: "simple",
        tags: ["api"],
        validate: {
          payload: {
            name: Joi.string()
              .required()
              .description("the id for the todo item"),
            fromDate: Joi.string()
              .required()
              .description("the fromDate"),
            toDate: Joi.string()
              .required()
              .description("the toDate")
          }
        }
      }
    });

    server.route({
      method: "GET",
      path: "/images/{id}",
      handler: function(request, h) {},
      options: {
        // auth: "simple",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.required().description("the id for the todo item")
          }
        }
      }
    });
  }
};
