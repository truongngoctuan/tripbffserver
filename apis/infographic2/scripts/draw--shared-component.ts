import * as config01 from "../configs/01-old-design/config";
import * as config0101 from "../configs/02-new-design/config";

import { INFOGRAPHIC_TYPE } from "./info_graphic_type";
import { CanvasAdaptor } from "./utils";
import { renderInfographic } from "./info_graphic_01_01/generic";
import { Trip } from "./models/trip";
import { InfographicConfig } from "../configs";

function getConfigFirstRelease(
  numberOfLocations: number
): InfographicConfig.TripInfographic {
  switch (numberOfLocations) {
    case 1:
      return config01.config01Location;
    case 2:
      return config01.config02Locations;
    default:
      return config01.configNLocations;
  }
}

function getConfigNewDesign(
  numberOfLocations: number
): InfographicConfig.TripInfographic {
  switch (numberOfLocations) {
    case 1:
      return config0101.config01Location;
    case 2:
      return config0101.config02Locations;
    default:
      return config0101.configNLocations;
  }
}

function getSettings(
  infographicType: INFOGRAPHIC_TYPE,
  numberOfLocations: number
): any {
  if (
    infographicType == INFOGRAPHIC_TYPE.NEW_DESIGN &&
    numberOfLocations == 3
  ) {
    return config0101.settings03Locations;
  }
  return {};
}

export async function componentDraw(
  trip: Trip,
  componentConfig: InfographicConfig.TripBlock,
  componentSetting: any = {},
): Promise<CanvasAdaptor> {
  const infoConfig: InfographicConfig.TripInfographic = {
    width: 960,
    // height: 3000,
    backgroundColor: "#C0E2E5",

    type: "container",
    flex: "column",
    blocks: [{
      ...componentConfig,
      ...componentSetting
    }],
  };

  const canvasAdaptor = new CanvasAdaptor();
  await renderInfographic(canvasAdaptor, infoConfig, {}, trip);
  return canvasAdaptor;
}
