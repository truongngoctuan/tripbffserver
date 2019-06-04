import fse from "fs-extra";
import path from "path";
import aws from "aws-sdk";
import { mimeMapping } from "../mimeMapping";

//todo need to setup AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
// using dev-access account with S3FullAccess only
const AWS_ACCESS_KEY_ID = "AKIA43HXFY3XFFFG5GRX"
const AWS_SECRET_ACCESS_KEY = "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"
const S3_BUCKET = "tripbff-dev-trips"
const S3_REGION = "ap-southeast-1" //singapore

const s3 = new aws.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: S3_REGION,
});

export async function fileExists(filePath: string) {
  const params = {
    Bucket: S3_BUCKET,
    Key: filePath
  }
  try {
    await s3.headObject(params).promise()
    console.log("File Found in S3")
    return true;
  } catch (err) {
    // console.log("File not Found ERROR : " + err.code)
    return false;
  }
}

export function read(file1: string): Promise<Buffer> {
  return new Promise(function (resolve, reject) {

    var getParams = {
      Bucket: S3_BUCKET,
      Key: file1
    }

    s3.getObject(getParams, function (err, data) {
      // Handle any error and exit
      if (err)
        return reject(err);

      // No error happened
      // Convert Body from a Buffer to a String

      let buffer = Buffer.from(data.Body as any);
      resolve(buffer);
    });

  });
}

export function writeBuffer(fileName: string, buffer: string | Buffer) {

  return new Promise(function (resolve, reject) {

    const ext = path.parse(fileName).ext;
    s3.putObject({
      Bucket: S3_BUCKET,
      Key: fileName,
      Body: buffer,
      ContentType: mimeMapping(ext),
    }, function (resp) {
      console.log(arguments);
      console.log('Successfully uploaded package.');
      resolve(true);
    });

  });
}
