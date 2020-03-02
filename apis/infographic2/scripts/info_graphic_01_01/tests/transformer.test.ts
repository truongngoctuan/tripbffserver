import { InfographicConfig } from "../../../configs";
import { preProcessInfographicConfig } from "../transformer";

describe("node transformer", () => {
  test("simple container node", () => {
    //Arrange
    const config: InfographicConfig.Infographic = {
      width: 1280,
      backgroundColor: "black",
      type: "container",
      blocks: [
        {
          type: "container",
          backgroundColor: "grey",
          height: 100,
          blocks: []
        },
        {
          type: "container",
          backgroundColor: "green",
          height: 1000,
          blocks: []
        }
      ]
    };

    const data = {};

    // Act
    const result = preProcessInfographicConfig(config, data) as InfographicConfig.Infographic;

    // Assert
    expect(result).toBeDefined();
    expect(result.height).toBe(1100);
    expect(result.blocks.length).toBe(2);
    expect(result).toMatchSnapshot();
  });

  test("not supported container node", () => {
    //Arrange
    const config = {
      width: 1280,
      backgroundColor: "black",
      type: "container2",
      blocks: []
    };

    const data = {};

    // Act
    const result = preProcessInfographicConfig(config as InfographicConfig.Infographic, data) as InfographicConfig.Infographic;

    // Assert
    expect(result).toBeDefined();
    expect(result).toBe(config);
  });

  test("simple leaf node", () => {
    //Arrange
    const config: InfographicConfig.Infographic = {
      width: 1280,
      backgroundColor: "black",
      type: "container",
      blocks: [
        {
          type: "container",
          backgroundColor: "grey",
          height: 100,
          blocks: []
        },
        {
          type: "container",
          backgroundColor: "green",
          height: 1000,
          blocks: []
        }
      ]
    };

    const data = {};

    // Act
    const result = preProcessInfographicConfig(config, data) as InfographicConfig.Infographic;

    // Assert
    expect(result).toBeDefined();
    expect(result.height).toBe(1100);
    expect(result.blocks.length).toBe(2);
    expect(result).toMatchSnapshot();
  });
  
});
