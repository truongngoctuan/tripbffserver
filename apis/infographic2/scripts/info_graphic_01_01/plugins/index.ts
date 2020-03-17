import { componentContainer } from "./componentContainer";
import { componentText } from "./componentText";
import { componentLine } from "./componentLine";
import { componentCircle } from "./componentCircle";
import { componentPath } from "./componentPath";

import { Cursor } from "../typings";
import { Renderer } from "./typings";

import _ from "lodash";
import { CanvasAdaptor } from "../../utils";

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
};

export function executePlugins(
  blockType,
  canvasAdaptor: CanvasAdaptor,
  blockConfig,
  cursor: Cursor
): Cursor {
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
