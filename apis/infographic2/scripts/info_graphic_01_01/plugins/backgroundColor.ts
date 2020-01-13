import { InfographicConfig } from "../../../configs/index";
const _ = require("lodash");

export function backgroundColor(baseFuncs: Function[],
  canvasAdaptor,
  blockConfig: InfographicConfig.Background,
  cursor
) {
  // console.log("backgroundColor", blockConfig);
  const { backgroundColor } = blockConfig;
  if (backgroundColor) {
    // console.log("backgroundColor", backgroundColor);
    const { x, y, width, height } = cursor;
    console.log(`cursor${x} ${y} ${width} ${height}`);

    //todo use fillColor in the current layer
    canvasAdaptor.drawRect({
      x,
      y,
      width,
      height,
      backgroundColor
    });
  }

  if (_.isEmpty(baseFuncs)) return;

  const lastBaseFunc = baseFuncs[baseFuncs.length - 1];
  lastBaseFunc(baseFuncs.slice(0, baseFuncs.length - 1), canvasAdaptor, blockConfig, cursor);
}
