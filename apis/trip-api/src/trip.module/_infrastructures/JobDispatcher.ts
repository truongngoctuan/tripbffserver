import { IJobDispatcher } from "../_core/models/IJobDispatcher";

export class JobDispatcher implements IJobDispatcher {
  dispatch(data: any) {
    //todo read data from store
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
      port: redisStore.port,
      ns: "rsmq"
    });

    rsmq.createQueue({ qname: qName }, function(err: any, resp: any) {
      if (err) {
        console.log("Create error");
        // console.log("Create error", err);
        //todo better handling the service
      }

      // if (resp === 1) {
      //send anyway, regardless of the queue is created or not
      console.log("queue created");
      rsmq.sendMessage({ qname: qName, message: JSON.stringify(data) }, function(
        err: any,
        resp: any
      ) {
        if (err) {
          console.log("PUB error", err);
        }
        if (resp) {
          console.log("Message sent. ID:", resp);
          console.log("Message data", data);
        }
      });
      // }
    });
  }
}