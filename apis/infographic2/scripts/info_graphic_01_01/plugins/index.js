const { backgroundColor } = require("./backgroundColor");
const { componentContainer } = require("./componentContainer");
const { componentText } = require("./componentText");

const _ = require("lodash");

const PLUGINS = {
  componentContainer: "componentContainer",
  componentText: "componentText",
  backgroundColor: "backgroundColor"
};

const plugins = {
  componentContainer,
  componentText,
  backgroundColor
};

const registeredPlugins = {
  container: [PLUGINS.componentContainer, PLUGINS.backgroundColor],
  location: [PLUGINS.componentContainer],
  text: [PLUGINS.componentText]
};

function executePlugins(blockType, canvasAdaptor, blockConfig, cursor, trip) {
  let baseFuncs = [];
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
}

module.exports = {
  executePlugins,
  plugins
};
