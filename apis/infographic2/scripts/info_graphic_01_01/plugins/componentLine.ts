import { InfographicConfig } from "../../../configs/index";
import _ from "lodash";
import { getRelativePosition } from "./utils";
import { RendererFunction } from "./typings";

export const componentLine: RendererFunction = function (
  canvasAdaptor,
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
    strokeWidth,
  });

  return cursor;
};
