const draw_01_01 = require("./info_graphic_01/info_graphic_01_01");
const draw_01_02 = require("./info_graphic_01/info_graphic_01_02");
const draw_01_others = require("./info_graphic_01/info_graphic_01_others");
const { INFOGRAPHIC_TYPE } = require("./info_graphic_type");
const { CanvasAdaptor } = require("./utils");

async function draw(trip, infographicType) {
  let numberOfLocations = trip.locations.length;
  let canvasAdaptor = new CanvasAdaptor();
  if (infographicType == INFOGRAPHIC_TYPE.FIRST_RELEASED) {
    if (numberOfLocations == 1) {
      await draw_01_01.draw(canvasAdaptor, trip);
    } else if (numberOfLocations == 2) {
      await draw_01_02.draw(canvasAdaptor, trip);
    } else {
      await draw_01_others.draw(canvasAdaptor, trip);
    }
  }

  return canvasAdaptor;
}

module.exports = {
  draw
};
