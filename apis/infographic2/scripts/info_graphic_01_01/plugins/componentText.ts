import { InfographicConfig } from "../../../configs/index";
import { CanvasAdaptor } from "../../utils";
import { getRelativePosition } from "./utils";
const commonFunc = require("../../commonFunc");
const _ = require("lodash");

export async function componentText(
  baseFuncs: Function[],
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicConfig.TextBlock,
  cursor,
  trip
) {
  const paper = canvasAdaptor.getPaper();

  const newCursor = renderTextBlock(canvasAdaptor, blockConfig, blockConfig.text, cursor);

  if (_.isEmpty(baseFuncs)) return newCursor;

  const lastBaseFunc = baseFuncs[baseFuncs.length - 1];
  return lastBaseFunc(
    baseFuncs.slice(0, baseFuncs.length - 1),
    canvasAdaptor,
    blockConfig,
    newCursor
  );
}
function renderTextBlock(
  canvasAdaptor,
  blockConfig: InfographicConfig.TextBlock,
  text: string,
  cursor
) {
  var relativePosition = getRelativePosition(cursor, blockConfig.positioning);
  if (blockConfig.textAnchor === "middle") {
    relativePosition.x = relativePosition.x + cursor.width / 2;
  }

  let locationNameNode = canvasAdaptor.drawText(text, relativePosition, {
    color: blockConfig.color,
    font: blockConfig.fontFamily,
    fontSize: blockConfig.fontSize,
    fontWeight: blockConfig.fontWeight,
    textAnchor: blockConfig.textAnchor,
    textTransform: blockConfig.textTransform,
    wrapNumber: blockConfig.width
    // wrapNumber: w - paddingLeftRight
  });

  let locationNameNodeBbox = locationNameNode.bounds;

  return _.assign({}, cursor, { y: cursor.y + locationNameNodeBbox.height });
}