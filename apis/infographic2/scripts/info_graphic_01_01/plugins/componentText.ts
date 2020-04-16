import { InfographicConfig } from "../../../configs/index";
import { getRelativePosition } from "./utils";
import { RendererFunction } from "./typings";
import _ from "lodash";
import { CanvasAdaptor } from "../../utils";
import { scaleBlock } from "../utils";

export const componentText: RendererFunction = function (
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicConfig.TextBlock,
  cursor
) {
  const paper = canvasAdaptor.getPaper();

  const newCursor = renderTextBlock(
    canvasAdaptor,
    scaleBlock(blockConfig, cursor.scale),
    blockConfig.text,
    cursor
  );

  return newCursor;
};

function renderTextBlock(
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicConfig.TextBlock,
  text: string,
  cursor
) {
  const relativePosition = getRelativePosition(cursor, blockConfig.positioning);
  if (blockConfig.textAnchor === "middle") {
    relativePosition.x = relativePosition.x + cursor.width / 2;
  }

  const locationNameNode = canvasAdaptor.drawText(text, relativePosition, {
    color: blockConfig.color,
    font: blockConfig.fontFamily,
    fontSize: blockConfig.fontSize,
    fontWeight: blockConfig.fontWeight,
    textAnchor: blockConfig.textAnchor,
    textTransform: blockConfig.textTransform,
    wrapNumber: blockConfig.width,
    // wrapNumber: w - paddingLeftRight
  });

  const locationNameNodeBbox = locationNameNode.bounds;

  return _.assign({}, cursor, { y: cursor.y + locationNameNodeBbox.height });
}
