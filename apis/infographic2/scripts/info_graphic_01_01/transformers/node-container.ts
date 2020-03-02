import { InfographicConfig } from "../../../configs";
import { NodeTransformer } from "./typings";
import { overrideMissingHeight } from "./dynamic-property-override";

export const nodeContainer: NodeTransformer = {
  type: "node",
  preHandler: (c: InfographicConfig.Block) => c,
  postHandler: (
    c: InfographicConfig.Block,
    children: InfographicConfig.Block[]
  ) => {
    const containerBlock = c as InfographicConfig.ContainerBlock;

    return overrideMissingHeight({
      ...containerBlock,
      blocks: children
    });
  }
}