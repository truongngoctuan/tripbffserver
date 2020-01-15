import { InfographicConfig } from "../../../configs/index";
import { CanvasAdaptor } from "../../utils";
const _ = require("lodash");

const strokeColorByLevel = {
  1: "green",
  2: "red",
  3: "blue",
  4: "green"
};
export async function componentContainer(
  baseFuncs: Function[],
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicConfig.ContainerBlock,
  cursor
) {
  const { width, height } = blockConfig;

  const paper = canvasAdaptor.getPaper();

  const rectOuter = new paper.Shape.Rectangle(
    new paper.Point(cursor.x, cursor.y),
    new paper.Size(
      width ? width : cursor.width,
      height ? height : cursor.height
    )
  );
  rectOuter.strokeColor = new paper.Color(strokeColorByLevel[cursor.level]);
  rectOuter.strokeWidth = 5;

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
  // console.log("cursor", cursor);
  // console.log("newBounds", newBounds);

  const rect = new paper.Shape.Rectangle(
    new paper.Point(newBounds.x, newBounds.y),
    new paper.Size(newBounds.width, newBounds.height)
  );
  rect.strokeColor = new paper.Color(strokeColorByLevel[cursor.level]);
  rect.strokeWidth = 1;

  if (_.isEmpty(baseFuncs)) return _.assign({}, cursor, newBounds);

  const lastBaseFunc = baseFuncs[baseFuncs.length - 1];
  return lastBaseFunc(
    baseFuncs.slice(0, baseFuncs.length - 1),
    canvasAdaptor,
    blockConfig,
    _.assign({}, cursor, newBounds)
  );
}

function getRelativeBounds(bounds, positioning) {
  var x = bounds.x;
  var y = bounds.y;
  var width = bounds.width;
  var height = bounds.height;

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
