import { Server } from "hapi";
const uuid = require("uuid/v1");
import { IoC } from "./IoC";
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

          var infographicId = uuid();
          var commandResult = await tripCommandHandler.exec({
            type: "exportInfographic",
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
        // auth: "simple",
        tags: ["api"]
        //todo add infographic type
      }
    });

    server.route({
      method: "PUT",
      path: "/trips/{id}/infographics/{infoId}",
      handler: async function(request) {
        try {
          var tripId: string = request.params.id;
          var infographicId: string = request.params.infoId;

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
        // auth: "simple",
        tags: ["api"]
      }
    });

    server.route({
      method: "GET",
      path: "/trips/{id}/infographics",
      handler: function(request, h) {
        var infographicId = request.params.id;
        console.log("infographic id :" + infographicId);

        //TODO: get infographic by id

        //return infographic
        var base64Img = fs.readFileSync("svg-info-graphic.png", "base64");
        return base64Img;
      },
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
