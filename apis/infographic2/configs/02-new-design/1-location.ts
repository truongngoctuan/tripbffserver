import { InfographicConfig } from "../index";

export const config01Location: InfographicConfig.TripInfographic = {
  width: 1280,
  height: 1280,
  backgroundColor: "green",

  type: "location",
  blocks: [
    {
      type: "location-image",
      width: 1280,
      height: 1280,
    },
    // background whole location
    {
      type: "svg",
      url: "./configs/02-new-design/images/location-background.svg",
      positioning: {
        top: 1017 - 48,
      },
    },
    {
      type: "container",
      positioning: {
        top: 929,
        left: 56,
      },
      blocks: [
        // background location name
        {
          type: "svg",
          url: "./configs/02-new-design/images/location-name-background.svg",
          shadowOffset: {
            x: 0,
            y: 4,
          },
          shadowColor: "rgba(0, 0, 0, 0.25)",
          shadowBlur: 4,
        },
        {
          // location name
          type: "text",
          text: "{{location.name}}",
          fontSize: "54px",
          fontFamily: "Nunito",
          fontWeight: "900",
          color: "#2E97A1",
          textAnchor: "start",
          width: 600,
          positioning: {
            top: 80,
            left: 130,
          },
          numberOfLines: 1
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
            left: 130,
          },
          numberOfLines: 2
        },
      ],
    },
    {
      type: "svg",
      url: "./configs/02-new-design/images/location.svg",
      positioning: {
        top: 836,
        left: 48,
      },
    },
    {
      type: "container",
      positioning: {
        top: 1200,
        left: 846 - 50,
      },
      blocks: [
        {
          type: "svg",
          url: "./configs/02-new-design/images/smile.svg",
        },
        {
          // location activity
          type: "text",
          text: "{{location.feeling}}",
          fontSize: "32px",
          fontFamily: "Nunito",
          color: "white",
          textAnchor: "start",
          width: 480,
          positioning: {
            top: 0 - 4,
            left: 46,
          },
          numberOfLines: 2
        },
      ],
    },
    {
      type: "container",
      positioning: {
        top: 1118,
        left: 846 - 50, // todo
      },
      blocks: [
        {
          type: "svg",
          url: "./configs/02-new-design/images/star.svg",
        },
        {
          // location activity
          type: "text",
          text: "{{location.hight-lights}}",
          fontSize: "32px",
          fontFamily: "Nunito",
          color: "white",
          textAnchor: "start",
          width: 480,
          positioning: {
            top: 0 - 4,
            left: 46,
          },
          numberOfLines: 2
        },
      ],
    },    
  ],
};
