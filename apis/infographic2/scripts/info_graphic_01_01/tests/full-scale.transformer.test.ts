import { InfographicConfig } from "../../../configs";
import { processBlock } from "../transformers";
import {
  config_01_01,
  config_01_02,
  config_01_others,
} from "../../../configs/info_graphic_01_01/config";

describe("complex transformer", () => {
  test("complex configs for 1 location", () => {
    //Arrange
    const config: InfographicConfig.TripInfographic = config_01_01;

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
      ],
      locale: "vi",
      numberOfDays: 1,
    };

    // Act
    const result = processBlock(config, data, { level: 0, location: 0 });

    // Assert
    expect(result).toBeDefined();
    expect(result.cursor.location).toBe(1);
    expect(result.block).toMatchSnapshot();
  });

  test("complex configs for 2 locations", () => {
    //Arrange
    const config: InfographicConfig.TripInfographic = config_01_02;

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
      ],
      locale: "vi",
      numberOfDays: 1,
    };

    // Act
    const result = processBlock(config, data, { level: 0, location: 0 });

    // Assert
    expect(result).toBeDefined();
    expect(result.cursor.location).toBe(2);
    expect(result.block).toMatchSnapshot();
  });

  test("complex configs for n locations", () => {
    //Arrange
    const config: InfographicConfig.TripInfographic = config_01_others;

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
          // signedUrl: "http://placekitten.com/800/600"
        },
      ],
      locale: "vi",
      numberOfDays: 1,
    };

    // Act
    const result = processBlock(config, data, { level: 0, location: 0 });

    // Assert
    expect(result).toBeDefined();
    expect(result.cursor.location).toBe(3);
    expect(result).toMatchSnapshot();
  });
});
