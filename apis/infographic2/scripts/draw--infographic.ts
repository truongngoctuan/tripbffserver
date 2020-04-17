import * as config01 from "../configs/01-old-design/config";
import { fullNewDesignConfig } from "../configs/02-new-design";

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
    case 2:
    case 3:
    case 4:
      return fullNewDesignConfig[numberOfLocations];
    default:
      return fullNewDesignConfig["n"];
  }
}

function getSettings(
  infographicType: INFOGRAPHIC_TYPE,
  numberOfLocations: number
): any {
  // if (
  //   infographicType == INFOGRAPHIC_TYPE.NEW_DESIGN &&
  //   numberOfLocations == 3
  // ) {
  //   return config0101.settings03Locations;
  // }
  return { scale: 1 };
}

export async function genericDraw(
  trip: Trip,
  infographicType: INFOGRAPHIC_TYPE = INFOGRAPHIC_TYPE.NEW_DESIGN
): Promise<CanvasAdaptor> {
  let config: InfographicConfig.TripInfographic;

  switch (infographicType) {
    case INFOGRAPHIC_TYPE.FIRST_RELEASED:
      config = getConfigFirstRelease(trip.locations.length);
      break;
    case INFOGRAPHIC_TYPE.NEW_DESIGN:
      config = getConfigNewDesign(trip.locations.length);
      break;
    default:
      config = getConfigNewDesign(trip.locations.length);
      break;
  }

  const settings = getSettings(infographicType, trip.locations.length);

  const canvasAdaptor = new CanvasAdaptor();
  await renderInfographic(canvasAdaptor, config, settings, trip);
  return canvasAdaptor;
}
