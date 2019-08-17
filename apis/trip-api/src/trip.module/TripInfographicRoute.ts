import { Server } from "hapi";
const uuid = require("uuid/v1");
import { IoC } from "./IoC";
import { CUtils } from "../_shared/ControllerUtils";
const Joi = require("joi");

const tripCommandHandler = IoC.tripCommandHandler;
const tripEventQueryHandler = IoC.tripEventQueryHandler;

module.exports = {
  init: function(server: Server) {
    server.route({
      method: "POST",
      path: "/trips/{id}/infographics",
      handler: async function(request) {
        console.log("POST /trips/{id}/infographics");
        try {
          var tripId: string = request.params.id;
          var { locale } = request.payload as any;
          
          const ownerId = CUtils.getUserId(request);

          var infographicId = uuid();     

          var commandResult = await tripCommandHandler.exec({
            type: "exportInfographic",
            ownerId,
            tripId,
            infographicId,
            locale
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
        tags: ["api"]
      }
    });

    server.route({
      method: "GET",
      path: "/trips/{id}/infographics/{infoId}/preUploadImage",
      handler: async function(request) {
        console.log("GET /images/preUploadImage");

        try {
          const { mimeType } = request.query as any;
          console.log(mimeType);
          var tripId: string = request.params.id;

          var category = `trips/${tripId}/infographics`;
          const result = await IoC.fileService.signUpload(category ? category : "images", mimeType);

          return result;

        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        //todo add auth for internal communication
        // auth: "simple",
        tags: ["api"]
      }
    });
    
    server.route({
      method: "PUT",
      path: "/trips/{id}/infographics/{infoId}",
      handler: async function(request) {
        try {
          var tripId: string = request.params.id;
          var infographicId: string = request.params.infoId;
          
          const {
            ownerId,
            fullPath
          } = request.payload as any;

          const { externalId } = await IoC.fileService.save(fullPath);

          var commandResult = await tripCommandHandler.exec({
            type: "finishExportInfographic",
            ownerId,
            tripId,
            infographicId,
            externalStorageId: externalId
          });

          if (commandResult.isSucceed) {
            return externalId;
          }

          console.log("err: " + commandResult.errors);
          return commandResult.errors;
        } catch (error) {
          console.log("ERROR: PUT /trips/{id}/infographics/{infoId}", error);
          throw error;
        }
      },
      options: {
        //todo add auth for internal communication
        //auth: "simple",
        tags: ["api"]
      }
    });

    server.route({
      method: "GET",
      path: "/trips/{tripId}/infographics/{infographicId}",
      handler: async function(request, h) {
        const tripId = request.params.tripId;
        const inforgraphicId = request.params.infographicId;

        return new Promise((resolve, reject) => {
          let counter = 0;
          let getEventInterval = setInterval(async () => {
            counter += 1;
            if (counter > 60) {
              console.log(`setInterval ${counter} running for ${inforgraphicId}. Stop interval, return timeout`);
              clearInterval(getEventInterval);
              const error2 = new Error("request timeout");
              reject(error2);
            }

            const tripEvents = await tripEventQueryHandler.getAll(tripId);

            if (tripEvents) {
              const exportedInfoEvent = tripEvents.find(event => 
                event.type == 'InfographicExported' && event.infographicId == inforgraphicId) as any;

              if (exportedInfoEvent) {
                clearInterval(getEventInterval);

                const externalId = exportedInfoEvent.externalStorageId;
                const filePath = `trips/${tripId}/infographics/${externalId}.png`;

                const signedUrl = await IoC.fileService.signGet(filePath);
                console.log("infographic signed request", signedUrl);
                resolve(h.redirect(signedUrl));
              }
            } else {
              clearInterval(getEventInterval);
              const error = new Error("Could not found any trip events.");
              reject(error);
            }
          }, 500);
        });

      },
      options: {
        auth: "simple",
        tags: ["api"],
        validate: {
          params: {
            tripId: Joi.required().description("the tripId for the todo item"),
            infographicId: Joi.required().description("the id for the todo item")
          }
        }
      }
    });
  }
};
