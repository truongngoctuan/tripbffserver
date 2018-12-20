const exporter = require("./chrome-generator");
const consumer = require("./_services/consumer-worker");

async function actionExecAsync() {
  await exporter.exportInfo();
}

consumer.receiveMessage(actionExecAsync);
return;
