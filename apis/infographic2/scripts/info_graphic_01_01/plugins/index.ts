import { backgroundColor } from "./backgroundColor";
import { componentContainer } from "./componentContainer";
import { componentText } from "./componentText";
import { componentLine } from "./componentLine";
import { componentCircle } from "./componentCircle";

import { Cursor } from "../typings";

import _ from "lodash";

const PLUGINS = {
  componentContainer: "componentContainer",
  componentText: "componentText",
  componentLine: "componentLine",
  componentCircle: "componentCircle",
  backgroundColor: "backgroundColor"
};

const plugins = {
  componentContainer,
  componentText,
  componentLine,
  componentCircle,
  backgroundColor
};

const registeredPlugins = {
  container: [PLUGINS.componentContainer, PLUGINS.backgroundColor],
  location: [PLUGINS.componentContainer],
  text: [PLUGINS.componentText],
  line: [PLUGINS.componentLine],
  circle: [PLUGINS.componentCircle]
};

type execFunc = (blockType, canvasAdaptor, blockConfig, cursor, trip) => Cursor;
function executePlugins(blockType, canvasAdaptor, blockConfig, cursor, trip): Cursor {
  let baseFuncs: execFunc[] = [];
  const blockPlugins = registeredPlugins[blockType];
  // console.log(blockPlugins);
  if (!_.isEmpty(blockPlugins)) {
    for (let index = 0; index < blockPlugins.length; index++) {
      const blockPlugin = blockPlugins[index];
      const plugin = plugins[blockPlugin];

      // console.log(plugin)
      if (_.isFunction(plugin)) {
        baseFuncs.push(plugin);
      }
    }

    const lastBaseFunc = baseFuncs[baseFuncs.length - 1];
    return lastBaseFunc(
      baseFuncs.slice(0, baseFuncs.length - 1),
      canvasAdaptor,
      blockConfig,
      cursor,
      trip
    );
  }

  return cursor;
}

module.exports = {
  executePlugins,
  plugins
};
