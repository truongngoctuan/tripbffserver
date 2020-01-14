import { InfographicConfig } from "../../configs";
import { CanvasAdaptor } from "../utils";
import { Cursor } from ".";

import _ from "lodash";
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
  blockConfig,
  trip,
  cursor: Cursor
) {
  if (blockConfig.type === "container" || blockConfig.type === "location") {
    log(cursor.level, "render block", blockConfig.type);
  }

  var nextCursor: Cursor = _.assign({}, cursor, { level: cursor.level + 1 });
  let isFixedHeight = false;
  if (blockConfig.type === "container") {
    isFixedHeight = blockConfig.height > 0;
    const deltaHeight = blockConfig.height;
    if (deltaHeight > 0) {
      nextCursor.height = nextCursor.height + deltaHeight;
    }
    nextCursor = await executePlugins(
      blockConfig.type,
      canvasAdaptor,
      blockConfig,
      cursor,
      trip
    );
    // console.log("nextCursor return container", nextCursor);
  }

  if (blockConfig.type === "location") {
    isFixedHeight = blockConfig.height > 0;
    nextCursor = await executePlugins(
      blockConfig.type,
      canvasAdaptor,
      blockConfig,
      cursor,
      trip
    );
    // console.log("nextCursor return location", nextCursor);
  }

  var totalHeight = 0;
  if (!_.isEmpty(blockConfig.blocks)) {
    let isStackingHeight = false;
    for (var i = 0; i < blockConfig.blocks.length; i++) {
      var previousChildBlock = i != 0 ? blockConfig.blocks[i - 1] : undefined;
      var childBlock = blockConfig.blocks[i];
      // log(
      //   cursor.level + 1,
      //   "cursor info",
      //   `w=${cursor.width} h=${cursor.height}`
      // );

      if (
        previousChildBlock &&
        (previousChildBlock.type === "container" ||
          previousChildBlock.type === "location" ||
          // previousChildBlock.type === "location-image" ||
          previousChildBlock.type === "text")
      ) {
        isStackingHeight = true;
        // console.log("debugging", cursor.y + " " + totalHeight);
      }

      var next = await renderBlock(
        canvasAdaptor,
        childBlock,
        trip,
        _.assign({}, nextCursor, {
          level: cursor.level + 1,
          y: isStackingHeight ? nextCursor.y : cursor.y
        })
      );

      if (
        !isFixedHeight &&
        next &&
        (childBlock.type === "container" || childBlock.type === "location")
      ) {
        totalHeight += next.height;
      }

      if (!_.isEmpty(next)) nextCursor = next;
    }
  }

  if (blockConfig.type === "container" || blockConfig.type === "location") {
    if (isFixedHeight) {
      nextCursor.totalHeight = blockConfig.height;
    } else {
      nextCursor.totalHeight = totalHeight;
    }

    // log(cursor.level, "cursor", nextCursor);
    // log(cursor.level, "totalHeight", nextCursor.totalHeight);
  }

  if (blockConfig.type === "container") {
    //reset cursor
    return _.assign({}, nextCursor, {
      x: cursor.x,
      y: cursor.y + nextCursor.height,
      width: cursor.width
    });
  } else if (blockConfig.type === "location") {
    return await renderLocation(
      canvasAdaptor,
      blockConfig,
      trip,
      _.assign({}, nextCursor, {
        x: cursor.x,
        y: cursor.y + nextCursor.height,
        width: cursor.width
      })
    );
  } else if (_.findIndex(["text", "line"], type => blockConfig.type === type) !== -1) {
    return await executePlugins(
      blockConfig.type,
      canvasAdaptor,
      blockConfig,
      cursor,
      trip
    );
    // return await renderTextBlock(canvasAdaptor, blockConfig, trip, cursor);
  } else if (blockConfig.type === "location-image") {
    return await renderLocationImage(canvasAdaptor, blockConfig, trip, cursor);
  } else if (blockConfig.type === "image") {
    return await renderImage(canvasAdaptor, blockConfig, trip, cursor);
  }
  return await renderLessBlock(canvasAdaptor, blockConfig, trip, cursor);
}

async function renderInfographic(
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
  const finalCursor: Cursor = await renderBlock(
    canvasAdaptor,
    infographicConfig,
    trip,
    defaultCursor
  );
  console.log("final cursor", finalCursor);

  canvasAdaptor.resize(finalCursor.totalWidth, finalCursor.totalHeight);
  // canvasAdaptor.resize(2000, 2000);
  canvasAdaptor.drawBackground(infographicConfig.backgroundColor);

  return;
}

module.exports = {
  renderInfographic
};
