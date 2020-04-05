import { InfographicConfig } from "../index";

export const config01Location: InfographicConfig.TripInfographic = {
  width: 1280,
  // height: 1280 + 300,
  backgroundColor: "#e3d1a2",

  type: "location",
  flex: "column",
  blocks: [
    {
      type: "location-image",
      width: 1280,
      height: 1280,
    },
    {
      type: "container",
      height: 250,
      flex: "column", // add this to make text flex
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
            left: 20,
          },
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
            left: 20,
          },
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
            left: 20,
          },
        },
      ],
    },
    {
      type: "container",
      height: 50,
      blocks: [
        {
          // render footer image
          type: "image",
          url: "./data/images/App_Signature.png",

          positioning: {
            right: 200,
            bottom: 80,
          },
        },
      ],
    },
  ],
};

export const config02Locations: InfographicConfig.TripInfographic = {
  width: 1280,
  backgroundColor: "rgb(254, 255, 246)",
  type: "container",
  flex: "column",
  blocks: [
    // header
    {
      type: "container",
      height: 170,
      flex: "column",
      blocks: [
        {
          type: "text",
          color: "rgb(0, 0, 0)",
          fontFamily: "Roboto",
          fontSize: "64px",
          textAnchor: "middle",
          fontWeight: "bold",
          textTransform: "uppercase",
          positioning: {},
          text: "{{trip.name}}",
        },
        {
          type: "text",
          color: "rgb(0, 0, 0)",
          fontFamily: "Roboto",
          fontSize: "64px",
          textAnchor: "middle",
          fontWeight: "bold",
          textTransform: "uppercase",
          positioning: {},
          text: "{{trip.info}}",
        },
      ],
    },
    {
      type: "container",
      height: 1200,
      backgroundColor: "#fff",
      blocks: [
        // first location
        {
          type: "location",
          flex: "column",
          blocks: [
            {
              type: "location-image",
              width: 1280 / 2,
              height: 840,
              // svgWidth: 630,
              // svgHeight: 840,
              // viewBoxWidth: 288.5,
              // viewBoxHeight: 384.1,
              // clipPath: "M2.5 2.5H286v379.1H2.5z",
              // paddingTop: 20,
              // paddingBetweenImage: 5
            },
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
                top: 60,
                left: 20,
              },
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
                top: 60,
                left: 20,
              },
              width: 1280 / 2 - 40,
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
                top: 60,
                left: 20,
              },
            },
          ],
        },
        // second location
        {
          type: "location",
          flex: "column",
          positioning: {
            left: 1280 / 2,
          },
          blocks: [
            {
              type: "location-image",
              width: 1280 / 2,
              height: 840,
              // positioning: {
              //   left: 1280 / 2
              // }
              // svgWidth: 630,
              // svgHeight: 840,
              // viewBoxWidth: 288.5,
              // viewBoxHeight: 384.1,
              // clipPath: "M2.5 2.5H286v379.1H2.5z",
              // paddingTop: 20,
              // paddingBetweenImage: 5
            },
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
                top: 60,
                left: 20,
              },
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
                top: 60,
                left: 20,
              },
              width: 1280 / 2 - 40,
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
                top: 60,
                left: 20,
              },
            },
          ],
        },
      ],
    },
    // render footer image
    {
      type: "container",
      height: 70,
      blocks: [
        {
          type: "image",
          url: "./data/images/App_Signature.png",
          positioning: {
            right: 200,
            bottom: 80,
          },
        },
      ],
    },
  ],
};

export const configNLocations: InfographicConfig.TripInfographic = {
  width: 2060,
  backgroundColor: "#e3d1a2",
  type: "container",
  flex: "column",
  blocks: [
    {
      // header
      type: "container",
      flex: "column",
      height: 370,
      backgroundColor: "#d0363b",
      blocks: [
        {
          type: "text",
          color: "#e3d1a2",
          fontFamily: "Roboto",
          fontSize: "84px",
          textAnchor: "middle",
          fontWeight: "bold",
          textTransform: "uppercase",
          positioning: {
            top: 80,
          },
          text: "{{trip.name}}",
        },
        {
          type: "text",
          color: "#e3d1a2",
          fontFamily: "Roboto",
          fontSize: "74px",
          textAnchor: "middle",
          textTransform: "uppercase",
          positioning: {
            top: 110,
          },
          text: "{{trip.info}}",
        },
      ],
    },
    {
      type: "locations",
      flex: "column",
      blocks: [
        {
          // first location
          type: "location",
          height: 500,
          blocks: [
            {
              type: "line",
              x1: 2060 / 2,
              y1: 60,
              x2: 2060 / 2,
              y2: 500 + 60,
              strokeColor: "#121113",
              strokeWidth: 10,
            },
            {
              type: "circle",
              x: 2060 / 2,
              y: 60,
              r: 24,
              fillColor: "red",
            },
            {
              type: "location-image",
              width: 380,
              height: 371,
              positioning: {
                top: 60,
                left: 2060 / 2 - 360 - 40 * 3,
              },
              clipPath:
                "M269 366.5c-2.2.6-3.9 1.4-5.6 1.6-9.6.8-19.1 1.6-28.7 2.3-4.9.3-9.8.6-14.7.7-5.3.2-10.6.5-15.8.3-5-.1-10-.4-14.8-1.3-6.2-1.1-12.5-1.1-18.6-2.1-15.9-2.6-32.1-1.9-48.1-3-9-.6-18-2-27-3.2-10.2-1.3-20.4-2.8-30.7-4.2-7.5-1-15.1-2-22.6-3-.2 0-.4-.1-.6-.1-6.3-2.7-13-4.8-18.8-8.3-9.8-6-14-15.6-14.4-26.9-.1-3.9-.6-7.7-.6-11.6.1-5.4.5-10.7.8-16 .8-15.8 1.2-31.6 0-47.4-1.1-14.2-2.1-28.3-3.2-42.5-.7-9.1-1.6-18.1-2.2-27.2-.4-6-.3-12.1-.7-18.1-.2-3.4-1.3-6.7-1.4-10.1-.4-8.2-.5-16.5-.7-24.8-.1-3.2-.6-6.4-.5-9.6.1-5 .7-10 .8-15C1 91.2.4 85.4.6 79.7c0-5.5.7-10.9 1.4-16.4.2-1.9 1.6-3.6 2-5.5 1.7-9.4 3.5-18.8 7.9-27.5 1-1.9 2.6-3.6 4.1-5.1.5-.5 1.7-.2 2-.2.7-1.3 1.1-2.6 1.9-3.2 4.3-3.3 8.8-5.7 14.4-6.3 4.2-.5 8.3-2.3 12.5-3.3C51.9 11 57 9.6 62.3 8.9c4.8-.6 9.4-1.9 14.3-2.3 5-.4 10-1.6 15.1-2 13.8-1 27.7-1.7 41.5-2.5 3.4-.2 6.8 0 10.2.1 1.7.1 3.4.5 5.2.7.8.1 1.6-.2 2.4-.2 2.4 0 4.9 0 7.3-.1 4.6-.2 9.3-.7 13.9-.7 4.5 0 9 .3 13.5.5h3.6c5.5-.2 10.9-.2 16.4-.5 5.3-.3 10.5-1 15.8-1.3 2.5-.2 5.1-.2 7.6.3 3.8.7 7.4 1.1 11.2 0 1.4-.4 3.2.3 4.8.5.7.1 1.5.3 1.9 0 2.7-2 5.2-1.5 7.8.2.3.2 1.1-.3 1.7-.3 2.4 0 4.8 0 7.3.1 1.8.1 3.5.7 5.3.9 3.9.5 7.9 1.3 11.9 1.3 7.5.1 15 .4 22.4 2 6.9 1.5 14 1.5 21 2.7 4.2.7 8.5 2 12.1 4.1 3.9 2.2 6.9 5.8 10.4 8.8 1.3 1.1 3.2 1.9 4.1 3.3 2.6 3.8 4.9 7.8 7.2 11.8 1.7 2.9 3.4 5.9 4.7 8.9 1.4 3.5 2.5 7.1 3.6 10.8 1.7 5.8 3.7 11.6 4.8 17.6 1.6 8.4 2.4 17 3.6 25.5.4 2.8.9 5.6 1.1 8.4.6 8 1 15.9 1.5 23.9.7 9.9 1.7 19.7 2.2 29.6.5 9.5.9 19.1.7 28.7-.3 16-1.1 31.9-1.9 47.9-.5 9.9-1.2 19.7-2.2 29.5s-2.5 19.5-3.6 29.3c-.8 6.8-1 13.6-1.9 20.3-.8 6.1-3.8 11.5-7.8 16-3.3 3.8-5.9 8.1-9.3 11.8-3 3.3-6.3 6.6-11.5 6.7-1.2 0-2.3 1.2-3.5 1.8-5.1 2.2-10.4 4.1-15.4 6.5-9.2 4.4-19.1 5.1-29 5.5-3.8.2-7.7-.1-11.5.2-1.9.1-3.7 1-5.5 1.4-.8.2-1.6.1-2.5.2-1.2.1-2.4.4-3.6.3-1.2-.2-2-.6-2.2-.6z",
            },
            {
              type: "container",
              width: 2060 / 2,
              height: 500,
              flex: "column",
              positioning: {
                left: 2060 / 2 + 40,
                top: 0,
              },
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
                    top: 60,
                    left: 20,
                  },
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
                    top: 60,
                    left: 20,
                  },
                  width: 1280 / 2 - 40,
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
                    top: 60,
                    left: 20,
                  },
                },
              ],
            },
          ],
        },
        {
          // secondary location
          type: "location",
          height: 500,
          blocks: [
            {
              type: "line",
              x1: 2060 / 2,
              y1: 60,
              x2: 2060 / 2,
              y2: 500 + 60,
              strokeColor: "#121113",
              strokeWidth: 10,
            },
            {
              type: "circle",
              x: 2060 / 2,
              y: 60,
              r: 24,
              fillColor: "red",
            },
            {
              type: "location-image",
              width: 380,
              height: 371,
              positioning: {
                top: 60,
                left: 2060 / 2 + 40 * 3,
              },
              clipPath:
                "M269 366.5c-2.2.6-3.9 1.4-5.6 1.6-9.6.8-19.1 1.6-28.7 2.3-4.9.3-9.8.6-14.7.7-5.3.2-10.6.5-15.8.3-5-.1-10-.4-14.8-1.3-6.2-1.1-12.5-1.1-18.6-2.1-15.9-2.6-32.1-1.9-48.1-3-9-.6-18-2-27-3.2-10.2-1.3-20.4-2.8-30.7-4.2-7.5-1-15.1-2-22.6-3-.2 0-.4-.1-.6-.1-6.3-2.7-13-4.8-18.8-8.3-9.8-6-14-15.6-14.4-26.9-.1-3.9-.6-7.7-.6-11.6.1-5.4.5-10.7.8-16 .8-15.8 1.2-31.6 0-47.4-1.1-14.2-2.1-28.3-3.2-42.5-.7-9.1-1.6-18.1-2.2-27.2-.4-6-.3-12.1-.7-18.1-.2-3.4-1.3-6.7-1.4-10.1-.4-8.2-.5-16.5-.7-24.8-.1-3.2-.6-6.4-.5-9.6.1-5 .7-10 .8-15C1 91.2.4 85.4.6 79.7c0-5.5.7-10.9 1.4-16.4.2-1.9 1.6-3.6 2-5.5 1.7-9.4 3.5-18.8 7.9-27.5 1-1.9 2.6-3.6 4.1-5.1.5-.5 1.7-.2 2-.2.7-1.3 1.1-2.6 1.9-3.2 4.3-3.3 8.8-5.7 14.4-6.3 4.2-.5 8.3-2.3 12.5-3.3C51.9 11 57 9.6 62.3 8.9c4.8-.6 9.4-1.9 14.3-2.3 5-.4 10-1.6 15.1-2 13.8-1 27.7-1.7 41.5-2.5 3.4-.2 6.8 0 10.2.1 1.7.1 3.4.5 5.2.7.8.1 1.6-.2 2.4-.2 2.4 0 4.9 0 7.3-.1 4.6-.2 9.3-.7 13.9-.7 4.5 0 9 .3 13.5.5h3.6c5.5-.2 10.9-.2 16.4-.5 5.3-.3 10.5-1 15.8-1.3 2.5-.2 5.1-.2 7.6.3 3.8.7 7.4 1.1 11.2 0 1.4-.4 3.2.3 4.8.5.7.1 1.5.3 1.9 0 2.7-2 5.2-1.5 7.8.2.3.2 1.1-.3 1.7-.3 2.4 0 4.8 0 7.3.1 1.8.1 3.5.7 5.3.9 3.9.5 7.9 1.3 11.9 1.3 7.5.1 15 .4 22.4 2 6.9 1.5 14 1.5 21 2.7 4.2.7 8.5 2 12.1 4.1 3.9 2.2 6.9 5.8 10.4 8.8 1.3 1.1 3.2 1.9 4.1 3.3 2.6 3.8 4.9 7.8 7.2 11.8 1.7 2.9 3.4 5.9 4.7 8.9 1.4 3.5 2.5 7.1 3.6 10.8 1.7 5.8 3.7 11.6 4.8 17.6 1.6 8.4 2.4 17 3.6 25.5.4 2.8.9 5.6 1.1 8.4.6 8 1 15.9 1.5 23.9.7 9.9 1.7 19.7 2.2 29.6.5 9.5.9 19.1.7 28.7-.3 16-1.1 31.9-1.9 47.9-.5 9.9-1.2 19.7-2.2 29.5s-2.5 19.5-3.6 29.3c-.8 6.8-1 13.6-1.9 20.3-.8 6.1-3.8 11.5-7.8 16-3.3 3.8-5.9 8.1-9.3 11.8-3 3.3-6.3 6.6-11.5 6.7-1.2 0-2.3 1.2-3.5 1.8-5.1 2.2-10.4 4.1-15.4 6.5-9.2 4.4-19.1 5.1-29 5.5-3.8.2-7.7-.1-11.5.2-1.9.1-3.7 1-5.5 1.4-.8.2-1.6.1-2.5.2-1.2.1-2.4.4-3.6.3-1.2-.2-2-.6-2.2-.6z",
            },
            {
              type: "container",
              width: 2060 / 2 - 60,
              flex: "column",
              positioning: {
                left: 0,
                top: 0,
              },
              blocks: [
                {
                  // location name
                  type: "text",
                  text: "{{location.name}}",
                  fontSize: "64px",
                  fontFamily: "Roboto",
                  color: "#d0363b",
                  fontWeight: "bold",
                  textAnchor: "end",
                  textTransform: "uppercase",
                  positioning: {
                    top: 60,
                    right: 20,
                  },
                },
                {
                  // location feeling
                  type: "text",
                  text: "{{location.feeling}}",
                  fontSize: "48px",
                  fontFamily: "Roboto",
                  color: "#121113",
                  textAnchor: "end",
                  positioning: {
                    top: 60,
                    right: 20,
                  },
                  width: 1280 / 2 - 40,
                },
                {
                  // location highlights
                  type: "text",
                  text: "{{location.hight-lights}}",
                  fontSize: "48px",
                  fontFamily: "Roboto",
                  color: "#121113",
                  textAnchor: "end",
                  positioning: {
                    top: 60,
                    right: 20,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    // render footer image
    {
      type: "container",
      height: 200,
      blocks: [
        {
          type: "image",
          url: "./data/images/App_Signature.png",
          positioning: {
            right: 200,
            bottom: 80,
          },
        },
      ],
    },
  ],
};
