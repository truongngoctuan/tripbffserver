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

          return returnFileFromWH(imageId, 400, 400, h);

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


    server.route({
      method: "GET",
      path: "/asd",
      handler: async function (request, h) {
        console.log("/asd");
        const s3Return = await signGetUrl("redcat.png", "image/jpeg");
        console.log(s3Return.signedRequest)
        return h.redirect(s3Return.signedRequest);
      }
    });

    server.route({
      method: "GET",
      path: "/dfg",
      handler: async function (request, h) {
        console.log("/dfg");
        return { status: "ok" };
        
      }
    });

  }
};

const aws = require("aws-sdk");

//todo need to setup AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
// using dev-access account with S3FullAccess only
const AWS_ACCESS_KEY_ID = "AKIA43HXFY3XFFFG5GRX"
const AWS_SECRET_ACCESS_KEY = "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"
const S3_BUCKET = "tripbff-dev-trips"
const S3_REGION = "ap-southeast-1" //singapore

async function signGetUrl(fileName, fileType) {
  const s3 = new aws.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: S3_REGION,
  });
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    // ContentType: fileType,
    // ACL: 'public-read' //todo
  };

  const pros = new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', s3Params, (err, data) => {
      if (err) {

        console.log(err);
        reject(err);
        return;
        // return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      console.log("signed request");
      // console.log(returnData);
      resolve(returnData);
      return returnData;
      // res.write(JSON.stringify(returnData));
      // res.end();
    });
  })

  return pros;
}