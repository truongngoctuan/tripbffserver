const exporter = require("./chrome-generator");
const consumer = require("./_services/consumer-worker");
const fileUploader = require("./_services/upload-file");
const axios = require("axios");

//todo put it into env file
const BASE_URL = "http://192.168.42.236:8000";
const fileLocation = "svg-info-graphic.png";

async function actionExecAsync(data) {
  //console.log("actionExecAsync", JSON.stringify(data));
  const {
    tripId,
    infographicId,
    ownerId,
    name,
    toDate,
    fromDate,
    locations
  } = JSON.parse(data.message);

  var trip = {
    name,
    fromDate,
    toDate,
    locations
  }
  //console.log('data message: ' + JSON.stringify(trip));
  await exporter.exportInfo(trip);

  try {

    //pre upload
    const mimeType = "image/png";
    const preUploadUrl = `${BASE_URL}/trips/${tripId}/infographics/${infographicId}/preUploadImage?mimeType=${mimeType}`
    const {
      signedRequest,
      fullPath
    } = await axios.get(preUploadUrl)
      .then(res => res.data);

    console.log("fullPath", fullPath);
    //upload to s3
    await fileUploader.uploadFile(signedRequest, fileLocation, mimeType);

    //confirm with trip-api
    const url = `${BASE_URL}/trips/${tripId}/infographics/${infographicId}`
    await axios.put(url, {
      ownerId,
      fullPath
    })

  } catch (err) {
    console.log("ERR", err.response);
    throw err;
  }
}

// this is event data schemas
// var event: TripEvent = {
//   type: "InfographicCreated",
//   tripId,
//   infographicId,
// };

consumer.receiveMessage(actionExecAsync);
return;