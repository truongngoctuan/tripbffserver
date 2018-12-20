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
import * as fs from "fs";
import { IFileStorageService } from "../image.module/IFileStorageService";

const tripEventRepository = new TripEventRepository();
const tripRepository = new TripRepository();
const tripCommandHandler = new TripCommandHandler(
  tripEventRepository,
  new ServiceBus(tripRepository)
);
const tripQueryHandler = new TripQueryHandler(new TripRepository());

const fileService: IFileStorageService = new FileStorageOfflineService();

const authService = require("../bootstraping/authentication.js");
const config = require("../config");

const Joi = require("joi");

module.exports = {
  init: function(server: Server) {
    server.route({
      method: "POST",
      path: "/trips/{id}/infographics",
      handler: async function(request, h) {
        try {
          var tripId: string = request.params.id;

          var infographicId = uuid();
          var commandResult = await tripCommandHandler.exec({
            type: "info",
            tripId,
            infographicId
          });

          if (commandResult.isSucceed) {
            return infographicId;
          }

          console.log("err: " + commandResult.errors);
          return commandResult.errors;
        } catch (error) {
          console.log("ERROR: POST /trips/{id}/infographics");
          console.log(error);
          throw error;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
        //todo add infographic type
      }
    });
  }
};
