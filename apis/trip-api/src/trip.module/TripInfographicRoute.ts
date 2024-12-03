import { Server } from "@hapi/hapi";
import uuid from "uuid/v1";
import { IoC } from "./IoC";
import { CUtils } from "../_shared/ControllerUtils";
import Joi from "joi";

const tripCommandHandler = IoC.tripCommandHandler;
const tripEventQueryHandler = IoC.tripEventQueryHandler;

module.exports = {
  init(server: Server): void {
    server.route({
      method: "POST",
      path: "/trips/{tripId}/infographics",
      async handler(request) {
        const tripId: string = request.params.tripId;
        const { locale } = request.payload as any;

        const ownerId = CUtils.getUserId(request);

        const infographicId = uuid();

        const commandResult = await tripCommandHandler.exec({
          type: "exportInfographic",
          ownerId,
          tripId,
          infographicId,
          locale,
        });

        if (commandResult.isSucceed) {
          return infographicId;
        }

        console.log("err: " + commandResult.errors);
        return commandResult.errors;
      },
      options: {
        auth: "simple",
        tags: ["api"],
        description:
          "SERVER - 01 - Trigger a new event for flow's creating infographic",
      },
    });

    server.route({
      method: "GET",
      path: "/trips/{tripId}/infographics/{infoId}/preUploadImage",
      async handler(request) {
        try {
          const { mimeType } = request.query as any;
          console.log(mimeType);
          const tripId: string = request.params.tripId;

          const category = `trips/${tripId}/infographics`;
          const result = await IoC.fileService.signUpload(
            category ? category : "images",
            mimeType
          );
          return result;
        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        // todo add auth for internal communication
        // auth: "simple",
        tags: ["api"],
        description:
          "SERVER - 02 - sign to upload infographic into s3 (for infographic service)",
      },
    });

    server.route({
      method: "PUT",
      path: "/trips/{tripId}/infographics/{infoId}",
      async handler(request) {
        try {
          const tripId: string = request.params.tripId;
          const infographicId: string = request.params.infoId;

          const { ownerId, fullPath } = request.payload as any;

          const { externalId } = await IoC.fileService.save(fullPath);

          const commandResult = await tripCommandHandler.exec({
            type: "finishExportInfographic",
            ownerId,
            tripId,
            infographicId,
            externalStorageId: externalId,
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
        // todo add auth for internal communication
        // auth: "simple",
        tags: ["api"],
        description:
          "SERVER - 03 - associate uploaded s3 with current infographic id",
      },
    });

    server.route({
      method: "PATCH",
      path: "/trips/{tripId}/infographics/{infographicId}/share",
      async handler(request) {
        try {
          const tripId: string = request.params.tripId;
          const infographicId: string = request.params.infographicId;

          const ownerId = CUtils.getUserId(request);
          const commandResult = await tripCommandHandler.exec({
            type: "finishShareInfographic",
            ownerId,
            tripId,
            infographicId,
          });

          if (commandResult.isSucceed) {
            return true;
          }

          console.log("err: " + commandResult.errors);
          return commandResult.errors;
        } catch (error) {
          console.log(
            "ERROR: PATCH /trips/{id}/infographics/{infoId}/share",
            error
          );
          throw false;
        }
      },
      options: {
        auth: "simple",
        tags: ["api"],
      },
    });

    server.route({
      method: "GET",
      path: "/trips/{tripId}/infographics/{infographicId}",
      async handler(request, h) {
        const tripId = request.params.tripId;
        const infographicId = request.params.infographicId;
        console.log("infographicId", infographicId);
        return new Promise((resolve, reject) => {
          let counter = 0;
          const getEventInterval = setInterval(async () => {
            counter += 1;
            if (counter > 60) {
              console.log(
                `setInterval ${counter} running for ${infographicId}. Stop interval, return timeout`
              );
              clearInterval(getEventInterval);
              const error2 = new Error("request timeout");
              reject(error2);
            }

            const tripEvents = await tripEventQueryHandler.getAll(tripId);

            if (tripEvents) {
              const exportedInfoEvent = tripEvents.find(
                (event) =>
                  event.type == "InfographicExported" &&
                  event.infographicId == infographicId
              ) as any;

              if (exportedInfoEvent) {
                clearInterval(getEventInterval);

                const externalId = exportedInfoEvent.externalStorageId;
                const filePath = `trips/${tripId}/infographics/${externalId}.jpeg`;

                const signedUrl = await IoC.fileService.signGet(filePath);
                // console.log("infographic signed request", signedUrl);
                resolve({ signedUrl: signedUrl, externalId: externalId });
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
        description: "CLIENT - polling infographic data",
        validate: {
          params: Joi.object({
            tripId: Joi.required().description("the tripId for the todo item"),
            infographicId: Joi.required().description(
              "the id for the todo item"
            ),
          }),
        },
      },
    });

    server.route({
      method: "GET",
      path: "/trips/{tripId}/infographics/{externalStorageId}/view",
      async handler(request, h) {
        const tripId = request.params.tripId;
        const externalStorageId = request.params.externalStorageId;
        console.log("externalStorageId", externalStorageId);

        return new Promise(async (resolve, reject) => {
          const filePath = `trips/${tripId}/infographics/${externalStorageId}.jpeg`;
          const signedUrl = await IoC.fileService.signGet(filePath);
          resolve(h.redirect(signedUrl));
        });
      },
      options: {
        auth: "simple",
        tags: ["api"],
        description: "CLIENT - polling infographic data",
        validate: {
          params: Joi.object({
            tripId: Joi.required().description("the tripId for the todo item"),
            externalStorageId: Joi.required().description(
              "the id for the todo item"
            ),
          }),
        },
      },
    });
  },
};
