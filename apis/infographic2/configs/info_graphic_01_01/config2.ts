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
    // background whole location
    {
      type: "svg",
      url: "./configs/info_graphic_01_01/images/location-background.svg",
      positioning: {
        top: 1017 - 48
      }
    },
    {
      type: "container",
      positioning: {
        top: 929,
        left: 56
      },
      blocks: [
        // background location name
        {
          type: "svg",
          url:
            "./configs/info_graphic_01_01/images/location-name-background.svg",
          shadowOffset: {
            x: 0,
            y: 4
          },
          shadowColor: "rgba(0, 0, 0, 0.25)",
          shadowBlur: 4
        },
        {
          // location name
          type: "text",
          text: "{{location.name}}",
          fontSize: "64px",
          fontFamily: "Nunito",
          fontWeight: "900",
          color: "#2E97A1",
          textAnchor: "start",
          positioning: {
            top: 80,
            left: 140
          }
        },
        {
          // location activity
          type: "text",
          text: "{{location.activity}}",
          fontSize: "34px",
          fontFamily: "Nunito",
          fontWeight: "600 italic",
          color: "#2E97A1",
          textAnchor: "start",
          width: 500,
          positioning: {
            top: 160,
            left: 140
          }
        }
      ]
    },
    {
      type: "svg",
      url: "./configs/info_graphic_01_01/images/location.svg",
      positioning: {
        top: 836,
        left: 48
      }
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
          fontSize: "32px",
          fontFamily: "Nunito",
          color: "white",
          textAnchor: "start",
          width: 500,
          positioning: {
            top: 0 - 4,
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
          fontSize: "32px",
          fontFamily: "Nunito",
          color: "white",
          textAnchor: "start",
          width: 500,
          positioning: {
            top: 0 - 4,
            left: 46
          }
        }
      ]
    }
  ]
};

export const config_01_02: InfographicConfig.TripInfographic = {
  width: 1280,
  height: 1500,
  backgroundColor: "#C0E2E5",

  type: "location",
  blocks: [
    {
      type: "container",
      positioning: {
        top: 412,
        left: 97
      },
      blocks: [
        {
          type: "location-image",
          width: 550,
          height: 680,
          positioning: {
            top: 26,
            left: 32
          },
          rotate: -5.57
        },
        {
          type: "svg",
          url: "./configs/info_graphic_01_01/images/02-location-01-border.svg"
        }
      ]
    },
    {
      type: "container",
      positioning: {
        top: 724,
        left: 630
      },
      blocks: [
        {
          type: "location-image",
          width: 550,
          height: 680,
          positioning: {
            top: 26,
            left: 29
          },
          rotate: 5.11
        },
        {
          type: "svg",
          url: "./configs/info_graphic_01_01/images/02-location-02-border.svg"
        }
      ]
    }
  ]
};
