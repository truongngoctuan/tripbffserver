module.exports = {
  receiveMessage
};

const redisStore = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

console.log("redisStore", redisStore);

const qName = "myqueue";

const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ({
  host: redisStore.host,
  port: redisStore.post,
  ns: "rsmq"
});


rsmq.createQueue({ qname: qName }, (err, resp) => {
  if (err) {
    console.log("Create error", err);
    // console.log("Create error", err);
    // todo better handling the service
  }

  console.log("queue created");
});

var counter = 0;
var _callBack;
function receiveMessage(callBack) {
  _callBack = callBack;
  rsmq.receiveMessage({ qname: qName }, async function(err, resp) {
    if (err) {
      errorHandler(err);
      SetTimeoutReceiveMessage();
      return;
    }
    if (resp.id) {
      //console.log("Message received.", resp);
      counter++;
      console.log("COUNTER", counter);
      deleteMessage(resp.id);
      await callBack(resp);
    } else {
      // console.log("no message received");
      SetTimeoutReceiveMessage();
    }
  });
}

function deleteMessage(messageId) {
  rsmq.deleteMessage({ qname: qName, id: messageId }, function(err, resp) {
    if (resp === 1) {
      console.log("Message deleted.");
      SetTimeoutReceiveMessage();
    } else {
      console.log("Message not found.");
    }
  });
}

function SetTimeoutReceiveMessage() {
  setTimeout(() => {
    receiveMessage(_callBack);
  }, 50);
}

function errorHandler(err) {
  if (err && err.toString().startsWith("queueNotFound")) console.log("ERR", "queueNotFound");
  else if (err) {
    console.log("ERR", "error on queue");
    console.log(err);
  }
}
