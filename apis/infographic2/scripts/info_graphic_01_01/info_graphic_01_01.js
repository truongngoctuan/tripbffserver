const globalInfographic01Config = require("../../configs/info_graphic_01/config2");
const commonFunc = require("../commonFunc");
const _ = require("lodash");

var globalConfig = globalInfographic01Config.config_01_01;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function log(level, message, data = undefined) {
  if (data) console.log(_.repeat("    ", level) + message, data);
  else console.log(_.repeat("    ", level) + message);
}

async function renderLessBlock(canvasAdaptor, blockConfig, trip, cursor) {
  log(cursor.level, "render-less block", blockConfig.type);
  log(cursor.level, "cursor", cursor);

  return cursor;
}

async function renderLocationImage(canvasAdaptor, blockConfig, trip, cursor) {
  log(cursor.level, "render block", blockConfig.type);
  log(cursor.level, "cursor", cursor);

  // load default image if location has no image
  var imgUri =
    trip.locations[0].signedUrl && !_.isEmpty(trip.locations[0].signedUrl)
      ? trip.locations[0].signedUrl
      : "./data/images/EmptyImage01.jpg";
  var result = await canvasAdaptor.drawImage(
    imgUri,
    { x: 0, y: 0 },
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
  log(cursor.level, "cursor", cursor);

  const relativePosition = getRelativePosition(cursor, blockConfig.positioning);
  log(cursor.level, "relative position", relativePosition);

  await canvasAdaptor.drawImage(blockConfig.url, {
    x: relativePosition.x,
    y: relativePosition.y
  });
}

async function renderTextBlock(canvasAdaptor, blockConfig, trip, cursor) {
  log(cursor.level, "render block", blockConfig.type);
  log(cursor.level, "cursor", cursor);

  let feelingLabel = commonFunc.getFeelingLabel(trip.locale);

  let location = trip.locations[0],
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

  let locationNameNode = canvasAdaptor.drawText(
    text,
    getRelativePosition(cursor, blockConfig.positioning),
    {
      color: blockConfig.color,
      font: blockConfig.fontFamily,
      fontSize: blockConfig.fontSize,
      fontWeight: blockConfig.fontWeight,
      textAnchor: blockConfig.textAnchor,
      textTransform: blockConfig.textTransform
      // wrapNumber: w - paddingLeftRight
    }
  );

  let locationNameNodeBbox = locationNameNode.bounds;

  return _.assign({}, cursor, { y: cursor.y + locationNameNodeBbox.height });
}

function getRelativePosition(cursor, positioning) {
  var x = cursor.x;
  var y = cursor.y;

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
  cursor = { x: 0, y: 0, level: 0, height: 0 }
) {
  if (blockConfig.type === "container" || blockConfig.type === "location") {
    log(cursor.level, "render block", blockConfig.type);
  }

  var nextCursor = _.assign({}, cursor, { level: cursor.level + 1 });

  if (blockConfig.type === "container") {
    const deltaHeight = _.get(blockConfig, "positioning.height");
    if (deltaHeight > 0) {
      canvasAdaptor.resize(cursor.width, cursor.height + deltaHeight);
      log(cursor.level, deltaHeight);
      nextCursor.height = nextCursor.height + deltaHeight;
    }
  }

  if (!_.isEmpty(blockConfig.blocks)) {
    for (var i = 0; i < blockConfig.blocks.length; i++) {
      var childBlock = blockConfig.blocks[i];
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
    return nextCursor;
  } else if (blockConfig.type === "text") {
    return await renderTextBlock(canvasAdaptor, blockConfig, trip, cursor);
  } else if (blockConfig.type === "location-image") {
    return await renderLocationImage(canvasAdaptor, blockConfig, trip, cursor);
  } else if (blockConfig.type === "image") {
    return await renderImage(canvasAdaptor, blockConfig, trip, cursor);
  }
  return await renderLessBlock(canvasAdaptor, blockConfig, trip, cursor);
}

async function draw(canvasAdaptor, trip) {
  const defaultConfig = {
    x: 0,
    y: 0,
    level: 0,
    width: globalConfig.width,
    height: 0
  };
  await renderBlock(canvasAdaptor, globalConfig, trip, defaultConfig);
  canvasAdaptor.drawBackground(globalConfig.backgroundColor);
  return;
}

module.exports = {
  draw
};
