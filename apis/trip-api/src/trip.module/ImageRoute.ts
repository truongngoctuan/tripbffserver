import { Server, ResponseToolkit } from "@hapi/hapi";
import { IoC } from "./IoC";
import Joi from "@hapi/joi";
import { IdSchema } from "./JoiSchemas";

const tripQueryHandler = IoC.tripQueryHandler;

module.exports = {
  init(server: Server): void {
    server.route({
      method: "GET",
      path: "/images/preUploadImage",
      async handler(request) {
        try {
          const { category, mimeType } = request.query as any;
          console.log(mimeType);

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
        // auth: "simple",
        tags: ["api"],
      },
    });

    server.route({
      method: "POST",
      path: "/images",
      async handler(request) {
        try {
          const { fullPath } = request.payload as any;
          const result = await IoC.fileService.save(fullPath);
          const { externalId } = result;

          const thumbnailExternalUrl = await tripQueryHandler.getThumbnailUrlByExternalId(
            externalId
          );
          const externalUrl = await tripQueryHandler.getExternalUrlByExternalId(
            externalId
          );
          return { externalId, thumbnailExternalUrl, externalUrl };
        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        // auth: "simple",
        tags: ["api"],
      },
    });

    // todo: need to rewrite how to handle thumbnail files better
    // + do not check file existing every single time
    // + handle get (sign) separated from building thumbnail
    // -> that will make sure we have a clean adn easy way of handling thumbnail process
    // POST "/images/{id}/thumbnails" --> build thumbnail,
    // GET  "/images/{id}/thumbnails" --> check existing or not then return signed url,
    // + there are multiple version of thumbnail
    // and image details should view the biggest thumbnail image

    // todo: process of handling infographic
    // old: user --> api POST infographic --> sign raw image --> trigger event --> pickup event ....
    // new: user --> api POST infographic
    //     --> calc width&height, trigger build images 's thumbnail
    //     --> trigger event
    //     --> pickup event --> query thumbnail images, wait until data available

    async function returnFileFromWH(
      imageId: string,
      wi: number,
      he: number,
      h: ResponseToolkit
    ): Promise<string> {
      const { fileInfo } = await IoC.fileService.getInfoById(imageId);

      await IoC.imageService.saveThumbnail(fileInfo.path, wi, he);

      const imageThumbnail = IoC.imageService.generateThumbnailUri(
        fileInfo.fileName,
        wi,
        he
      );

      const start = new Date().getTime();
      const signedUrl = await IoC.fileService.signGet(imageThumbnail);
      const end = new Date().getTime();
      const responseTime = end - start;
      console.log(`signed thumbnail ${responseTime}`, signedUrl);
      return signedUrl;
    }

    server.route({
      method: "GET",
      path: "/images/{id}/thumbnail",
      async handler(request, h) {
        try {
          const imageId = request.params.id;
          // either size(s) or width + height (w, h)
          const { s, wi, he } = request.query as any;

          let signedUrl = "";
          if (s) {
            signedUrl = await returnFileFromWH(imageId, s, s, h);
          }

          if (wi && he) {
            signedUrl = await returnFileFromWH(imageId, wi, he, h);
          }

          signedUrl = await returnFileFromWH(imageId, 400, 400, h);

          return h.redirect(signedUrl);
        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        // todo: need another way to handle authentication
        // auth: "simple",
        tags: ["api"],
        validate: {
          params: IdSchema,
          query: Joi.object({
            s: Joi.number().description("size"),
          }),
        },
        response: {},
      },
    });

    async function returnSignOnlyFromWH(
      imageId: string,
      wi: number,
      he: number,
      h: ResponseToolkit
    ): Promise<string> {
      const { fileInfo } = await IoC.fileService.getInfoById(imageId);
      const imageThumbnail = IoC.imageService.generateThumbnailUri(
        fileInfo.fileName,
        wi,
        he
      );
      const start = new Date().getTime();
      const signedUrl = await IoC.fileService.signGet(imageThumbnail);
      const end = new Date().getTime();
      const responseTime = end - start;
      console.log(`signed thumbnail ${responseTime}`, signedUrl);
      return signedUrl;
    }

    server.route({
      method: "GET",
      path: "/images/{id}/thumbnail/sign-only",
      async handler(request, h) {
        try {
          const imageId = request.params.id;
          // either size(s) or width + height (w, h)
          const { s, wi, he } = request.query as any;

          let signedUrl = "";
          if (s) {
            signedUrl = await returnSignOnlyFromWH(imageId, s, s, h);
          }

          if (wi && he) {
            signedUrl = await returnSignOnlyFromWH(imageId, wi, he, h);
          }

          signedUrl = await returnSignOnlyFromWH(imageId, 400, 400, h);

          return h.redirect(signedUrl);
        } catch (error) {
          console.log(error);
          return error;
        }
      },
      options: {
        // todo: need another way to handle authentication
        // auth: "simple",
        tags: ["api"],
        validate: {
          params: IdSchema,
          query: Joi.object({
            s: Joi.number().description("size"),
          }),
        },
        response: {},
      },
    });

    server.route({
      method: "GET",
      path: "/images/{id}",
      async handler(request, h) {
        try {
          const imageId = request.params.id;
          const { fileInfo } = await IoC.fileService.getInfoById(imageId);

          // sign url then redirect
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
          params: IdSchema,
        },
      },
    });
  },
};
