import { InfographicConfig } from "../../../configs/index";
import { RendererFunction } from "./typings";
import { backgroundColor } from "./backgroundColor";
import _ from "lodash";

const strokeColorByLevel = {
  1: "green",
  2: "red",
  3: "blue",
  4: "green"
};
export const componentContainer: RendererFunction = function(
  canvasAdaptor,
  blockConfig: InfographicConfig.ContainerBlock,
  cursor
) {
  const { width, height } = blockConfig;

  const paper = canvasAdaptor.getPaper();

  // const rectOuter = new paper.Shape.Rectangle(
  //   new paper.Point(cursor.x, cursor.y),
  //   new paper.Size(
  //     width ? width : cursor.width,
  //     height ? height : cursor.height
  //   )
  // );
  // rectOuter.strokeColor = new paper.Color(strokeColorByLevel[cursor.level]);
  // rectOuter.strokeWidth = 2 * (cursor.level + 1);

  let newBounds = {
    x: cursor.x,
    y: cursor.y,
    width: width ? width : cursor.width,
    height: height ? height : cursor.height
  };

  if (blockConfig.positioning) {
    newBounds = getRelativeBounds(newBounds, blockConfig.positioning);
    // console.log("newXY", newXY)
  }
  // console.log("cursor container", cursor);
  // console.log("newBounds", newBounds);

  // const rect = new paper.Shape.Rectangle(
  //   new paper.Point(newBounds.x, newBounds.y),
  //   new paper.Size(newBounds.width, newBounds.height)
  // );
  // rect.strokeColor = new paper.Color(strokeColorByLevel[cursor.level]);
  // rect.strokeWidth = 1;

  return backgroundColor(
    canvasAdaptor,
    blockConfig,
    _.assign({}, cursor, newBounds)
  );
};

function getRelativeBounds(bounds, positioning) {
  let x = bounds.x;
  let y = bounds.y;
  let width = bounds.width;
  let height = bounds.height;

  if (!positioning) return { x, y, width, height };

  if (positioning.left) {
    x = x + positioning.left;
    width -= positioning.left;
  }
  if (positioning.right) {
    x = x + bounds.width - positioning.right;
  }

  if (positioning.top) {
    y = y + positioning.top;
  }
  if (positioning.bottom) {
    y = bounds.height - positioning.bottom;
  }

  return { x, y, width, height };
}
