import * as config01 from "../configs/info_graphic_01_01/config";
import * as config0101 from "../configs/info_graphic_01_01/config2";

import { INFOGRAPHIC_TYPE } from "./info_graphic_type";
import { CanvasAdaptor } from "./utils";
import { renderInfographic } from "./info_graphic_01_01/generic";
import { Trip } from "./models/trip";
import { InfographicConfig } from "../configs";

export function drawFirstRelease(
  numberOfLocations: number
): InfographicConfig.TripInfographic {
  if (numberOfLocations == 1) {
    return config01.config_01_01;
  } else if (numberOfLocations == 2) {
    return config01.config_01_02;
  }
  return config01.config_01_others;
}

export function draw(
  numberOfLocations: number
): InfographicConfig.TripInfographic {
  if (numberOfLocations == 1) {
    return config0101.config_01_01;
  }

  if (numberOfLocations == 2) {
    return config0101.config_01_02;
  }

  return config0101.config_01_02;
}

export async function genericDraw(
  trip: Trip,
  infographicType: INFOGRAPHIC_TYPE = INFOGRAPHIC_TYPE.NEW_DESIGN
): Promise<CanvasAdaptor> {
  let config: InfographicConfig.TripInfographic;

  switch (infographicType) {
    case INFOGRAPHIC_TYPE.FIRST_RELEASED:
      config = drawFirstRelease(trip.locations.length);
      break;
    case INFOGRAPHIC_TYPE.NEW_DESIGN:
      config = draw(trip.locations.length);
      break;
    default:
      config = draw(trip.locations.length);
      break;
  }

  const canvasAdaptor = new CanvasAdaptor();
  await renderInfographic(
    canvasAdaptor,
    config as InfographicConfig.ContainerBlock,
    trip
  );
  return canvasAdaptor;
}
