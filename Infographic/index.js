const exporter = require("./chrome-generator");
const consumer = require("./_services/consumer-worker");
const fileUploader = require("./_services/upload-file");

async function actionExecAsync(data) {
  //console.log("actionExecAsync", JSON.stringify(data));
  const { tripId, infographicId, ownerId, toDate, fromDate, locations } = JSON.parse(data.message);

  var trip = {
    fromDate,
    toDate,
    locations
  }
  //console.log('data message: ' + JSON.stringify(trip));
  await exporter.exportInfo(trip);
  //todo put it into env file
  const fileLocation = "svg-info-graphic.png";
  const url = `http://192.168.42.236:8000/trips/${tripId}/infographics/${infographicId}`
  await fileUploader.uploadFile(fileLocation, url, ownerId);

}

// this is event data schemas
// var event: TripEvent = {
//   type: "InfographicCreated",
//   tripId,
//   infographicId,
// };

consumer.receiveMessage(actionExecAsync);
return;
