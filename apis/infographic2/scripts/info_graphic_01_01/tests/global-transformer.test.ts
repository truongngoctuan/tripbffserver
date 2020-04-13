import { InfographicConfig } from "../../../configs";
import { processBlock } from "../transformers";
import {
  config01Location,
  config02Locations,
  configNLocations,
} from "../../../configs/01-old-design/config";
import { applyGlobalTransform } from "../transformers/global-transformers";
import { Trip } from "../../models/trip";

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
