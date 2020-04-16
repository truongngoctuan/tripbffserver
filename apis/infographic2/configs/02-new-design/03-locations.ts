import { InfographicConfig } from "..";
import { sharedHeader, sharedNLocations } from "./shared-components";

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
