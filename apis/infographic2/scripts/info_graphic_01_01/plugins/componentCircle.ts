import { InfographicConfig } from "../../../configs/index";
import { getRelativePosition } from "./utils";
import { RendererFunction } from "./typings";

export const componentCircle: RendererFunction = function (
  canvasAdaptor,
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
    fillColor,
  });

  return cursor;
};
