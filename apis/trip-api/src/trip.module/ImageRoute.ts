import { Server, ResponseToolkit } from "hapi";
import { IoC } from "./IoC";
const Joi = require("joi");
import path from "path";

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

    async function returnFileFromWH(imageId: string, wi: number, he: number, h: ResponseToolkit) {
      var { fileInfo } = await IoC.fileService.getInfoById(imageId);
      const fileExtension = path.parse(fileInfo.fileName).ext;
      const fileThumbnailPath = path.join(fileInfo.category, `${fileInfo.externalId}_${wi}_${he}${fileExtension}`)

      await IoC.imageService.saveThumbnail(fileInfo.path, wi, he);

      return (h as any).file(fileThumbnailPath);
    }
    server.route({
      method: "GET",
      path: "/images/{id}/thumbnail",
      handler: async function (request, h) {
        console.log("GET /images/{id}/thumbnail");
        try {
          var imageId = request.params.id;
          //either size(s) or width + height (w, h)
          const { s, wi, he } = request.query as any;

          if (s) {
            return returnFileFromWH(imageId, s, s, h);
          }

          if (wi && he) {
            return returnFileFromWH(imageId, wi, he, h);
          }

          return returnFileFromWH(imageId, 200, 200, h);

        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        //todo: need another way to handle authentication
        // auth: "simple",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.required().description("the external id")
          },
          query: {
            s: Joi.number().description("size"),
          }
        },
        response: {
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
          return (h as any).file(fileInfo.path);

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
