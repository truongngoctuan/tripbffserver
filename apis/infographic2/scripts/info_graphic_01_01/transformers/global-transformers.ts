import { Transformer } from "./typings";
import { InfographicConfig } from "../../../configs";
import _ from "lodash";
import { scaleBlock } from "../utils";

// const globalTransformers: { node: Transformer[]; leaf: Transformer[] } = {
//   node: [globalScale],
//   leaf: []globalScale,
// };

export function applyGlobalTransform(
  block: InfographicConfig.TripBlock,
  option: { scale: number }
): InfographicConfig.TripBlock {
  if (!_.isEmpty((block as InfographicConfig.ContainerBlock).blocks)) {
    const processedBlocks: InfographicConfig.TripBlock[] = [];

    const childrenBlocks = (block as InfographicConfig.ContainerBlock).blocks;

    for (let i = 0; i < childrenBlocks.length; i++) {
      const childBlock = childrenBlocks[i];
      processedBlocks.push(applyGlobalTransform(childBlock, option));
    }

    return {
      ...internalProcessBlock(block, option),
      blocks: processedBlocks,
    } as InfographicConfig.TripBlock;
  }

  return internalProcessBlock(block, option);
}

function internalProcessBlock(
  blockConfig: InfographicConfig.TripBlock,
  option: { scale: number }
) {
  if (option.scale) {
    return scaleBlock(blockConfig, option.scale);
  }
  return blockConfig;
}