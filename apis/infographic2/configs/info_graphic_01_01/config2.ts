import { InfographicConfig } from "../index";

export const config_01_01: InfographicConfig.TripInfographic = {
  width: 1280,
  height: 1280,
  backgroundColor: "green",

  type: "location",
  blocks: [
    {
      type: "location-image",
      width: 1280,
      height: 1280
    },
    {
      type: "circle",
      fillColor: "pink",
      x: 1280 / 2,
      y: 1280 / 2,
      r: 1280 / 2
    },
    {
      type: "container",
      positioning: {
        top: 1017 - 45 // todo check why ?
      },
      blocks: [
        {
          type: "path",
          path: "M0 48L1280 115.074V311H0V48Z",
          fillColor: "#2E97A1"
        }
      ]
    },
    {
      type: "container",
      positioning: {
        top: 969,
        left: 56
      },
      blocks: [
        {
          type: "path",
          path:
            "M26.6299 1.1097L665.144 55.2586L695.59 179.459L6.00008 225.5L26.6299 1.1097Z",
          fillColor: "#C0E2E6"
        },
        {
          // location name
          type: "text",
          text: "{{location.name}}",
          fontSize: "46px",
          fontFamily: "Roboto",
          color: "#2E97A1",
          fontWeight: "bold",
          textAnchor: "start",
          // todo: ability to lowercase ?
          textTransform: "uppercase",
          positioning: {
            top: 50,
            left: 120
          }
        },
        {
          // location activity
          type: "text",
          text: "{{location.activity}}",
          fontSize: "34px",
          fontFamily: "Roboto",
          color: "#2E97A1",
          textAnchor: "start",
          width: 500,
          positioning: {
            top: 110,
            left: 120
          }
        }
      ]
    },
    {
      type: "container",
      positioning: {
        top: 836,
        left: 48
      },
      blocks: [
        {
          type: "svg",
          url: "./configs/info_graphic_01_01/images/location.svg"
        }
      ]
    },
    {
      type: "container",
      positioning: {
        top: 1118,
        left: 846 - 50 // todo
      },
      blocks: [
        {
          type: "svg",
          url: "./configs/info_graphic_01_01/images/star.svg"
        },
        {
          // location activity
          type: "text",
          text: "{{location.activity}}",
          fontSize: "30px",
          fontFamily: "Roboto",
          color: "white",
          textAnchor: "start",
          width: 500,
          positioning: {
            top: 0,
            left: 46
          }
        }
      ]
    },
    {
      type: "container",
      positioning: {
        top: 1180,
        left: 846 - 50
      },
      blocks: [
        {
          type: "svg",
          url: "./configs/info_graphic_01_01/images/smile.svg"
        },
        {
          // location activity
          type: "text",
          text: "{{location.feeling}}",
          fontSize: "30px",
          fontFamily: "Roboto",
          color: "white",
          textAnchor: "start",
          width: 500,
          positioning: {
            top: 0,
            left: 46
          }
        }
      ]
    },
  ]
};
