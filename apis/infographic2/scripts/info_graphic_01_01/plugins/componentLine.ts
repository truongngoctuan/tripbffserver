import { InfographicConfig } from "../../../configs/index";
import { CanvasAdaptor } from "../../utils";
import _ from "lodash";
import { getRelativePosition } from "./utils";

export async function componentLine(
  baseFuncs: Function[],
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicConfig.LineBlock,
  cursor
) {
  const { x1, y1, x2, y2, strokeColor, strokeWidth } = blockConfig;
  // const paper = canvasAdaptor.getPaper();
  const newX1Y1 = getRelativePosition(cursor, { left: x1, top: y1 });
  const newX2Y2 = getRelativePosition(cursor, { left: x2, top: y2 });

  canvasAdaptor.drawLine({
    x1: newX1Y1.x,
    y1: newX1Y1.y,
    x2: newX2Y2.x,
    y2: newX2Y2.y,
    strokeColor,
    strokeWidth
  });

  if (_.isEmpty(baseFuncs)) return cursor;

  const lastBaseFunc = baseFuncs[baseFuncs.length - 1];
  return lastBaseFunc(
    baseFuncs.slice(0, baseFuncs.length - 1),
    canvasAdaptor,
    blockConfig,
    cursor
  );
}
