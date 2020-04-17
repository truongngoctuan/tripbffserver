import { InfographicConfig } from "../index";
import {
  sharedHeader,
  locationDetails,
  sharedLocationImage01,
  sharedLocationImage02,
} from "./shared-components";

export const config02Locations: InfographicConfig.TripInfographic = {
  width: 1280,
  height: 1500,
  backgroundColor: "#C0E2E5",

  type: "container",
  blocks: [
    sharedHeader,
    {
      type: "location",
      positioning: {
        top: 412,
        left: 97,
      },
      blocks: [
        sharedLocationImage01,
        {
          ...locationDetails,
          positioning: {
            top: -30,
            left: 625,
          },
        },
      ],
    },
    {
      type: "location",
      positioning: {
        top: 724,
        left: 630,
      },
      blocks: [
        sharedLocationImage02,
        {
          ...locationDetails,
          positioning: {
            top: 420,
            left: -450,
          },
        },
      ],
    },
  ],
};
