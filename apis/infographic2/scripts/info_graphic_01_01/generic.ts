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

async function renderLessBlock(canvasAdaptor, blockConfig, trip, cursor) {
  log(cursor.level, "render-less block", blockConfig.type);
  // log(cursor.level, "cursor", cursor);

  return cursor;
}

async function renderLocationImage(
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicConfig.LocationImageBlock,
  trip,
  cursor
) {
  log(cursor.level, "render block", blockConfig.type);
  // log(cursor.level, "cursor", cursor);

  // load default image if location has no image
  var imgUri =
    trip.locations[cursor.location].signedUrl &&
    !_.isEmpty(trip.locations[cursor.location].signedUrl)
      ? trip.locations[cursor.location].signedUrl
      : "./data/images/EmptyImage01.jpg";

  var result = (await canvasAdaptor.drawImage(
    imgUri,
    getRelativePosition(cursor, blockConfig.positioning),
    {
      width: blockConfig.width,
      height: blockConfig.height,
      clipPath: blockConfig.clipPath
    }
  )) as any;

  // log(cursor.level, "new w h", `${result.width} ${result.height}`);

  return _.assign({}, cursor, { y: cursor.y + result.height });
}

async function renderImage(canvasAdaptor, blockConfig, trip, cursor) {
  log(cursor.level, "render block", blockConfig.type);
  // log(cursor.level, "cursor", cursor);

  const relativePosition = getRelativePosition(cursor, blockConfig.positioning);
  log(cursor.level, "cursor", cursor);
  log(cursor.level, "relative position", relativePosition);

  await canvasAdaptor.drawImage(blockConfig.url, relativePosition);
}

async function renderBlock(
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicConfig.Block,
  trip,
  cursor: Cursor
) {
  if (blockConfig.type === "container" || blockConfig.type === "location") {
    log(cursor.level, "render block", blockConfig.type);
  }

  var nextCursor: Cursor = _.assign({}, cursor, { level: cursor.level + 1 });

  if (_.find(["container", "location"], type => blockConfig.type === type)) {
    // preNodeContainer
    nextCursor = await executePlugins(
      blockConfig.type,
      canvasAdaptor,
      blockConfig,
      cursor,
      trip
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
        trip,
        _.assign({}, nextCursor, {
          level: cursor.level + 1
        })
      );

      if (
        _.find(["container", "location"], type => blockConfig.type === type) &&
        blockConfig["flex"] &&
        blockConfig["flex"] == "column"
      ) {
        //override cursor
        if (childBlock["height"]) {
          nextCursor = _.merge({}, nextCursor, {
            y: cursor.y + childBlock["height"]
          });
        }
        else {
          if (!_.isEmpty(next)) {
            nextCursor = _.merge({}, nextCursor, {
              y: next.y
            });
          }
          
        }
        
      }

      // if (!_.isEmpty(next)) nextCursor = next;
    }
  }

  // //reset nextCursor, keep only
  // if (
  //   _.find(["container", "location"], type => blockConfig.type === type) &&
  //   blockConfig["flex"] &&
  //   blockConfig["flex"] == "column"
  // ) {
  //   //override cursor
  //   nextCursor = _.merge({}, nextCursor, {
  //     y: cursor.y + blockConfig["height"]
  //   });
  // } else {
  //   nextCursor = cursor;
  // }

  nextCursor = cursor;

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
      nextCursor,
      trip
    );
    // return await renderTextBlock(canvasAdaptor, blockConfig, trip, cursor);
  } else if (blockConfig.type === "location-image") {
    return await renderLocationImage(
      canvasAdaptor,
      blockConfig,
      trip,
      nextCursor
    );
  } else if (blockConfig.type === "image") {
    return await renderImage(canvasAdaptor, blockConfig, trip, nextCursor);
  }
  return await renderLessBlock(canvasAdaptor, blockConfig, trip, nextCursor);
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
    width: infographicConfig.width,
    height: 0,
    totalWidth: infographicConfig.width,
    totalHeight: processedInfoConfig["height"],

    location: 0
  };

  const finalCursor: Cursor = await renderBlock(
    canvasAdaptor,
    processedInfoConfig,
    trip,
    defaultCursor
  );
  console.log("final cursor", finalCursor);

  canvasAdaptor.resize(finalCursor.totalWidth, finalCursor.totalHeight);
  // canvasAdaptor.resize(3000, 3000);
  canvasAdaptor.drawBackground(infographicConfig.backgroundColor);

  return;
}
