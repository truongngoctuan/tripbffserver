const { backgroundColor } = require("./backgroundColor");
const { componentContainer } = require("./componentContainer");

const _ = require("lodash");

const PLUGINS = {
  componentContainer: "componentContainer"
  // backgroundColor: "backgroundColor"
};

const plugins = {
  componentContainer,
  backgroundColor
};

const registeredPlugins = {
  container: [PLUGINS.componentContainer, PLUGINS.backgroundColor],
  location: [PLUGINS.componentContainer]
};

function executePlugins(blockType, canvasAdaptor, blockConfig, cursor) {
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
      cursor
    );
  }
}

module.exports = {
  executePlugins,
  plugins
};
