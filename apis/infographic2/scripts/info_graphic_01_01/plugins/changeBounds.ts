import { InfographicConfig } from "../../../configs/index";

export function backgroundColor(
  canvasAdaptor,
  blockConfig, //: InfographicConfig.,
  cursor
) {
  // console.log("backgroundColor", blockConfig);
  const { backgroundColor } = blockConfig;
  if (backgroundColor) {
    // console.log("backgroundColor", backgroundColor);
    const { x, y, width, height } = cursor;
    canvasAdaptor.drawRect({
      x,
      y,
      width,
      height,
      backgroundColor
    });
  }
}
