import { InfographicConfig } from "../../../configs";
import { LeafTransformer } from "./typings";
import { scaleBlock } from "../utils";

export const leafDefault: LeafTransformer = {
  type: "leaf",
  handler: (c, trip, cursor) => {
    return scaleBlock(c, cursor.scale) as InfographicConfig.Block;
  },
};
