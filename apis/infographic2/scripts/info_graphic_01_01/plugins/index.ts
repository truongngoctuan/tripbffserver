import { componentContainer } from "./componentContainer";
import { componentText } from "./componentText";
import { componentLine } from "./componentLine";
import { componentCircle } from "./componentCircle";
import { componentPath } from "./componentPath";

import { Cursor } from "../typings";
import { Renderer } from "./typings";

import _ from "lodash";
import { CanvasAdaptor } from "../../utils";
import { componentSVG } from "./componentSVG";

const registeredPlugins: { [id: string]: Renderer } = {
  container: {
    type: "node",
    handler: componentContainer
  },
  location: {
    type: "leaf",
    handler: componentContainer
  },
  text: {
    type: "leaf",
    handler: componentText
  },
  line: {
    type: "leaf",
    handler: componentLine
  },
  circle: {
    type: "leaf",
    handler: componentCircle
  },
  path: {
    type: "leaf",
    handler: componentPath
  },
  svg: {
    type: "leaf",
    handler: componentSVG
  },
};

export async function executePlugins(
  blockType,
  canvasAdaptor: CanvasAdaptor,
  blockConfig,
  cursor: Cursor
): Promise<Cursor> {
  const blockPlugins = registeredPlugins[blockType];
  // console.log(blockPlugins);
  if (!_.isEmpty(blockPlugins)) {
    return blockPlugins.handler(
      canvasAdaptor,
      blockConfig,
      cursor
    );
  }

  return cursor;
}
