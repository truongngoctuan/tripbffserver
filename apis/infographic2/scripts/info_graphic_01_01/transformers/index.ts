import { InfographicConfig } from "../../../configs";
import _ from "lodash"

export function overrideMissingHeight(
  c: InfographicConfig.Block
): InfographicConfig.Block {
  const containerBlock = c as InfographicConfig.ContainerBlock;
  if (!containerBlock.height) {
    return {
      ...containerBlock,
      height: _.sum(
        _.map(containerBlock.blocks, child => (child["height"] ? child["height"] : 0))
      )
    }
  }

  return c;
}
