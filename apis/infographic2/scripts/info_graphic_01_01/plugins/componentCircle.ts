import { getRelativePosition } from "./utils";
import { RendererFunction } from "./typings";
import { InfographicRendererConfig } from "../../../configs/index.renderer";

export const componentCircle: RendererFunction = function (
  canvasAdaptor,
  blockConfig: InfographicRendererConfig.CircleBlock,
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
