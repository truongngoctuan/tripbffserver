import { InfographicConfig } from "../../configs";
import { CanvasAdaptor } from "../utils";
import { Cursor } from "./typings";
import { getRelativePosition } from "./plugins/utils";

import _ from "lodash";
import { preProcessInfographicConfig } from "./transformers";
import { Trip } from "../models/trip";
const { executePlugins } = require("./plugins/index");

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
  const imageBlock = blockConfig as InfographicConfig.ImageBlock;

  const relativePosition = getRelativePosition(cursor, imageBlock.positioning);
  log(cursor.level, "cursor", cursor);
  log(cursor.level, "relative position", relativePosition);

  await canvasAdaptor.drawImage(imageBlock.url, relativePosition, imageBlock);
}

async function renderBlock(
  canvasAdaptor: CanvasAdaptor,
  b: InfographicConfig.Block,
  cursor: Cursor
) {
  if (b.type === "container") {
    log(cursor.level, "render block", b.type);
    log(cursor.level, "render cursor", cursor);
  }

  var nextCursor: Cursor = cursor;

  if (b.type === "container") {
    // preNodeContainer
    nextCursor = await executePlugins(b.type, canvasAdaptor, b, cursor);

    let childrenBlocks: InfographicConfig.Block[] = b.blocks;
    for (var i = 0; i < childrenBlocks.length; i++) {
      var childBlock = childrenBlocks[i];

      var next = await renderBlock(
        canvasAdaptor,
        childBlock,
        _.assign({}, nextCursor, {
          level: cursor.level + 1
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
            y: nextCursor.y + childBlock["height"]
          });
        } else {
          if (!_.isEmpty(next)) {
            nextCursor = _.merge({}, nextCursor, {
              y: next.y
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
      type => b.type === type
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
  infographicConfig: InfographicConfig.Infographic,
  trip: Trip
) {
  const processedInfoConfig = preProcessInfographicConfig(
    infographicConfig,
    trip
  ) as InfographicConfig.Infographic;

  if (!(processedInfoConfig.height && processedInfoConfig.height > 0)) {
    throw new Error("total height should have value");
  }

  const defaultCursor: Cursor = {
    x: 0,
    y: 0,
    level: 0,
    width: infographicConfig.width ? infographicConfig.width : 0,
    height: 0
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
