const redisStore = {
  // host: "localhost",
  // port: 6379,
  host: "127.0.1.1",
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

rsmq.deleteQueue({ qname: qName }, function(err, resp) {
  if (err) {
    console.log("delete error", err);
    return;
  }
  if (resp === 1) {
    console.log("queue deleted");

    rsmq.createQueue({ qname: qName }, function(err, resp) {
      if (err) {
        console.log("Create error", err);
        return;
      }
      if (resp === 1) {
        console.log("queue created");
        sendMessages(1);
      }
    });
  }
});

function sendMessages(nTotal) {
  return _sendMessages(nTotal, nTotal);
}
function _sendMessages(nTotal, nLeftover) {
  if (nLeftover <= 0) process.exit();
  rsmq.sendMessage({ qname: qName, message: "Hello World" }, function(
    err,
    resp
  ) {
    if (err) {
      console.log("PUB error", err);
    }
    if (resp) {
      console.log("Message sent. ID:", resp);
      _sendMessages(nTotal, nLeftover - 1);
    }
  });
}

return;