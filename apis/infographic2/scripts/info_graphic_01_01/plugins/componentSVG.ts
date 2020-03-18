import { InfographicConfig } from "../../../configs/index";
import _ from "lodash";
import { getRelativePosition } from "./utils";
import { RendererAsyncFunction } from "./typings";
import { CanvasAdaptor } from "../../utils";
import fs from "fs";

export const componentSVG: RendererAsyncFunction = async function(
  canvasAdaptor: CanvasAdaptor,
  b: InfographicConfig.SvgBlock,
  cursor
) {
  const { url } = b;
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
  g.position = new paper.Point(
    cursor.x + item2.position.x,
    cursor.y + item2.position.y
  );
  console.log("svg wh", item2.bounds.width + " " + item2.bounds.height)
  return cursor;
};

function loadLocalFile(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  return bitmap.toString();
}
