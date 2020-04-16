import { InfographicConfig } from "../../../configs/index";
import { getRelativePosition } from "./utils";
import { RendererFunction } from "./typings";
import { scaleBlock } from "../utils";
import { Cursor } from "../typings";

export const componentCircle: RendererFunction = function (
  canvasAdaptor,
  blockConfig: InfographicConfig.CircleBlock,
  cursor
) {
  const { x, y, r, fillColor } = scaleBlock(blockConfig, cursor.scale);
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
