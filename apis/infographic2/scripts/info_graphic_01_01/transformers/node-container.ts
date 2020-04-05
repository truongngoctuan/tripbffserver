import { InfographicConfig } from "../../../configs";
import { NodeTransformer } from "./typings";
import { overrideMissingHeight } from "./dynamic-property-override";

export const nodeContainer: NodeTransformer = {
  type: "node",
  preHandler: (c) => c,
  postHandler: (c, children, cursor) => {
    const containerBlock = c as InfographicConfig.ContainerBlock;

    return {
      block: overrideMissingHeight({
        ...containerBlock,
        blocks: children,
      }),
      cursor,
    };
  },
};
