import { CanvasAdaptor } from "./utils";
import { renderInfographic } from "./info_graphic_01_01/generic";
import { Trip } from "./models/trip";
import { InfographicConfig } from "../configs";

export async function componentDraw(
  trip: Trip,
  infoConfig: InfographicConfig.TripInfographic
): Promise<CanvasAdaptor> {
  const canvasAdaptor = new CanvasAdaptor();
  await renderInfographic(canvasAdaptor, infoConfig, { scale : 1 }, trip);
  return canvasAdaptor;
}
