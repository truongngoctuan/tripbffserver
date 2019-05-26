const aws = require("aws-sdk");
const fs = require("fs");
const axios = require("axios");

//todo need to setup AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
// using dev-access account with S3FullAccess only
const AWS_ACCESS_KEY_ID = "AKIA43HXFY3XFFFG5GRX"
const AWS_SECRET_ACCESS_KEY = "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"
const S3_BUCKET = "tripbff-dev-trips"
const S3_REGION = "ap-southeast-1" //singapore

function listBucket() {
  const s3 = new aws.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: S3_REGION,
  });

  // Call S3 to list the buckets
  s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });

}
async function signUrl(fileName, fileType) {
  const s3 = new aws.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: S3_REGION,
  });
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    // ACL: 'public-read' //todo
  };

  const pros = new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
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

function uploadFile12(signedUrl, path, fileType) {

  var fs = require('fs');
  // var fileStream = fs.createReadStream(path);
  // fileStream.on('error', function (err) {
  //   console.log('File Error', err);
  // });
  // console.log(fileStream)
  // console.log(fileStream.readableLength);
  const file = fs.readFileSync("./redcat.png");


  var options = {
    headers: {
      'Content-Type': fileType
    }
  };

  return axios.put(signedUrl, file, options)
  .then(res => {
    console.log("Success axios");
  })
  .catch(err => {
    console.log("Err axios", err.response.data);
  });
}

// listBucket()

// signUrl("redcat.png", "image/jpeg")
//   .then(signedS3Url => {
//     console.log(signedS3Url);
//     const file = fs.readFileSync("./redcat.png");
//     // uploadFile(file, signedS3Url.signedRequest, signedS3Url.url)
//     uploadFile12(signedS3Url.signedRequest, "redcat.png", "image/jpeg");

//   })


signGetUrl("redcat.png", "image/jpeg")
.then(signedS3Url => {
  console.log(signedS3Url.signedRequest);
})