import _ from "lodash";
import { getRelativePosition } from "./utils";
import { RendererAsyncFunction } from "./typings";
import { CanvasAdaptor } from "../../utils";
import fs from "fs";
import { InfographicRendererConfig } from "./index.renderer";

export const componentSVG: RendererAsyncFunction = async function (
  canvasAdaptor: CanvasAdaptor,
  b: InfographicRendererConfig.SvgBlock,
  cursor
) {
  const { url, shadowOffset, shadowColor, shadowBlur, scale } = 
    b;
  const paper = canvasAdaptor.getPaper();
  const item = new paper.Item();

  const fileString = loadLocalFile(url);

  const item2 = item.importSVG(fileString, {
    onLoad: () => {
      console.log("load svg completed");
    },
    onError: (err) => {
      console.log("error on load svg file", err);
    },
  });
  item2.scale(scale, new paper.Point(0, 0));

  const g = new paper.Group([item2]);
  const relativePosition = getRelativePosition(cursor, b.positioning);
  item2.position = new paper.Point(
    item2.position.x + relativePosition.x,
    item2.position.y + relativePosition.y
  );
  console.log("svg wh", item2.bounds.width + " " + item2.bounds.height);

  if (shadowColor) {
    item2.shadowColor = new paper.Color(shadowColor);
  }
  if (shadowOffset) {
    item2.shadowOffset = new paper.Point(shadowOffset.x, shadowOffset.y);
  }
  if (shadowBlur) {
    item2.shadowBlur = shadowBlur;
  }

  return cursor;
};

function loadLocalFile(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  return bitmap.toString();
}
