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
      height: 375,
      positioning: {
        // top: 412,
        left: 97,
      },
      blocks: [
        {
          ...sharedLocationImage01,
          positioning: {
            left: 125,
          },
          scale: 0.55,
        },
        // location details
        {
          ...locationDetails,
          positioning: {
            top: 50,
            left: 580,
          },
          scale: 0.8
        },
      ],
    },
    //2nd location
    {
      type: "location",
      height: 375,
      positioning: {
        // top: 724,
        left: 630,
      },
      blocks: [
        {
          ...sharedLocationImage02,
          positioning: {
            left: 225
          },
          scale: 0.55,
        },
        // location details
        {
          ...locationDetails,
          positioning: {
            top: 70,
            left: -380,
          },
          scale: 0.8
        },
      ],
    },
  ],
};

export const config04Locations: InfographicConfig.TripInfographic = {
  width: 960,
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
      height: 150,
      scale: 0.75,
      blocks: [],
    },
  ],
};