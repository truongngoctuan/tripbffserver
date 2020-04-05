import { INFOGRAPHIC_TYPE } from "./info_graphic_type";
import { genericDraw } from "./info_graphic_general_draw";
import fs from "fs";
import { Trip } from "./models/trip";

const location01 = {
  locationId: "a10ca9f3-7b62-4899-abae-b13fd9839a5c",
  name: "Phan Xi Păng",
  fromTime: "September 9, 2019",
  toTime: "2019-09-09T08:25:00.000Z",
  feeling: "Tuyệt vời",
  activity: "Đi bộ đường dài ngắn ngày",
  highlights: "Đẹp, Nguy hiểm",
  signedUrl: "http://placekitten.com/700/500",
};
const location02 = {
  locationId: "2b877a4c-5bf9-4315-a8b4-02f44971879d",
  name: "Mù Cang Chải",
  fromTime: "September 10, 2019",
  toTime: "2019-09-10T03:16:00.000Z",
  feeling: "Yên bình",
  activity: "Ngắm ruộng lúa",
  highlights: "Đẹp, Rẻ",
  signedUrl: "http://placekitten.com/1200/1200",
};
const location03 = {
  locationId: "1f611a70-abde-4e5d-95d3-ae5e7959a9cb",
  name: "Tú Lệ",
  fromTime: "September 10, 2019",
  toTime: "2019-09-10T03:16:00.000Z",
  feeling: "Chill",
  activity: "Ngắm mặt trời lặn",
  highlights: "Đẹp, Đồ ăn ngon",
  signedUrl: "http://placekitten.com/800/600",
};
const location04 = {
  locationId: "731b2d4e-dddb-4a06-b59a-72d43e969df7",
  name: "Y Tý",
  fromTime: "September 11, 2019",
  toTime: "2019-09-11T03:17:00.000Z",
  feeling: "Ngớ ngẩn",
  activity: "Săn mây",
  highlights: "Đẹp, Nguy hiểm",
  signedUrl: "http://placekitten.com/900/1200",
};

const trip1Location: Trip = {
  name: " Chuyến đi đầu tiên trên TripBFF",
  fromDate: 1567962000000,
  toDate: 1568221199999,
  locations: [location01],
  locale: "vi",
  numberOfDays: 1,
};

const trip2Locations: Trip = {
  name: " Chuyến đi đầu tiên trên TripBFF",
  fromDate: 1567962000000,
  toDate: 1568221199999,
  locations: [location01, location02],
  locale: "vi",
  numberOfDays: 1,
};
const trip3Locations: Trip = {
  name: " Chuyến đi đầu tiên trên TripBFF",
  fromDate: 1567962000000,
  toDate: 1568221199999,
  locations: [location01, location02, location03],
  locale: "vi",
  numberOfDays: 1,
};
const trip4Locations: Trip = {
  name: " Chuyến đi đầu tiên trên TripBFF",
  fromDate: 1567962000000,
  toDate: 1568221199999,
  locations: [location01, location02, location03, location04],
  locale: "vi",
  numberOfDays: 1,
};

const outputDir = "e2e-infographic-result/";

type schemaData = {
  name: string;
  type: INFOGRAPHIC_TYPE;
  data: Trip;
};
const trips: schemaData[] = [
  {
    name: "01-old-design--trip-1-location",
    type: INFOGRAPHIC_TYPE.FIRST_RELEASED,
    data: trip1Location,
  },
  {
    name: "01-old-design--trip-2-locations",
    type: INFOGRAPHIC_TYPE.FIRST_RELEASED,
    data: trip2Locations,
  },
  {
    name: "01-old-design--trip-3-locations",
    type: INFOGRAPHIC_TYPE.FIRST_RELEASED,
    data: trip3Locations,
  },
  {
    name: "01-old-design--trip-4-locations",
    type: INFOGRAPHIC_TYPE.FIRST_RELEASED,
    data: trip4Locations,
  },
  {
    name: "02-new-design--trip-1-location",
    type: INFOGRAPHIC_TYPE.NEW_DESIGN,
    data: trip1Location,
  },
  {
    name: "02-new-design--trip-2-locations",
    type: INFOGRAPHIC_TYPE.NEW_DESIGN,
    data: trip2Locations,
  },
  {
    name: "02-new-design--trip-3-locations",
    type: INFOGRAPHIC_TYPE.NEW_DESIGN,
    data: trip3Locations,
  },
  {
    name: "02-new-design--trip-4-locations",
    type: INFOGRAPHIC_TYPE.NEW_DESIGN,
    data: trip4Locations,
  },
];

(async () => {
  for (let index = 0; index < trips.length; index++) {
    const { name, data, type } = trips[index];
    const startTimer = new Date().getTime();

    const canvasAdaptor = await genericDraw(data, type);
    canvasAdaptor.draw();
    const buf = await canvasAdaptor.toBufferJpeg();
    fs.writeFileSync(outputDir + name + ".jpeg", buf);
    console.log(`TIMER ${new Date().getTime() - startTimer} ms: completed`);
  }
})();
