import _ from "lodash";

export function scaleBlock<T>(
  blockConfig: T,
  scale: number
): T {
  blockConfig = scaleProperties(
    blockConfig,
    [
      "width",
      "height",
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
    blockConfig["fontSize"] =
      parseInt(blockConfig["fontSize"].replace("px", "")) * scale + "px";
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
