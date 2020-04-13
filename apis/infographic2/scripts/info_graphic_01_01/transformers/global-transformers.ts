import { Transformer } from "./typings";
import { InfographicConfig } from "../../../configs";
import _ from "lodash";

// const globalTransformers: { node: Transformer[]; leaf: Transformer[] } = {
//   node: [globalScale],
//   leaf: []globalScale,
// };

export function applyGlobalTransform(
  blockConfig: InfographicConfig.TripBlock,
  option: { scale: number }
): InfographicConfig.TripBlock {
  if (option.scale) {
    return globalScale(blockConfig, option.scale);
  }
  return blockConfig;
}

function globalScale(
  blockConfig: InfographicConfig.TripBlock,
  scale: number
): InfographicConfig.TripBlock {
  blockConfig["width"] = scaleProperty(blockConfig["width"], scale);
  blockConfig["height"] = scaleProperty(blockConfig["height"], scale);
  if (blockConfig["positioning"]) {
    blockConfig["top"] = scaleProperty(blockConfig["top"], scale);
    blockConfig["left"] = scaleProperty(blockConfig["left"], scale);
    blockConfig["right"] = scaleProperty(blockConfig["right"], scale);
    blockConfig["bottom"] = scaleProperty(blockConfig["bottom"], scale);
  }

  blockConfig["fontSize"] = scaleProperty(blockConfig["bottom"], scale);

  blockConfig["x1"] = scaleProperty(blockConfig["x1"], scale);
  blockConfig["y1"] = scaleProperty(blockConfig["y1"], scale);
  blockConfig["x2"] = scaleProperty(blockConfig["x2"], scale);
  blockConfig["y2"] = scaleProperty(blockConfig["y2"], scale);
  blockConfig["strokeWidth"] = scaleProperty(blockConfig["strokeWidth"], scale);

  blockConfig["x"] = scaleProperty(blockConfig["x"], scale);
  blockConfig["y"] = scaleProperty(blockConfig["y"], scale);
  blockConfig["r"] = scaleProperty(blockConfig["r"], scale);

  return blockConfig;
}

function scaleProperty(propertyValue, scale) {
  return propertyValue ? _.floor(propertyValue * scale) : propertyValue;
}
