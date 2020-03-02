
import { InfographicConfig } from "../../../configs";

export type Transformer = NodeTransformer | LeafTransformer;

export type NodeTransformer = {
  type: "node";
  preHandler: (c: InfographicConfig.Block) => InfographicConfig.Block;
  postHandler: (
    c: InfographicConfig.Block,
    children: InfographicConfig.Block[]
  ) => InfographicConfig.Block;
};

export type LeafTransformer = {
  type: "leaf";
  handler: (c: InfographicConfig.Block, trip, cursor) => InfographicConfig.Block;
};

export type CursorTransformer = {
  level: number;
  location: number;
}