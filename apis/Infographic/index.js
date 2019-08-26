require("dotenv").config(); // red config from .env file

const exporter = require("./chrome-generator");
const consumer = require("./_services/consumer-worker");
const fileUploader = require("./_services/upload-file");
const axios = require("axios");

//todo put it into env file
const BASE_URL = `http://${process.env.TRIP_API_HOST}:${process.env.TRIP_API_PORT}`;
console.log("BASE_URL", BASE_URL)


async function actionExecAsync(data) {
  // console.log("actionExecAsync", data);
  const {
    tripId,
    infographicId,
    ownerId,
    name,
    toDate,
    fromDate,
    locations,
    locale
  } = JSON.parse(data.message);

  var trip = {
    name,
    fromDate,
    toDate,
    locations,
    locale
  }
  const result = await exporter.exportInfo(trip)
  .then(buf => {
    return Promise.all([
      uploadResult(ownerId, tripId, infographicId, buf),
      exporter.initPage(),
    ]);

  });
  
}

async function uploadResult(ownerId, tripId, infographicId, buf) {

  try {

    //pre upload
    const startPreUpload = (new Date()).getTime();
    const mimeType = "image/jpeg";
    const preUploadUrl = `${BASE_URL}/trips/${tripId}/infographics/${infographicId}/preUploadImage?mimeType=${mimeType}`
    const {
      signedRequest,
      fullPath
    } = await axios.get(preUploadUrl)
      .then(res => res.data);
    console.log(`pre uploaded file in ${(new Date()).getTime() - startPreUpload} ms`)

    console.log("fullPath", fullPath);
    //upload to s3
    const start = (new Date()).getTime();
    await fileUploader.uploadFileFromBuffer(signedRequest, buf, mimeType);
    console.log(`uploaded file in ${(new Date()).getTime() - start} ms`)

    //confirm with trip-api
    const url = `${BASE_URL}/trips/${tripId}/infographics/${infographicId}`
    await axios.put(url, {
      ownerId,
      fullPath
    })

  } catch (err) {
    console.log("ERR on upload file", err);
    throw err;
  }
}

(async() => {
  await exporter.initPage();
  consumer.receiveMessage(actionExecAsync);
})();

return;