import { InfographicConfig } from "..";

export const sharedHeader: InfographicConfig.ContainerBlock = {
  type: "container",
  height: 400,
  blocks: [
    //infographic header
    {
      type: "container",
      positioning: {
        left: 133,
        top: 24,
      },
      blocks: [
        {
          type: "svg",
          url: "./configs/02-new-design/images/02-location-name-background.svg",
          positioning: {
            // left: 133,
            // top: 24
          },
        },
        // together making location icon with white background
        {
          type: "circle",
          fillColor: "white",
          r: 30,
          x: 93,
          y: 82,
        },
        {
          type: "svg",
          url: "./configs/02-new-design/images/02-location-name-icon.svg",
          positioning: {
            left: 26,
            top: 12,
          },
        },

        // infographic name
        {
          // location name
          type: "text",
          text: "{{trip.name}}",
          fontSize: "64px",
          fontFamily: "Nunito",
          fontWeight: "900",
          color: "white",
          textAnchor: "middle",
          positioning: {
            top: 104,
            left: -40,
          },
        },
        {
          // location activity
          type: "text",
          text: "{{trip.info}}",
          fontSize: "40px",
          fontFamily: "Nunito",
          fontWeight: "normal",
          color: "white",
          textAnchor: "middle",
          width: 500,
          positioning: {
            top: 190,
            left: -40,
          },
        },
      ],
    },
  ],
};

const locationDetailsChildren02: InfographicConfig.Block[] = [
  {
    // location name
    type: "text",
    text: "{{location.name}}",
    fontSize: "64px",
    fontFamily: "Nunito",
    fontWeight: "900",
    color: "#2E97A1",
    textAnchor: "start",
    positioning: {},
  },
  {
    // location activity
    type: "text",
    text: "{{location.activity}}",
    fontSize: "32px",
    fontFamily: "Nunito",
    fontWeight: "600 italic",
    color: "#383838",
    textAnchor: "start",
    width: 500,
    positioning: {
      top: 20,
      left: 0,
    },
  },
  {
    type: "container",
    positioning: {
      top: 75,
      left: 0,
    },
    blocks: [
      {
        type: "svg",
        url: "./configs/02-new-design/images/02-location-n-smile-icon.svg",
      },
      {
        // location activity
        type: "text",
        text: "{{location.feeling}}",
        fontSize: "32px",
        fontFamily: "Nunito",
        fontWeight: "600 italic",
        color: "#383838",
        textAnchor: "start",
        width: 500,
        positioning: {
          left: 50,
        },
      },
    ],
  },
  {
    type: "container",
    positioning: {
      top: 80,
      left: 0,
    },
    blocks: [
      {
        type: "svg",
        url: "./configs/02-new-design/images/02-location-n-like-icon.svg",
      },
      {
        // location activity
        type: "text",
        text: "{{location.hight-lights}}",
        fontSize: "32px",
        fontFamily: "Nunito",
        fontWeight: "600 italic",
        color: "#383838",
        textAnchor: "start",
        width: 500,
        positioning: {
          left: 50,
        },
      },
    ],
  },
];

export const locationDetails: InfographicConfig.ContainerBlock = {
  type: "container",
  flex: "column",
  blocks: locationDetailsChildren02,
};

export const sharedLocationImage01: InfographicConfig.TripContainerBlock = {
  type: "container",
  blocks: [
    {
      type: "location-image",
      width: 550 - 4,
      height: 680 - 4,
      positioning: {
        top: 26,
        left: 32,
      },
      rotate: -5.57,
    },
    {
      type: "svg",
      url: "./configs/02-new-design/images/02-location-01-border.svg",
    },
  ],
};

export const sharedLocationImage02: InfographicConfig.TripContainerBlock = {
  type: "container",
  blocks: [
    {
      type: "location-image",
      width: 550 - 4,
      height: 680 - 4,
      positioning: {
        top: 23,
        left: 29,
      },
      rotate: 5.11,
    },
    {
      type: "svg",
      url: "./configs/02-new-design/images/02-location-02-border.svg",
    },
  ],
};

//todo should handle for 3 locations only
// locationDetails will be able to reuse
export const sharedNLocations: InfographicConfig.LocationsBlocks = {
  type: "locations",
  flex: "column",
  blocks: [
    // 1st location
    {
      type: "location",
      height: 550,
      positioning: {
        // top: 412,
        left: 97,
      },
      blocks: [
        sharedLocationImage01,
        // location details
        {
          ...locationDetails,
          positioning: {
            top: 100,
            left: 625,
          },
        },
      ],
    },
    //2nd location
    {
      type: "location",
      height: 625,
      positioning: {
        // top: 724,
        left: 630,
      },
      blocks: [
        sharedLocationImage02,
        // location details
        {
          ...locationDetails,
          positioning: {
            top: 270,
            left: -450,
          },
        },
      ],
    },
  ],
};
