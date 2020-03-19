import { InfographicConfig } from "../../../configs/index";
import _ from "lodash";
import { getRelativePosition, getRelativePositionPoint } from "./utils";
import { RendererAsyncFunction } from "./typings";
import { CanvasAdaptor } from "../../utils";
import fs from "fs";

export const componentSVG: RendererAsyncFunction = async function(
  canvasAdaptor: CanvasAdaptor,
  b: InfographicConfig.SvgBlock,
  cursor
) {
  const { url, shadowOffset, shadowColor, shadowBlur } = b;
  const paper = canvasAdaptor.getPaper();
  const item = new paper.Item();

  const fileString = loadLocalFile(url);

  const item2 = item.importSVG(fileString, {
    onLoad: () => {
      console.log("load svg completed");
    },
    onError: err => {
      console.log("error on load svg file", err);
    }
  });

  const g = new paper.Group([item2]);
  var relativePosition = getRelativePosition(cursor, b.positioning);
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
  var bitmap = fs.readFileSync(file);
  return bitmap.toString();
}
