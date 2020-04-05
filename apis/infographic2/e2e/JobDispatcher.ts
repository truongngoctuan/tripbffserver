export class JobDispatcher {
  async dispatch(data): Promise<void> {
    return new Promise((resolve, reject) => {
      const redisStore = {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        secret: process.env.REDIS_SECRET,
      };
      console.log(redisStore);

      const qName = "myqueue";

      const redisSMQ = require("rsmq");
      const rsmq = new redisSMQ({
        host: redisStore.host,
        port: redisStore.port,
        ns: "rsmq",
      });

      rsmq.createQueue({ qname: qName }, (err, resp) => {
        if (err) {
          if (err.name === "queueExists") {
            console.log("queue existed");
          } else {
            console.log("Create error", err);
            reject();
          }
        }

        rsmq.sendMessage(
          { qname: qName, message: JSON.stringify(data) },
          (err, resp) => {
            if (err) {
              console.log("PUB error", err);
              reject();
            }
            if (resp) {
              console.log("Message sent. ID:", resp);
              // console.log("Message data", data);
              resolve();
            }
          }
        );
      });
    });
  }
}
