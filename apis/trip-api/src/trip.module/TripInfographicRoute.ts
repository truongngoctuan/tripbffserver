import { Server } from "hapi";
const uuid = require("uuid/v1");
import { IoC } from "./IoC";
import { CUtils } from "./ControllerUtils";
var fs = require("fs");
const Joi = require("joi");

const tripCommandHandler = IoC.tripCommandHandler;
const tripEventQueryHandler = IoC.tripEventQueryHandler;
const fileService = IoC.fileService;

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
          
          var data: any = request.payload;
          const ownerId = data.ownerId;
          var file: Buffer = new Buffer(JSON.parse(data.file).data);
          //console.log("file", file);

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
        //auth: "simple",
        tags: ["api"]
      }
    });

    server.route({
      method: "GET",
      path: "/trips/{tripId}/infographics/{infographicId}",
      handler: async function(request, h) {
        var tripId = request.params.tripId;
        var inforgraphicId = request.params.infographicId;

        return new Promise((resolve, reject) => { 
          var getEventInterval = setInterval(async () => {
            var tripEvents = await tripEventQueryHandler.getAll(tripId);

            if (tripEvents) {
              tripEvents.forEach(event => {
                if (event.type == 'InfographicExported' && event.infographicId == inforgraphicId) {
                  clearInterval(getEventInterval);

                  var externalId = event.externalStorageId;
                  console.log('externalId: ' + externalId);

                  var filePath = `uploads/trips/${tripId}/infographics/${externalId}.png`;

                  var getFileInterval = setInterval(() => {
                    if (fs.existsSync(filePath)) {
                      clearInterval(getFileInterval);
                      var imgStream = fs.createReadStream(filePath);
                      imgStream.setEncoding("base64");

                      var bufs = '';
    
                      imgStream.on('data', (chunk: any) => {
                        bufs += chunk;
                      });
                      imgStream.on('end', () => {
                        const response = h.response(bufs);
                        resolve(response);
                      });
                    }
                  }, 1000);
                }
              });
            }

            clearInterval(getEventInterval);
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
