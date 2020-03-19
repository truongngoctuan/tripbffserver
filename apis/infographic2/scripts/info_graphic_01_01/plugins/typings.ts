import { Cursor } from "../typings";
import { CanvasAdaptor } from "../../utils";

export type Renderer = {
  type: "node" | "leaf";
  handler: RendererFunction | RendererAsyncFunction;
};

export type RendererFunction = (
  canvasAdaptor: CanvasAdaptor,
  blockConfig,
  cursor: Cursor
) => Cursor;

export type RendererAsyncFunction = (
  canvasAdaptor: CanvasAdaptor,
  blockConfig,
  cursor: Cursor
) => Promise<Cursor>;
