module.exports = {
  receiveMessage
};

const redisStore = {
  host: "192.168.1.4",
  // port: 6379,
  // host: "127.0.1.1",
  port: 6379,
  secret: "asd"
};

const qName = "myqueue";

const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ({
  host: redisStore.host,
  port: redisStore.post,
  ns: "rsmq"
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
      await callBack(resp);
      deleteMessage(resp.id);
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
  if (err && err.queueNotFound) console.log("ERR", "queueNotFound");
  else if (err) console.log("ERR", "error on queue");
}
