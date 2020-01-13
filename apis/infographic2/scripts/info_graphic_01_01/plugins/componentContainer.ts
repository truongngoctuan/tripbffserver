import { InfographicConfig } from "../../../configs/index";
import { CanvasAdaptor } from "../../utils";
const _ = require("lodash");

export function componentContainer(
  baseFuncs: Function[],
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicConfig.ContainerBlock,
  cursor
) {
  const paper = canvasAdaptor.getPaper();

  const rect = new paper.Shape.Rectangle(
    new paper.Point(0, 0),
    new paper.Size(100, 200)
  );
  rect.strokeColor = new paper.Color("#0f0");

  // // console.log("backgroundColor", blockConfig);
  // const { backgroundColor } = blockConfig;
  // if (backgroundColor) {
  //   // console.log("backgroundColor", backgroundColor);
  //   const { x, y, width, height } = cursor;
  //   console.log(`cursor${x} ${y} ${width} ${height}`);

  //   //todo use fillColor in the current layer
  //   canvasAdaptor.drawRect({
  //     x,
  //     y,
  //     width,
  //     height,
  //     backgroundColor
  //   });
  // }

  if (_.isEmpty(baseFuncs)) return;

  const lastBaseFunc = baseFuncs[baseFuncs.length - 1];
  lastBaseFunc(
    baseFuncs.slice(0, baseFuncs.length - 1),
    canvasAdaptor,
    blockConfig,
    cursor
  );
}
