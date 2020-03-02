import { InfographicConfig } from "../../configs";
import { CanvasAdaptor } from "../utils";
import { Cursor } from "./typings";
import { getRelativePosition } from "./plugins/utils";

import _ from "lodash";
import { preProcessInfographicConfig } from "./transformers";
const { executePlugins } = require("./plugins/index");

function log(level: number, message: string, data: any = undefined) {
  if (data) console.log(_.repeat("    ", level) + message, data);
  else console.log(_.repeat("    ", level) + message);
}

async function renderLessBlock(blockConfig, cursor) {
  log(cursor.level, "render-less block", blockConfig.type);
  // log(cursor.level, "cursor", cursor);

  return cursor;
}

async function renderImage(canvasAdaptor, blockConfig, cursor) {
  log(cursor.level, "render block", blockConfig.type);
  // log(cursor.level, "cursor", cursor);

  const relativePosition = getRelativePosition(cursor, blockConfig.positioning);
  log(cursor.level, "cursor", cursor);
  log(cursor.level, "relative position", relativePosition);

  await canvasAdaptor.drawImage(blockConfig.url, relativePosition, {
    width: blockConfig.width,
    height: blockConfig.height,
    clipPath: blockConfig.clipPath
  });
}

async function renderBlock(
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicConfig.Block,
  cursor: Cursor
) {
  if (blockConfig.type === "container") {
    log(cursor.level, "render block", blockConfig.type);
    log(cursor.level, "render cursor", cursor);
  }

  var nextCursor: Cursor = cursor;

  if (blockConfig.type === "container") {
    // preNodeContainer
    nextCursor = await executePlugins(
      blockConfig.type,
      canvasAdaptor,
      blockConfig,
      cursor
    );
    // console.log("nextCursor return location", nextCursor);
  }

  if (!_.isEmpty((blockConfig as InfographicConfig.ContainerBlock).blocks)) {
    const containerBlockConfig = blockConfig as InfographicConfig.ContainerBlock;

    let childBlockConfigs: InfographicConfig.Block[] =
      containerBlockConfig.blocks;
    for (var i = 0; i < childBlockConfigs.length; i++) {
      var childBlock = childBlockConfigs[i];

      var next = await renderBlock(
        canvasAdaptor,
        childBlock,
        _.assign({}, nextCursor, {
          level: cursor.level + 1
        })
      );

      if (
        //no need since only container is a node
        // blockConfig.type == "container" &&
        blockConfig["flex"] &&
        blockConfig["flex"] == "column"
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
  }

  if (blockConfig.type === "container") return nextCursor;

  if (
    _.findIndex(
      ["locations", "location", "text", "line", "circle"],
      type => blockConfig.type === type
    ) !== -1
  ) {
    return await executePlugins(
      blockConfig.type,
      canvasAdaptor,
      blockConfig,
      nextCursor
    );
  } else if (blockConfig.type === "image") {
    return await renderImage(canvasAdaptor, blockConfig, nextCursor);
  }
  return await renderLessBlock(blockConfig, nextCursor);
}

export async function renderInfographic(
  canvasAdaptor: CanvasAdaptor,
  infographicConfig: InfographicConfig.Infographic,
  trip
) {
  const processedInfoConfig = preProcessInfographicConfig(
    infographicConfig,
    trip
  );

  if (!(processedInfoConfig["height"] && processedInfoConfig["height"] > 0)) {
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
    processedInfoConfig["height"]
  );
  // canvasAdaptor.resize(3000, 3000);
  canvasAdaptor.drawBackground(infographicConfig.backgroundColor);

  return;
}
