import { Server } from "hapi";
import { IoC } from "./IoC";
const Joi = require("joi");

module.exports = {
  init: function (server: Server) {
    server.route({
      method: "POST",
      path: "/images",
      handler: async function (request) {
        console.log("POST /images");
        try {
          const data = request.payload as any;
          // console.log("request", request);
          const file: Buffer = data.file;
          const fileName: string = data.fileName;

          console.log("fileName");
          console.log(fileName);
          console.log("file");
          console.log(file);

          var category = "./uploads/images";
          const { externalId } = await IoC.fileService.save(
            file,
            category,
            fileName
          );

          return { status: "ok", data: externalId };
        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        // auth: "simple",
        tags: ["api"],
        payload: {
          // output: "stream",
          parse: true,
          maxBytes: 50 * 1024 * 1024,
          // allow: ['multipart/form-data', 'image/jpeg', 'application/json'],
        }
      }
    });

    server.route({
      method: "GET",
      path: "/images/{id}",
      handler: async function (request, h) {
        console.log("GET /images/{id}");
        try {
          var imageId = request.params.id;
          var { fileInfo } = await IoC.fileService.getInfoById(imageId);
          return h.file(fileInfo.path);

        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        // auth: "simple",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.required().description("the id for the todo item")
          }
        },
        response: {
        }
      }
    });
  }
};
