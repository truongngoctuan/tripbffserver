import { Server, ResponseToolkit } from "hapi";
import { IoC } from "./IoC";
const Joi = require("joi");
import path from "path";

const tripQueryHandler = IoC.tripQueryHandler;

module.exports = {
  init: function (server: Server) {
    
    server.route({
      method: "GET",
      path: "/images/preUploadImage",
      handler: async function(request) {
        console.log("GET /images/preUploadImage");

        try {
          const { category, mimeType } = request.query as any;
          console.log(mimeType);

          const result = await IoC.fileService.signUpload(category ? category : "images", mimeType);

          return result;

        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        // auth: "simple",
        tags: ["api"]
      }
    });

    server.route({
      method: "POST",
      path: "/images",
      handler: async function (request) {
        console.log("POST /images");
        try {
          const { fullPath } = request.payload as any;
          const result = await IoC.fileService.save(fullPath);
          const { externalId } = result;

          var thumbnailExternalUrl = await tripQueryHandler.getThumbnailUrlByExternalId(externalId);
          var externalUrl = await tripQueryHandler.getExternalUrlByExternalId(externalId);
          return { externalId, thumbnailExternalUrl, externalUrl };
          
        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        // auth: "simple",
        tags: ["api"],
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

        var imageId = request.params.id;

        var { fileInfo } = await IoC.fileService.getInfoById(imageId);

        const signedUrl = await IoC.fileService.signGet(fileInfo.fileName);
        return h.redirect(signedUrl);

        //todo need to to stuff here
        //todo: download from s3, build thumbnail, upload it back
        // try {
        //   var imageId = request.params.id;
        //   //either size(s) or width + height (w, h)
        //   const { s, wi, he } = request.query as any;

        //   if (s) {
        //     return returnFileFromWH(imageId, s, s, h);
        //   }

        //   if (wi && he) {
        //     return returnFileFromWH(imageId, wi, he, h);
        //   }

        //   return returnFileFromWH(imageId, 400, 400, h);

        // } catch (error) {
        //   console.log(error);
        //   return error;
        // }
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

          //sign url then redirect
          const signedUrl = await IoC.fileService.signGet(fileInfo.fileName);
          return h.redirect(signedUrl);

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
      }
    });


  }
};
