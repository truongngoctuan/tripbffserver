import { InfographicConfig } from "../../../configs";
import {
  configNLocations,
} from "../../../configs/01-old-design/config";
import { applyGlobalTransform } from "../transformers/global-transformers";

describe("complex transformer", () => {
  test("complex configs with scale 0.6", () => {
    //Arrange
    const config: InfographicConfig.TripInfographic = configNLocations;

    // Act
    const result = applyGlobalTransform(config, { scale: 0.6 });

    // Assert
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
  });
});
