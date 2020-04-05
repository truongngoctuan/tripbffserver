require("dotenv").config(); // red config from .env file

import { JobDispatcher } from "./JobDispatcher";

const N = 10;

async function exec(): Promise<void> {
  const dispatcherInstance = new JobDispatcher();

  const data = {
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
      {
        locationId: "2b877a4c-5bf9-4315-a8b4-02f44971879d",
        name: "Mù Cang Chải",
        fromTime: "September 10, 2019",
        toTime: "2019-09-10T03:16:00.000Z",
        feeling: "Yên bình",
        activity: "Ngắm ruộng lúa",
        highlights: "Đẹp, Rẻ",
        signedUrl: "http://placekitten.com/1200/1200",
      },
      {
        locationId: "1f611a70-abde-4e5d-95d3-ae5e7959a9cb",
        name: "Tú Lệ",
        fromTime: "September 10, 2019",
        toTime: "2019-09-10T03:16:00.000Z",
        feeling: "Chill",
        activity: "Ngắm mặt trời lặn",
        highlights: "Đẹp, Đồ ăn ngon",
        signedUrl: "http://placekitten.com/800/600",
      },
      {
        locationId: "731b2d4e-dddb-4a06-b59a-72d43e969df7",
        name: "Y Tý",
        fromTime: "September 11, 2019",
        toTime: "2019-09-11T03:17:00.000Z",
        feeling: "Ngớ ngẩn",
        activity: "Săn mây",
        highlights: "Đẹp, Nguy hiểm",
        signedUrl: "http://placekitten.com/900/1200",
      },
      {
        locationId: "731b2d4e-dddb-4a06-b59a-72d43e969df7",
        name: "Y Tý",
        fromTime: "September 11, 2019",
        toTime: "2019-09-11T03:17:00.000Z",
        feeling: "Ngớ ngẩn",
        activity: "Săn mây",
        highlights: "Đẹp, Nguy hiểm",
        signedUrl: "http://placekitten.com/900/1200",
      },
      {
        locationId: "731b2d4e-dddb-4a06-b59a-72d43e969df7",
        name: "Y Tý",
        fromTime: "September 11, 2019",
        toTime: "2019-09-11T03:17:00.000Z",
        feeling: "Ngớ ngẩn",
        activity: "Săn mây",
        highlights: "Đẹp, Nguy hiểm",
        // signedUrl: "http://placekitten.com/900/1200"
      },
      {
        locationId: "731b2d4e-dddb-4a06-b59a-72d43e969df7",
        name: "Y Tý",
        fromTime: "September 11, 2019",
        toTime: "2019-09-11T03:17:00.000Z",
        feeling: "Ngớ ngẩn",
        activity: "Săn mây",
        highlights: "Đẹp, Nguy hiểm",
        // signedUrl: "http://placekitten.com/900/1200"
      },
    ],
    locale: "vi",
    numberOfDays: 1,
  };

  for (let index = 0; index < N; index++) {
    console.log(index);
    await dispatcherInstance.dispatch(data);
  }
}

(async (): Promise<void> => {
  exec();
})();
