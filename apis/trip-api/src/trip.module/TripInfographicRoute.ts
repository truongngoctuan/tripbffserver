import { Server } from "hapi";
const uuid = require("uuid/v1");
import { IoC } from "./IoC";
import { CUtils } from "./ControllerUtils";
var fs = require("fs");
const Joi = require("joi");

const tripCommandHandler = IoC.tripCommandHandler;

module.exports = {
  init: function(server: Server) {
    server.route({
      method: "POST",
      path: "/trips/{id}/infographics",
      handler: async function(request) {
        try {
          var tripId: string = request.params.id;
          const ownerId = CUtils.getUserId(request);

          var infographicId = uuid();
          var commandResult = await tripCommandHandler.exec({
            type: "exportInfographic",
            ownerId,
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
          const ownerId = CUtils.getUserId(request);

          var data: any = request.payload;
          var file: Buffer = new Buffer(JSON.parse(data.file).data);
          console.log("file", file);

          var category = `uploads/trips/${tripId}/infographics`;
          var fileName = `${infographicId}.png`;
          const { externalId } = await IoC.fileService.save(
            file,
            category,
            fileName
          );

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
        // auth: "simple",
        tags: ["api"]
      }
    });

    server.route({
      method: "GET",
      path: "/trips/infographics/{id}",
      handler: async function(request, h) {
        var externalId = request.params.id;
        console.log("infographic externalId :" + externalId);

        // TODO: get infographic by externalId
        //var infographic =  await IoC.fileService.getById(externalId);
        //infographic.file.setEncoding("base64");

        var imgStream = fs.createReadStream("uploads/Image03.jpg");
        imgStream.setEncoding("base64");

        return new Promise(resolve => {
          var bufs = '';

          imgStream.on('data', (chunk) => {
            bufs += chunk;
          });
          imgStream.on('end', () => {
            const response = h.response(bufs);
            resolve(response);
          });
        });
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
  }
};
