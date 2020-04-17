import { RendererFunction } from "./typings";
import { CanvasAdaptor } from "../../utils";
import { InfographicRendererConfig } from "./index.renderer";

export const componentPath: RendererFunction = function (
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicRendererConfig.PathBlock,
  cursor
) {
  const { fillColor, path } = blockConfig;
  const paper = canvasAdaptor.getPaper();
  // const newX1Y1 = getRelativePosition(cursor, { left: x1, top: y1 });
  // const newX2Y2 = getRelativePosition(cursor, { left: x2, top: y2 });
  const pathObject = new paper.Path(path);
  pathObject.style.fillColor = new paper.Color(fillColor);
  console.log(
    "path wh",
    pathObject.bounds.width + " " + pathObject.bounds.height
  );
  pathObject.position = new paper.Point(
    pathObject.position.x + cursor.x,
    pathObject.position.y + cursor.y
  );

  return cursor;
};
