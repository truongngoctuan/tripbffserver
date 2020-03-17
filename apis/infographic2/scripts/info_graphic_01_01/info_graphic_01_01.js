const globalInfographic01Config = require("../../configs/info_graphic_01_01/config2");
const renderer = require("./generic");

var globalConfig = globalInfographic01Config.config_01_01;

module.exports = {
  draw: async (canvasAdaptor, trip) => {
    await renderer.renderInfographic(canvasAdaptor, globalConfig, trip);
  }
};
