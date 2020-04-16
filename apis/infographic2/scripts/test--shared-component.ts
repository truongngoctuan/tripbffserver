import fs from "fs";
import { Trip } from "./models/trip";
import { componentDraw } from "./draw--shared-component";
import { sharedHeader } from "../configs/02-new-design/03-locations";

const data: Trip = {
  name: " Chuyến đi đầu tiên trên TripBFF",
  fromDate: 1567962000000,
  toDate: 1568221199999,
  locations: [
    {
      locationId: "a10ca9f3-7b62-4899-abae-b13fd9839a5c",
      name: "Phan Xi Păng",
      fromTime: "September 9, 2019",
      toTime: "2019-09-09T08:25:00.000Z",
      feeling: "Tuyệt vời",
      activity: "Đi bộ đường dài ngắn ngày",
      highlights: "Đẹp, Nguy hiểm",
      signedUrl: "http://placekitten.com/700/500",
    },
  ],
  locale: "vi",
  numberOfDays: 1,
};

const startTimer = new Date().getTime();

(async () => {
  const componentConfig = sharedHeader;
  const componentSetting = {
    scale: 0.75
  }
  const canvasAdaptor = await componentDraw(data, componentConfig, componentSetting);
  canvasAdaptor.draw();
  // let buf = await canvasAdaptor.toBufferPng();
  // fs.writeFileSync("output.png", buf);
  const buf = await canvasAdaptor.toBufferJpeg();
  fs.writeFileSync("output.jpeg", buf);
  console.log(`TIMER ${new Date().getTime() - startTimer} ms: completed`);
})();
