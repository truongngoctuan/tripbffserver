import { InfographicConfig } from "../../../configs";
import { preProcessInfographicConfig } from "../transformers";
import {
  config_01_01,
  config_01_02
} from "../../../configs/info_graphic_01_01/config";

describe("complex transformer", () => {
  test("complex configs for 1 location", () => {
    //Arrange
    const config: InfographicConfig.Infographic = config_01_01;

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
          signedUrl: "http://placekitten.com/700/500"
        }
      ],
      locale: "vi",
      numberOfDays: 1
    };

    // Act
    const result = preProcessInfographicConfig(
      config,
      data
    ) as InfographicConfig.Infographic;

    // Assert
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
  });

  test("complex configs for 2 locations", () => {
    //Arrange
    const config: InfographicConfig.Infographic = config_01_02;

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
          signedUrl: "http://placekitten.com/700/500"
        },
        {
          locationId: "2b877a4c-5bf9-4315-a8b4-02f44971879d",
          name: "Mù Cang Chải",
          fromTime: "September 10, 2019",
          toTime: "2019-09-10T03:16:00.000Z",
          feeling: "Yên bình",
          activity: "Ngắm ruộng lúa",
          highlights: "Đẹp, Rẻ",
          signedUrl: "http://placekitten.com/1200/1200"
        }
      ],
      locale: "vi",
      numberOfDays: 1
    };

    // Act
    const result = preProcessInfographicConfig(
      config,
      data
    ) as InfographicConfig.Infographic;

    // Assert
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
  });
});
