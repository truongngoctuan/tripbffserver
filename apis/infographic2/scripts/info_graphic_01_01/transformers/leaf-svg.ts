import { LeafTransformer } from "./typings";
import { scaleBlock } from "../utils";
import { InfographicRendererConfig } from "../plugins/index.renderer";

export const leafSVG: LeafTransformer = {
  type: "leaf",
  handler: (c, trip, cursor) => {
    return {
      ...scaleBlock(c, cursor.scale),
      scale: cursor.scale,
    } as InfographicRendererConfig.Block;
  },
};
