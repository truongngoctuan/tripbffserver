import { Server } from "hapi";
const uuid = require("uuid/v1");
import { TripCommandHandler } from "./services/commands/_commandHandler";
import { TripQueryHandler } from "./services/TripQuery";
import { ServiceBus } from "./services/TripServiceBus";
import { Err } from "../_shared/utils";
import { TripEventRepository } from "./infrastructures/repositories/TripEventRepository";
import TripRepository from "./infrastructures/repositories/TripRepository";
import { uploadImage } from "./services/commands/uploadImage";
import { FileStorageOfflineService } from "../image.module/FileStorageOfflineService";

const tripEventRepository = new TripEventRepository();
const tripRepository = new TripRepository();
const tripCommandHandler = new TripCommandHandler(
  tripEventRepository,
  new ServiceBus(tripRepository)
);
const tripQueryHandler = new TripQueryHandler(new TripRepository());

const fileService = new FileStorageOfflineService();

const authService = require("../bootstraping/authentication.js");
const config = require("../config");

const Joi = require("joi");

module.exports = {
  init: function(server: Server) {
    const locationsSchema = Joi.array().items(
      Joi.object({
        locationId: Joi.string(),
        fromTime: Joi.string(),
        toTime: Joi.string(),
        location: Joi.object({
          long: Joi.number().required(),
          lat: Joi.number().required(),
          address: Joi.string()
        }),
        images: Joi.array().items(
          Joi.object({
            url: Joi.string().required(),
            // isSelected: Joi.bool().required()
          })
        )
      })
    );

    server.route({
      method: "POST",
      path: "/trips/{id}/locations",
      handler: async function(request, h) {
        try {
          console.log("POST" + request.url)
          var selectedLocations = request.payload as any;
          var tripId = request.params.id;

          // create import command
          var commandResult = await tripCommandHandler.exec({
            type: "importTrip",
            tripId: tripId.toString(),
            locations: selectedLocations
          });

          if (commandResult.isSucceed) {
            var queryResult = await tripQueryHandler.GetById(tripId.toString());
            if (!queryResult) return Err("can't get data after import trip");

            // console.log(queryResult);
            return queryResult;
          }

          console.log("err: " + commandResult.errors)
          return commandResult.errors;
        } catch (error) {
          console.log("ERROR: POST /trips/{id}/locations");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          payload: locationsSchema
        }
      }
    });

    server.route({
      method: "GET",
      path: "/trips/{id}/locations",
      handler: async function(request, h) {
        var tripId = request.params.id;
        var queryResult = await tripQueryHandler.GetById(tripId.toString());
        if (!queryResult) return Err("can't get data after import trip");
        return queryResult;
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.required().description("the id for the todo item")
          }
        }
      }
    });

    server.route({
      method: "POST",
      path: "/trips/{tripId}/uploadImage",
      handler: async function(request, h) {
        try {
          const { tripId } = request.params;
          const {
            locationId,
            imageId,
            file,
            fileName
          } = request.payload as any;

          var category = `upload/${tripId}/trips/locations`;
          const { externalId } = await fileService.save(
            file,
            category,
            fileName
          );

          // create import command
          var commandResult = await tripCommandHandler.exec({
            type: "uploadImage",
            tripId,
            locationId,
            imageId,
            externalStorageId: externalId
          });

          if (commandResult.isSucceed) {
            return tripId;
          }

          //todo cleanup uploaded file after command failed

          return commandResult.errors;
        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          payload: locationsSchema
        }
      }
    });
  }
};
