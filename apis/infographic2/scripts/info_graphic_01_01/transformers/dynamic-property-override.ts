import { InfographicConfig } from "../../../configs";
import _ from "lodash";

export function overrideMissingHeight(
  c: InfographicConfig.Block
): InfographicConfig.Block {
  const containerBlock = c as InfographicConfig.ContainerBlock;
  if (!containerBlock.height) {
    const height =
      containerBlock.flex == "column"
        ? _.sum(
            _.map(containerBlock.blocks, (child) =>
              child["height"] ? child["height"] : 0
            )
          )
        : 0;

    return {
      ...containerBlock,
      height,
    };
  }

  return c;
}
