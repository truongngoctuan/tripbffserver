import { InfographicConfig } from "../../../configs";

export type Transformer = NodeTransformer | LeafTransformer;

export type NodeTransformer = {
  type: "node";
  // focus on transform original tree/node to a more detailed tree/node
  preHandler: (
    c: InfographicConfig.TripBlock,
    trip
  ) => InfographicConfig.TripBlock;
  // transform current node, update cursor (currently only location idx)
  postHandler: (
    c: InfographicConfig.TripBlock,
    processedChildren: InfographicConfig.Block[],
    cursor: CursorTransformer
  ) => { block: InfographicConfig.Block; cursor: CursorTransformer };
};

export type LeafTransformer = {
  type: "leaf";
  handler: (
    c: InfographicConfig.TripBlock,
    trip,
    cursor
  ) => InfographicConfig.Block;
};

export type CursorTransformer = {
  level: number;
  location: number;
};
