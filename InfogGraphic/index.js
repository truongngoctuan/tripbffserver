const exporter = require("./chrome-generator");
const consumer = require("./_services/consumer-worker");

async function actionExecAsync() {
  await exporter.exportInfo();
}

// this is event data schemas
// var event: TripEvent = {
//   type: "InfographicCreated",
//   tripId,
//   infographicId,
// };

consumer.receiveMessage(actionExecAsync);
return;
