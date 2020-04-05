import * as config01 from "../configs/01-old-design/config";
import * as config0101 from "../configs/02-new-design/config";

import { INFOGRAPHIC_TYPE } from "./info_graphic_type";
import { CanvasAdaptor } from "./utils";
import { renderInfographic } from "./info_graphic_01_01/generic";
import { Trip } from "./models/trip";
import { InfographicConfig } from "../configs";

export function drawFirstRelease(
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

export function draw(
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
