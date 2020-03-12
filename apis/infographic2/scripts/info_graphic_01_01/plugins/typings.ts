import { Cursor } from "../typings";
import { CanvasAdaptor } from "../../utils";

export type Renderer = {
  type: "node" | "leaf";
  handler: RendererFunction;
};

export type RendererFunction = (
  canvasAdaptor: CanvasAdaptor,
  blockConfig,
  cursor: Cursor
) => Cursor;
