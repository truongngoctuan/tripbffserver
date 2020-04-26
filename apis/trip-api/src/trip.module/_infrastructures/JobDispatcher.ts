import { IJobDispatcher } from "../_core/models/IJobDispatcher";

export class JobDispatcher implements IJobDispatcher {
  dispatch(data: any) {
    const redisStore = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      secret: process.env.REDIS_SECRET,
    };

    const qName = "myqueue";

    const redisSMQ = require("rsmq");
    const rsmq = new redisSMQ({
      host: redisStore.host,
      port: redisStore.port,
      ns: "rsmq",
    });

    rsmq.createQueue({ qname: qName }, (err: any, resp: any) => {
      if (err) {
        if (err.name === "queueExists") {
          console.log("queue existed");
        } else {
          console.log("Create error", err);
        }
      }

      // if (resp === 1) {
      // send anyway, regardless of the queue is created or not
      rsmq.sendMessage(
        { qname: qName, message: JSON.stringify(data) },
        (err: any, resp: any) => {
          if (err) {
            console.log("PUB error", err);
          }
          if (resp) {
            console.log("Message sent. ID:", resp);
            console.log("Message data", data);
          }
        }
      );
      // }
    });
  }
}
