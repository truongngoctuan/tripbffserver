import { InfographicConfig } from "..";
import {
  sharedHeader,
  sharedLocationImage01,
  locationDetails,
  sharedLocationImage02,
} from "./shared-components";

const locations: InfographicConfig.LocationsBlocks = {
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
        {
          ...sharedLocationImage02,
          scale: 0.85,
        },
        // location details
        {
          ...locationDetails,
          positioning: {
            top: 80,
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
        {
          ...sharedLocationImage01,
          scale: 0.85,
        },
        // location details
        {
          ...locationDetails,
          positioning: {
            top: 150,
            left: -500,
          },
        },
      ],
    },
  ],
};

export const config03Locations: InfographicConfig.TripInfographic = {
  width: 960,
  // height: 3000,
  backgroundColor: "#C0E2E5",

  type: "container",
  flex: "column",
  blocks: [
    {
      ...sharedHeader,
      scale: 0.75,
    },
    {
      ...locations,
      scale: 0.75,
    },
    {
      type: "container",
      height: 300,
      scale: 0.75,
      blocks: [],
    },
  ],
};