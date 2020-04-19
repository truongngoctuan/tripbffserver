import { getRelativePosition } from "./utils";
import { RendererFunction } from "./typings";
import _ from "lodash";
import { CanvasAdaptor } from "../../utils";
import { InfographicRendererConfig } from "./index.renderer";

export const componentText: RendererFunction = function (
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicRendererConfig.TextBlock,
  cursor
) {
  const paper = canvasAdaptor.getPaper();

  const newCursor = renderTextBlock(
    canvasAdaptor,
    blockConfig,
    blockConfig.text,
    cursor
  );

  return newCursor;
};

function renderTextBlock(
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicRendererConfig.TextBlock,
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
    numberOfLines: blockConfig.numberOfLines
    // wrapNumber: w - paddingLeftRight
  });

  const locationNameNodeBbox = locationNameNode.bounds;

  return _.assign({}, cursor, { y: cursor.y + locationNameNodeBbox.height });
}
