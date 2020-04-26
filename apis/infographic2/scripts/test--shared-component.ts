import fs from "fs";
import { Trip } from "./models/trip";
import { componentDraw } from "./draw--shared-component";
import {
  locationDetails,
  sharedLocationImage01,
} from "../configs/02-new-design/shared-components";
import { InfographicConfig } from "../configs";

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
  const componentConfig = sharedLocationImage01;
  const componentSetting = {
    scale: 1,
  };
  const infoConfig: InfographicConfig.TripInfographic = {
    width: 1280,
    height: 800,
    backgroundColor: "#C0E2E5",

    type: "container",
    flex: "column",
    blocks: [
      {
        type: "location",
        blocks: [
          componentConfig,
          {
            ...locationDetails,
            positioning: {
              top: 100,
              left: 625,
            },
          },
        ],
        ...componentSetting,
      },
    ],
  };
  const canvasAdaptor = await componentDraw(data, infoConfig);
  canvasAdaptor.draw();
  // let buf = await canvasAdaptor.toBufferPng();
  // fs.writeFileSync("output.png", buf);
  const buf = await canvasAdaptor.toBufferJpeg();
  fs.writeFileSync("output-component.jpeg", buf);
  console.log(`TIMER ${new Date().getTime() - startTimer} ms: completed`);
})();
