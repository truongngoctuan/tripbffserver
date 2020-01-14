import { InfographicConfig } from "../../../configs/index";
import { CanvasAdaptor } from "../../utils";
import _ from "lodash";
import { getRelativePosition } from "./utils";

export async function componentCircle(
  baseFuncs: Function[],
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicConfig.CircleBlock,
  cursor
) {
  const { x, y, r, fillColor } = blockConfig;
  // const paper = canvasAdaptor.getPaper();
  const newXY = getRelativePosition(cursor, { left: x, top: y });

  canvasAdaptor.drawCircle({
    x: newXY.x,
    y: newXY.y,
    r,
    fillColor
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
