import { Server } from "hapi";
import { Err } from "../_shared/utils";
import { FileStorageOfflineService } from "../image.module/FileStorageOfflineService";
import { IFileStorageService } from "../image.module/IFileStorageService";
import { IoC } from "./IoC";
import { CUtils } from "./ControllerUtils";
import uuid4 from 'uuid/v4';
import { FeelingRepository } from "./_infrastructures/repositories/FeelingRepository";
import { IFeeling } from "./_core/models/ITrip";

const tripCommandHandler = IoC.tripCommandHandler;
const tripQueryHandler = IoC.tripQueryHandler;
const dataSourceQueryHandler = IoC.dataSourceQueryHandler;
const Joi = require("joi");

module.exports = {
  init: function(server: Server) {
    const locationsSchema = Joi.array().items(
      Joi.object({
        fromTime: Joi.string(),
        toTime: Joi.string(),
        location: Joi.object({
          long: Joi.number().required(),
          lat: Joi.number().required(),
          address: Joi.string()
        }),
        images: Joi.array().items(
          Joi.object({
            url: Joi.string().required()
          })
        )
      })
    );

    const locationSchema = Joi.object({
      fromTime: Joi.string(),
      toTime: Joi.string(),
      location: Joi.object({
        long: Joi.number(),
        lat: Joi.number(),
        address: Joi.string()
      }),
      images: Joi.array().items(
        Joi.object({
          url: Joi.string()
        })
      )
    })

    server.route({
      method: "POST",
      path: "/trips/{id}/locations",
      handler: async function(request) {
        try {
          console.log("POST", request.url);
          var selectedLocations = request.payload as any;
          var tripId = request.params.id;
          const ownerId = CUtils.getUserId(request);

          // create import command
          var commandResult = await tripCommandHandler.exec({
            type: "importTrip",
            ownerId,
            tripId: tripId.toString(),
            locations: selectedLocations
          });

          if (commandResult.isSucceed) {
            var queryResult = await tripQueryHandler.GetById(ownerId, tripId.toString());
            if (!queryResult) return Err("can't get data after import trip");

            // console.log(queryResult);
            return queryResult;
          }

          console.log("err: " + commandResult.errors);
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
      method: "POST",
      path: "/trips/{id}/locations/addLocation",
      handler: async function(request) {
        try {
          console.log("POST", request.url);
          var selectedLocation = request.payload as any;
          var tripId = request.params.id;
          const ownerId = CUtils.getUserId(request);
          
          selectedLocation.locationId = uuid4();

          // create import command
          var commandResult = await tripCommandHandler.exec({
            type: "AddLocation",
            ownerId,
            tripId: tripId.toString(),
            location: selectedLocation
          });

          commandResult.data = selectedLocation.locationId;
          return commandResult;
        } catch (error) {
          console.log("ERROR: POST /trips/{id}/locations/addLocation");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          payload: locationSchema
        }
      }
    });

    server.route({
      method: "DELETE",
      path: "/trips/{tripId}/locations/{locationId}",
      handler: async function(request) {
        try {
          console.log("DELETE", request.url.path);
          var tripId: string = request.params.tripId;
          var locationId: string = request.params.locationId;

          const ownerId = CUtils.getUserId(request);

          // create import command
          var commandResult = await tripCommandHandler.exec({
            type: "RemoveLocation",
            ownerId,
            tripId,
            locationId,
          });

          if (commandResult.isSucceed) {
            var queryResult = await tripQueryHandler.GetById(ownerId, tripId.toString());
            if (!queryResult) return Err("can't get data after import trip");

            // console.log(queryResult);
            return queryResult;
          }

          console.log("err: " + commandResult.errors);
          return commandResult.errors;
        } catch (error) {
          console.log("ERROR: DELETE /trips/{tripId}/locations/{locationId}");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
      }
    });

    server.route({
      method: "PUT",
      path: "/trips/{tripId}/locations/{locationId}/feeling",
      handler: async function(request) {
        try {
          var tripId: string = request.params.tripId;
          var locationId: string = request.params.locationId;
          var { feelingId, feelingLabel, feelingIcon } = request.payload as any;

          const ownerId = CUtils.getUserId(request);
          console.log('feeling icon: ' + feelingIcon);

          // create import command
          var commandResult = await tripCommandHandler.exec({
            type: "UpdateLocationFeeling",
            ownerId,
            tripId,
            locationId,
            feelingId,
            feelingLabel,
            feelingIcon
          });

          if (commandResult.isSucceed) return "Success!";

          console.log("err: " + commandResult.errors);
          return commandResult.errors;
        } catch (error) {
          console.log("ERROR: UPDATE /trips/{tripId}/locations/{locationId}/feeling");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
      }
    });

    server.route({
        method: "GET",
        path: "/trips/feelings",
        handler: async function(request) {
          var feelings = dataSourceQueryHandler.getFeelings();
          return feelings;
        },
        options: {
          auth: "simple",
          tags: ["api"]
      }
    });

    //TODO: Insert feelings route will be removed later
    server.route({
      method: "POST",
      path: "/trips/feelings/insert",
      handler: async function(request) {
        var feelingRepo =  new FeelingRepository();
        var feelings: Array<IFeeling> = [
          {
            feelingId: 1,
            label: "Happy",
            icon: "smile-o"
          },
          {
            feelingId: 2,
            label: "Sad",
            icon: "frown-o"
          }
        ];
        feelingRepo.insertMany(feelings);
        return true;
      }
    });

    server.route({
      method: "GET",
      path: "/trips/{id}/locations",
      handler: async function(request) {
        try {
          var tripId = request.params.id;
          const userId = CUtils.getUserId(request);          
          var queryResult = await tripQueryHandler.GetById(userId, tripId.toString());
          if (!queryResult) return Err("can't get data after import trip");
          return queryResult;

        } catch (error) {
          console.log(error);
          return error;
        }
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
      handler: async function(request) {
        console.log("POST /trips/{tripId}/uploadImage");
        try {
          const { tripId } = request.params;
          const {
            locationId,
            imageId,
            file,
            fileName
          } = request.payload as any;
          const ownerId = CUtils.getUserId(request);

          var category = `uploads/trips/${tripId}`;
          const { externalId } = await IoC.fileService.save(
            file as Buffer,
            category,
            fileName
          );

          console.log({
            type: "uploadImage",
            tripId,
            locationId,
            imageId,
            externalStorageId: externalId
          })
          // create import command
          var commandResult = await tripCommandHandler.exec({
            type: "uploadImage",
            ownerId,
            tripId,
            locationId,
            imageId,
            externalStorageId: externalId
          });

          if (commandResult.isSucceed) {
            return externalId;
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
        payload: {
          parse: true,
          maxBytes: 50 * 1024 * 1024
        }
      }
    });

    server.route({
      method: "POST",
      path: "/uploadImage",
      handler: async function(request) {
        console.log("POST /uploadImage");
        try {
          const data = request.payload as any;
          const file: Buffer = data.file;
          const fileName: string = data.fileName;

          console.log("fileName");
          console.log(fileName);
          console.log("file");
          console.log(file);

          var category = "./upload/images";
          const { externalId } = await IoC.fileService.save(
            file,
            category,
            fileName
          );

          return { status: "ok" };
        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
        payload: {
          parse: true,
          maxBytes: 50 * 1024 * 1024
        }
      }
    });
  }
};
