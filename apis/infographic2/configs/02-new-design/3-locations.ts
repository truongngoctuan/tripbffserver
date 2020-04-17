import { InfographicConfig } from "..";
import {
  sharedHeader,
  sharedLocationImage01,
  locationDetails,
  sharedLocationImage02,
} from "./shared-components";

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
      ...sharedNLocations,
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

export const settings03Locations = {
  // scale: 0.75,
};
