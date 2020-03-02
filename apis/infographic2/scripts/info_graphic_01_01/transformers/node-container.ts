import { InfographicConfig } from "../../../configs";
import { NodeTransformer, CursorTransformer } from "./typings";
import { overrideMissingHeight } from "./dynamic-property-override";

export const nodeContainer: NodeTransformer = {
  type: "node",
  preHandler: (c: InfographicConfig.Block) => c,
  postHandler: (
    c: InfographicConfig.Block,
    children: InfographicConfig.Block[],
    cursor: CursorTransformer
  ) => {
    const containerBlock = c as InfographicConfig.ContainerBlock;

    return {
      block: overrideMissingHeight({
        ...containerBlock,
        blocks: children
      }),
      cursor
    };
  }
};
