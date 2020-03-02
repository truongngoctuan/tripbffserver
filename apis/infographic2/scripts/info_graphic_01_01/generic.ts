import { InfographicConfig } from "../../configs";
import { CanvasAdaptor } from "../utils";
import { Cursor } from "./typings";

import _ from "lodash";
import { preProcessInfographicConfig } from "./transformer";
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

async function renderLocation(canvasAdaptor, blockConfig, trip, cursor) {
  // log(cursor.level, "render block", blockConfig.type);

  return _.assign({}, cursor, { location: cursor.location + 1 });
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
  log(cursor.level, "relative position", relativePosition);

  await canvasAdaptor.drawImage(
    blockConfig.url,
    getRelativePosition(cursor, blockConfig.positioning)
  );
}

function getRelativePosition(cursor, positioning) {
  var x = cursor.x;
  var y = cursor.y;
  if (!positioning) return { x, y };

  if (positioning.left) x = x + positioning.left;
  if (positioning.right) x = x + cursor.width - positioning.right;

  if (positioning.top) y = y + positioning.top;
  if (positioning.bottom) y = y + cursor.height - positioning.bottom;

  return { x, y };
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

  if (blockConfig.type === "container") {
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

    let childBlockConfigs: InfographicConfig.Block[] = [];
    //todo instead of modifying codes, how about updating configs to reflects No of locations, then just render as usual ??
    if (blockConfig.type === "locations") {
      // nLoc > nLocConfig, clone locConfig until n == nLoc
      // else keep just enough logConfig
      const nLoc = trip.locations.length;
      const nLocConfig = containerBlockConfig.blocks.length;
      if (nLoc > nLocConfig) {
        for (let iLoc = 0; iLoc < nLoc; iLoc++) {
          const locConfig = containerBlockConfig.blocks[iLoc % nLocConfig];
          childBlockConfigs.push(locConfig);
        }
      } else {
        childBlockConfigs = containerBlockConfig.blocks.slice(0, nLoc);
      }
      // console.log("childBlockConfigs.length", childBlockConfigs.length);
    } else {
      childBlockConfigs = [...containerBlockConfig.blocks];
    }

    for (var i = 0; i < childBlockConfigs.length; i++) {
      var childBlock = childBlockConfigs[i];
      // log(
      //   cursor.level + 1,
      //   "cursor info",
      //   `w=${cursor.width} h=${cursor.height}`
      // );

      var next = await renderBlock(
        canvasAdaptor,
        childBlock,
        trip,
        _.assign({}, nextCursor, {
          level: cursor.level + 1,
          // y: isStackingHeight ? nextCursor.y : cursor.y
        })
      );

      if (!_.isEmpty(next)) nextCursor = next;
    }
  }

  if (blockConfig.type === "container") {
    //override cursor
    if (blockConfig.height) {
      
      nextCursor = _.merge({}, nextCursor, {
        y: cursor.y + blockConfig.height,
        height: cursor.height + blockConfig.height,
        totalHeight: cursor.totalHeight + blockConfig.height,
      });
      console.log("override cursor", nextCursor);

    }
    else {
      console.log("do something here")
    }
  }

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
    return await renderLocationImage(canvasAdaptor, blockConfig, trip, nextCursor);
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
  const defaultCursor: Cursor = {
    x: 0,
    y: 0,
    level: 0,
    width: infographicConfig.width,
    height: 0,
    totalWidth: infographicConfig.width,
    totalHeight: 0,

    location: 0
  };
  const processedInfoConfig = preProcessInfographicConfig(infographicConfig, trip);
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