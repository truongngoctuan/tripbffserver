import { InfographicConfig } from "../../configs";
import { CanvasAdaptor } from "../utils";
import { Cursor } from "./typings";
import { getRelativePosition } from "./plugins/utils";

import _ from "lodash";
import { preProcessInfographicConfig } from "./transformers";
import { Trip } from "../models/trip";
import { applyGlobalTransform } from "./transformers/global-transformers";
import { executePlugins } from "./plugins/index";
import { InfographicRendererConfig } from "./plugins/index.renderer";

function log(level: number, message: string, data: any = undefined) {
  if (data) console.log(_.repeat("    ", level) + message, data);
  else console.log(_.repeat("    ", level) + message);
}

async function renderLessBlock(
  blockConfig: InfographicConfig.Block,
  cursor: Cursor
) {
  log(cursor.level, "render-less block", blockConfig.type);
  // log(cursor.level, "cursor", cursor);

  return cursor;
}

async function renderImage(
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicConfig.Block,
  cursor: Cursor
) {
  log(cursor.level, "render block", blockConfig.type);
  // log(cursor.level, "cursor", cursor);
  const imageBlock = blockConfig as InfographicRendererConfig.ImageBlock;

  const relativePosition = getRelativePosition(cursor, imageBlock.positioning);
  log(cursor.level, "cursor", cursor);
  log(cursor.level, "relative position", relativePosition);

  await canvasAdaptor.drawImage(imageBlock.url, relativePosition, imageBlock);

  return cursor;
}

async function renderBlock(
  canvasAdaptor: CanvasAdaptor,
  b: InfographicConfig.Block,
  cursor: Cursor
): Promise<Cursor> {
  if (b.type === "container") {
    log(cursor.level, "render block", b.type);
    log(cursor.level, "render cursor", cursor);
  }

  let nextCursor: Cursor = cursor;

  if (b.type === "container") {
    // preNodeContainer
    nextCursor = await executePlugins(b.type, canvasAdaptor, b, cursor);

    const childrenBlocks: InfographicConfig.Block[] = b.blocks;
    for (let i = 0; i < childrenBlocks.length; i++) {
      const childBlock = childrenBlocks[i];

      const next = await renderBlock(
        canvasAdaptor,
        childBlock,
        _.assign({}, nextCursor, {
          level: cursor.level + 1,
        })
      );

      if (
        //no need since only container is a node
        b["flex"] &&
        b["flex"] == "column"
      ) {
        //override cursor
        if (childBlock["height"]) {
          nextCursor = _.merge({}, nextCursor, {
            y: nextCursor.y + childBlock["height"],
          });
        } else {
          if (!_.isEmpty(next)) {
            nextCursor = _.merge({}, nextCursor, {
              y: next.y,
            });
          }
        }
      }
    }

    return nextCursor;
  }

  // todo, improve this filter, remove ??
  if (
    _.findIndex(
      ["locations", "location", "text", "line", "circle", "path", "svg"],
      (type) => b.type === type
    ) !== -1
  ) {
    return await executePlugins(b.type, canvasAdaptor, b, nextCursor);
  } else if (b.type === "image") {
    return await renderImage(canvasAdaptor, b, nextCursor);
  }
  return await renderLessBlock(b, nextCursor);
}

export async function renderInfographic(
  canvasAdaptor: CanvasAdaptor,
  infographicConfig: InfographicConfig.TripInfographic,
  settings: { scale: number },
  trip: Trip
) {  
  let cloneInfographicConfig = _.cloneDeep(infographicConfig);

  const appliedGlobalTransformer = applyGlobalTransform(
    cloneInfographicConfig,
    settings
  ) as InfographicConfig.TripInfographic;
  
  const processedInfoConfig = preProcessInfographicConfig(
    appliedGlobalTransformer,
    settings,
    trip
  ) as InfographicRendererConfig.Infographic;

  if (!(processedInfoConfig.height && processedInfoConfig.height > 0)) {
    throw new Error("total height should have value");
  }

  const defaultCursor: Cursor = {
    x: 0,
    y: 0,
    level: 0,
    width: infographicConfig.width ? infographicConfig.width : 0,
    height: 0,
    scale: settings.scale ? settings.scale : 1,
  };

  const finalCursor: Cursor = await renderBlock(
    canvasAdaptor,
    processedInfoConfig,
    defaultCursor
  );
  console.log("final cursor", finalCursor);

  canvasAdaptor.resize(
    infographicConfig.width ? infographicConfig.width : 0,
    processedInfoConfig.height
  );
  canvasAdaptor.drawBackground(infographicConfig.backgroundColor);

  return;
}
