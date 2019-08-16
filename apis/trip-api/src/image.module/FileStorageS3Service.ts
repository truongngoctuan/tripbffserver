import { IFileStorageService2, IFileInfo } from "./IFileStorageService2";
import path from "path";
import { File, IFileModel } from "./File";
const uuid = require("uuid/v1");
import { mimeMapping, fileExtensionMapping } from "./mimeMapping";
import aws from "aws-sdk";

const AWS_ACCESS_KEY_ID = "AKIA4TON7PMDXZCP4Z64";
const AWS_SECRET_ACCESS_KEY = "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";
const S3_BUCKET = "tripbff-inte-trips";
const S3_REGION = "ap-southeast-1"; // singapore

export class FileStorageS3Service implements IFileStorageService2 {
  async signUpload(
    category: string,
    mimeType: string
  ): Promise<{ signedRequest: string; externalId: string; fullPath: string }> {
    const fileExtension = fileExtensionMapping(mimeType);
    const externalId = uuid();

    const fullPath = category
      ? `${category}/${externalId}.${fileExtension}`
      : `${externalId}.${fileExtension}`;
    const signedS3Url: any = await signPutUrl(fullPath, mimeType);
    return {
      signedRequest: signedS3Url.signedRequest,
      externalId,
      fullPath
    };
  }

  async signGet(fullPath: string): Promise<string> {
    const signedS3Url: any = await signGetUrl(fullPath);
    return signedS3Url.signedRequest as string;
  }

  async signGetIcon(fullPath: string): Promise<string> {
    const signedS3Url: any = await signGetIconUrl(fullPath);
    return signedS3Url.signedRequest as string;
  }

  async save(fullPath: string) {
    const fileName = path.parse(fullPath).name;

    var fileObject = new File({
      externalId: fileName,
      category: "",
      fileName: fullPath
    });

    fileObject.save();

    return {
      externalId: fileObject.externalId.toString(),
      slug: fullPath
    };
  }

  getFileInfo(fileObject: IFileModel): IFileInfo {
    const fileExtension = path.parse(fileObject.fileName).ext;
    return {
      externalId: fileObject.externalId,
      fileName: fileObject.fileName,
      category: "",
      mimeType: mimeMapping(fileExtension),
      path: fileObject.fileName
    };
  }

  async getInfoById(externalId: string) {
    var fileObject = (await File.findOne({ externalId }).exec()) as IFileModel;

    if (fileObject == null) throw "file not found";
    const fileInfo: IFileInfo = this.getFileInfo(fileObject);
    return { fileInfo };
  }
}

async function signPutUrl(fullPath: string, mimeType: string) {
  const s3 = new aws.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: S3_REGION
  });
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fullPath,
    Expires: 60,
    ContentType: mimeType
    // ACL: 'public-read' //todo
  };

  const pros = new Promise((resolve, reject) => {
    s3.getSignedUrl("putObject", s3Params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
        // return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fullPath}`
      };
      console.log("signed request");
      // console.log(returnData);
      resolve(returnData);
      return returnData;
      // res.write(JSON.stringify(returnData));
      // res.end();
    });
  });

  return pros;
}

async function signGetUrl(fullPath: string, expires: number = 60) {
  const s3 = new aws.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: S3_REGION
  });
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fullPath,
    Expires: expires
    // ContentType: fileType,
    // ACL: 'public-read' //todo
  };

  const pros = new Promise((resolve, reject) => {
    s3.getSignedUrl("getObject", s3Params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
        // return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fullPath}`
      };
      console.log("signed request");
      // console.log(returnData);
      resolve(returnData);
      return returnData;
      // res.write(JSON.stringify(returnData));
      // res.end();
    });
  });

  return pros;
}

async function signGetIconUrl(fullPath: string, expires: number = 60) {
  const s3 = new aws.S3({
    accessKeyId: "AKIA4TON7PMDUAFDZC5Y",
    secretAccessKey: "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",
    region: "ap-southeast-1"
  });
  const s3Params = {
    Bucket: "tripbff-icons",
    Key: fullPath,
    Expires: expires
  };

  const pros = new Promise((resolve, reject) => {
    s3.getSignedUrl("getObject", s3Params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
        // return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://tripbff-icons.s3.amazonaws.com/${fullPath}`
      };
      console.log("signed request");
      // console.log(returnData);
      resolve(returnData);
      return returnData;
      // res.write(JSON.stringify(returnData));
      // res.end();
    });
  });

  return pros;
}
