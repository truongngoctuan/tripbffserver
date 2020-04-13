import { Transformer } from "./typings";
import { InfographicConfig } from "../../../configs";
import _ from "lodash";

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
    return globalScale(blockConfig, option.scale);
  }
  return blockConfig;
}

function globalScale(
  blockConfig: InfographicConfig.TripBlock,
  scale: number
): InfographicConfig.TripBlock {
  blockConfig = scaleProperties(
    blockConfig,
    [
      "width",
      "height",
      // "fontSize",
      "x1",
      "y1",
      "x2",
      "y2",
      "strokeWidth",
      "x",
      "y",
      "r",
    ],
    scale
  );

  if (blockConfig["fontSize"]) {
    blockConfig["fontSize"] = parseInt(blockConfig["fontSize"].replace("px", "")) * scale + "px";
  }

  if (blockConfig["positioning"]) {
    blockConfig["positioning"] = scaleProperties(
      blockConfig["positioning"],
      ["top", "left", "right", "bottom"],
      scale
    );
  }

  return blockConfig;
}


function scaleProperties(obj, properties, scale) {
  for (let index = 0; index < properties.length; index++) {
    const prop = properties[index];
    if (obj[prop]) {
      obj[prop] = _.floor(obj[prop] * scale);
    }
  }

  return obj;
}
