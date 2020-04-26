import path from "path";
import aws from "aws-sdk";
import { mimeMapping } from "../mimeMapping";

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const S3_BUCKET: string = process.env.S3_BUCKET as string;
const S3_REGION = process.env.S3_REGION;

const s3 = new aws.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: S3_REGION,
});

export async function fileExists(filePath: string) {
  const params: aws.S3.HeadObjectRequest = {
    Bucket: S3_BUCKET,
    Key: filePath,
  };
  try {
    const start = new Date().getTime();
    await s3.headObject(params).promise();
    const end = new Date().getTime();
    const responseTime = end - start;

    console.log("File Found in S3", `${filePath} ${responseTime}`);
    return true;
  } catch (err) {
    // console.log("File not Found ERROR : " + err.code)
    return false;
  }
}

export function read(file1: string): Promise<Buffer> {
  return new Promise(function (resolve, reject) {
    const getParams = {
      Bucket: S3_BUCKET,
      Key: file1,
    };

    s3.getObject(getParams, function (err, data) {
      // Handle any error and exit
      if (err) return reject(err);

      // No error happened
      // Convert Body from a Buffer to a String

      const buffer = Buffer.from(data.Body as any);
      resolve(buffer);
    });
  });
}

export function writeBuffer(fileName: string, buffer: string | Buffer) {
  return new Promise(function (resolve, reject) {
    const ext = path.parse(fileName).ext;
    s3.putObject(
      {
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: buffer,
        ContentType: mimeMapping(ext),
      },
      function (resp: any) {
        // console.log(arguments);
        console.log("Successfully uploaded package.");
        resolve(true);
      }
    );
  });
}
