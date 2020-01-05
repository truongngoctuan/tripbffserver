import { InfographicConfig } from "..";

var config_01_01: InfographicConfig.Infographic = {
  width: 1280,
  backgroundColor: "#e3d1a2",

  blocks: [
    {
      type: "location",
      blocks: [
        {
          type: "location-image",
          width: 1280,
          height: 1280
        },
        {
          type: "container",
          // content_height: 300,
          height: 300,
          blocks: [
            {
              // location name
              type: "location-name-text",
              fontSize: "64px",
              fontFamily: "Roboto",
              color: "#d0363b",
              fontWeight: "bold",
              textAnchor: "start",
              textTransform: "uppercase",
              // todo add position
              top: 60,
              left: 20,
            },
            {
              // location feeling
              type: "location-feeling-text",
              fontSize: "48px",
              fontFamily: "Roboto",
              color: "#121113",
              textAnchor: "start",
              // todo add position
              top: 60,
              left: 20,
            },
            {
              // location highlights
              type: "location-high-lights-text",
              fontSize: "48px",
              fontFamily: "Roboto",
              color: "#121113",
              textAnchor: "start",
              // todo add position
              top: 60,
              left: 20,
            }
          ]
        }
      ]
    },
    {
      // render footer image
      type: "image",
      url: "put something here",

      // todo should review this one
      right: 200,
      bottom: 80
    }
  ]
};
