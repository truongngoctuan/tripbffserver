const exporter = require("./chrome-generator");
const consumer = require("./_services/consumer-worker");
const fileUploader = require("./_services/upload-file");

async function actionExecAsync(data) {
  console.log("actionExecAsync", data);
  const {tripId, infographicId } = JSON.parse(data.message);
  console.log(tripId)
  console.log(infographicId)

  await exporter.exportInfo();
  //todo put it into env file
  const fileLocation = "svg-info-graphic.png";
  const url = `http://192.168.1.3:8000/trips/${tripId}/infographics/${infographicId}`
  await fileUploader.uploadFile(fileLocation, url);

}

// this is event data schemas
// var event: TripEvent = {
//   type: "InfographicCreated",
//   tripId,
//   infographicId,
// };

consumer.receiveMessage(actionExecAsync);
return;
