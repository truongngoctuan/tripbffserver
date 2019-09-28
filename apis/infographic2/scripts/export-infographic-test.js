// aws sample data
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
      // signedUrl: "http://placekitten.com/1300/1000"
    }
    // {
    //   locationId: "2b877a4c-5bf9-4315-a8b4-02f44971879d",
    //   name: "Mù Cang Chải",
    //   fromTime: "September 10, 2019",
    //   toTime: "2019-09-10T03:16:00.000Z",
    //   feeling: "Yên bình",
    //   activity: "Ngắm ruộng lúa",
    //   highlights: "Đẹp, Rẻ",
    //   signedUrl:
    //     "http://18.140.37.188:8000/images/4fbd9b00-e0d6-11e9-9eb4-07fe33cabedd/thumbnail/sign-only"
    // },
    // {
    //   locationId: "1f611a70-abde-4e5d-95d3-ae5e7959a9cb",
    //   name: "Tú Lệ",
    //   fromTime: "September 10, 2019",
    //   toTime: "2019-09-10T03:16:00.000Z",
    //   feeling: "Chill",
    //   activity: "Ngắm mặt trời lặn",
    //   highlights: "Đẹp, Đồ ăn ngon",
    //   signedUrl:
    //     "http://18.140.37.188:8000/images/55093240-e0d6-11e9-9eb4-07fe33cabedd/thumbnail/sign-only"
    // },
    // {
    //   locationId: "731b2d4e-dddb-4a06-b59a-72d43e969df7",
    //   name: "Y Tý",
    //   fromTime: "September 11, 2019",
    //   toTime: "2019-09-11T03:17:00.000Z",
    //   feeling: "Ngớ ngẩn",
    //   activity: "Săn mây",
    //   highlights: "Đẹp, Nguy hiểm",
    //   signedUrl:
    //     "http://18.140.37.188:8000/images/5a4734f0-e0d6-11e9-9eb4-07fe33cabedd/thumbnail/sign-only"
    // }
  ],
  locale: "vi",
  numberOfDays: 1
};

const infographicTypes = require("./info_graphic_type");
const genericDraw = require("./info_graphic_general_draw");
const startTimer = new Date().getTime();

(async () => {
  // setTimeout(async() => {

  const canvasAdaptor = await genericDraw.draw(
    data,
    infographicTypes.INFOGRAPHIC_TYPE.FIRST_RELEASED
  );
  canvasAdaptor.draw();
  await canvasAdaptor.export("output.png");
  console.log(`TIMER ${new Date().getTime() - startTimer} ms: completed`);
  // }, 1000);
})();
