import { InfographicConfig } from "../../../configs";
import { preProcessInfographicConfig } from "../transformer";

describe("complex transformer", () => {

  test("complex configs", () => {
    //Arrange
    const config: InfographicConfig.Infographic = {
      width: 1280,
      // height: 1280 + 300,
      backgroundColor: "#e3d1a2",
      
      type: "container",
      blocks: [
        {
          type: "location",
          blocks: [
            {
              type: "container",
              blocks: [
                {
                  type: "location-image",
                  width: 1280,
                  height: 1280
                }
              ]
            },
            {
              type: "container",
              height: 300,
              blocks: [
                {
                  // location name
                  type: "text",
                  text: "{{location.name}}",
                  fontSize: "64px",
                  fontFamily: "Roboto",
                  color: "#d0363b",
                  fontWeight: "bold",
                  textAnchor: "start",
                  textTransform: "uppercase",
                  positioning: {
                    top: 20,
                    left: 20
                  }
                },
                {
                  // location feeling
                  type: "text",
                  text: "{{location.feeling}}",
                  fontSize: "48px",
                  fontFamily: "Roboto",
                  color: "#121113",
                  textAnchor: "start",
                  positioning: {
                    top: 20,
                    left: 20
                  }
                },
                {
                  // location highlights
                  type: "text",
                  text: "{{location.hight-lights}}",
                  fontSize: "48px",
                  fontFamily: "Roboto",
                  color: "#121113",
                  textAnchor: "start",
                  positioning: {
                    top: 20,
                    left: 20
                  }
                }
              ]
            }
          ]
        },
        {
          // render footer image
          type: "image",
          url: "./data/images/App_Signature.png",
    
          positioning: {
            right: 200,
            bottom: 80
          }
        }
      ]
    };

    const data = {};

    // Act
    const result = preProcessInfographicConfig(config, data) as InfographicConfig.Infographic;

    // Assert
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
  });
  
});
