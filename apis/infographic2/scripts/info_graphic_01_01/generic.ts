import { InfographicConfig } from "../../configs";

const commonFunc = require("../commonFunc");
const _ = require("lodash");
const { executePlugins } = require("./plugins/index");

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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

async function renderLocationImage(canvasAdaptor, blockConfig, trip, cursor) {
  log(cursor.level, "render block", blockConfig.type);
  // log(cursor.level, "cursor", cursor);

  // load default image if location has no image
  var imgUri =
    trip.locations[cursor.location].signedUrl &&
    !_.isEmpty(trip.locations[cursor.location].signedUrl)
      ? trip.locations[cursor.location].signedUrl
      : "./data/images/EmptyImage01.jpg";
  var result = await canvasAdaptor.drawImage(
    imgUri,
    getRelativePosition(cursor, blockConfig.positioning),
    {
      width: blockConfig.width,
      height: blockConfig.height
    }
  );

  log(cursor.level, "new w h", `${result.width} ${result.height}`);

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

async function renderTextBlock(
  canvasAdaptor,
  blockConfig: InfographicConfig.TextBlock,
  trip,
  cursor
) {
  log(cursor.level, "render block", blockConfig.type);
  // log(cursor.level, "cursor", cursor);

  let feelingLabel = commonFunc.getFeelingLabel(trip.locale);

  let location = trip.locations[cursor.location],
    locationName = capitalizeFirstLetter(location.name) + ".",
    feeling = location.feeling ? feelingLabel + " " + location.feeling : "",
    activity = location.activity,
    highlights = location.highlights.toLowerCase(),
    nodeFeelingActivity = "";

  if (activity)
    nodeFeelingActivity = capitalizeFirstLetter(activity.toLowerCase());
  if (feeling) {
    feeling = capitalizeFirstLetter(feeling.toLowerCase());
    nodeFeelingActivity = nodeFeelingActivity
      ? nodeFeelingActivity + ". " + feeling
      : feeling;
  }
  if (nodeFeelingActivity) nodeFeelingActivity += ".";

  if (highlights) highlights = capitalizeFirstLetter(highlights) + ".";

  let text = blockConfig.text;
  if (text === "{{location.name}}") {
    text = locationName.toUpperCase();
  }
  if (text === "{{location.feeling}}") {
    text = nodeFeelingActivity;
  }
  if (text === "{{location.hight-lights}}") {
    text = highlights;
  }
  if (text === "{{trip.name}}") {
    text = trip.name.toUpperCase();
  }
  if (text === "{{trip.info}}") {
    let numberOfDays = trip.numberOfDays,
      numberOfLocations = trip.locations.length,
      dayLabel = commonFunc.getDayLabel(trip.locale, numberOfDays),
      locationLabel = commonFunc.getLocationLabel(
        trip.locale,
        numberOfLocations
      );

    let dayText = " " + dayLabel + ", ",
      locationText = " " + locationLabel,
      basicTripInfo = numberOfDays + dayText + numberOfLocations + locationText;

    text = basicTripInfo;
  }

  var relativePosition = getRelativePosition(cursor, blockConfig.positioning);
  if (blockConfig.textAnchor === "middle") {
    relativePosition.x = relativePosition.x + cursor.width / 2;
  }

  let locationNameNode = canvasAdaptor.drawText(text, relativePosition, {
    color: blockConfig.color,
    font: blockConfig.fontFamily,
    fontSize: blockConfig.fontSize,
    fontWeight: blockConfig.fontWeight,
    textAnchor: blockConfig.textAnchor,
    textTransform: blockConfig.textTransform,
    wrapNumber: blockConfig.width
    // wrapNumber: w - paddingLeftRight
  });

  let locationNameNodeBbox = locationNameNode.bounds;

  return _.assign({}, cursor, { y: cursor.y + locationNameNodeBbox.height });
}

function getRelativePosition(cursor, positioning) {
  var x = cursor.x;
  var y = cursor.y;
  if (!positioning) return { x, y };

  if (positioning.left) x = x + positioning.left;
  if (positioning.right) x = x + cursor.width - positioning.right;

  if (positioning.top) y = y + positioning.top;
  if (positioning.bottom) y = cursor.height - positioning.bottom;

  return { x, y };
}

async function renderBlock(
  canvasAdaptor,
  blockConfig,
  trip,
  cursor = { x: 0, y: 0, level: 0, width: 0, height: 0 }
) {
  if (blockConfig.type === "container" || blockConfig.type === "location") {
    log(cursor.level, "render block", blockConfig.type);
  }

  var nextCursor = _.assign({}, cursor, { level: cursor.level + 1 });

  if (blockConfig.type === "container") {
    const deltaHeight = _.get(blockConfig, "positioning.height");
    if (deltaHeight > 0) {
      canvasAdaptor.resize(cursor.width, cursor.height + deltaHeight);
      // log(cursor.level, deltaHeight);
      nextCursor.height = nextCursor.height + deltaHeight;
    }
    executePlugins(blockConfig.type, canvasAdaptor, blockConfig, cursor);
  }

  if (blockConfig.type === "location") {
    if (blockConfig.positioning) {
      nextCursor = _.assign(
        {},
        cursor,
        getRelativePosition(cursor, blockConfig.positioning)
      );
    }
  }

  if (!_.isEmpty(blockConfig.blocks)) {
    for (var i = 0; i < blockConfig.blocks.length; i++) {
      var childBlock = blockConfig.blocks[i];
      log(
        cursor.level + 1,
        "cursor info",
        `w=${cursor.width} h=${cursor.height}`
      );

      var next = await renderBlock(
        canvasAdaptor,
        childBlock,
        trip,
        _.assign({}, nextCursor, { level: cursor.level + 1 })
      );
      if (!_.isEmpty(next)) nextCursor = next;
    }
  }

  if (blockConfig.type === "container") {
    return nextCursor;
  } else if (blockConfig.type === "location") {
    return await renderLocation(canvasAdaptor, blockConfig, trip, cursor);
  } else if (blockConfig.type === "text") {
    return await renderTextBlock(canvasAdaptor, blockConfig, trip, cursor);
  } else if (blockConfig.type === "location-image") {
    return await renderLocationImage(canvasAdaptor, blockConfig, trip, cursor);
  } else if (blockConfig.type === "image") {
    return await renderImage(canvasAdaptor, blockConfig, trip, cursor);
  }
  return await renderLessBlock(canvasAdaptor, blockConfig, trip, cursor);
}

async function renderInfographic(canvasAdaptor, infographicConfig, trip) {
  const defaultCursor = {
    x: 0,
    y: 0,
    level: 0,
    width: infographicConfig.width,
    height: 0,
    location: 0
  };
  await renderBlock(canvasAdaptor, infographicConfig, trip, defaultCursor);
  canvasAdaptor.drawBackground(infographicConfig.backgroundColor);
  return;
}

module.exports = {
  renderInfographic
};
