import { RendererFunction } from "./typings";
import { InfographicRendererConfig } from "../../../configs/index.renderer";

export const backgroundColor: RendererFunction = function (
  canvasAdaptor,
  blockConfig: InfographicRendererConfig.Background,
  cursor
) {
  // console.log("backgroundColor", blockConfig);
  const { backgroundColor } = blockConfig;
  if (backgroundColor) {
    // console.log("backgroundColor", backgroundColor);
    const { x, y, width, height } = cursor;
    console.log(`cursor background ${x} ${y} ${width} ${height}`);

    //todo use fillColor in the current layer
    canvasAdaptor.drawRect({
      x,
      y,
      width,
      height,
      backgroundColor,
    });
  }

  return cursor;
};
