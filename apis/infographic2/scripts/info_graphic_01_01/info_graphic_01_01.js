const globalInfographic01Config = require("../../configs/info_graphic_01/config2");
const commonFunc = require("../commonFunc");
const _ = require("lodash");

var globalConfig = globalInfographic01Config.config_01_01;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function renderLessBlock(canvasAdaptor, blockConfig, trip, cursor) {
  console.log(
    _.repeat("----", cursor.level) + "render-less block",
    blockConfig.type
  );
}

async function renderLocationImage(canvasAdaptor, blockConfig, trip, cursor) {
  console.log(
    _.repeat("----", cursor.level) + "render block",
    blockConfig.type
  );
  console.log("cursor", cursor);

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

  // ({ width, height }) => {
  // h += content_height;
  console.log("new w h", `${result.width} ${result.height}`);
  // canvasAdaptor.resize(blockConfig.width, blockConfig.height + 500);
  // }

  return _.assign({}, cursor, { y: cursor.y + result.height });
}

async function renderTextBlock(canvasAdaptor, blockConfig, trip, cursor) {
  console.log(
    _.repeat("----", cursor.level) + "render block",
    blockConfig.type
  );
  console.log("cursor", cursor);

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
    {
      x: cursor.x,
      y: cursor.y
    },
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

async function renderBlock(
  canvasAdaptor,
  blockConfig,
  trip,
  cursor = { x: 0, y: 0, level: 0, height: 0 }
) {
  if (blockConfig.type === "container" || blockConfig.type === "location") {
    console.log(
      _.repeat("----", cursor.level) + "render block",
      blockConfig.type
    );
  }

  if (!_.isEmpty(blockConfig.blocks)) {
    var nextCursor = _.assign({}, cursor, { level: cursor.level + 1 });
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
    const deltaHeight = _.get(blockConfig, "positioning.height");
    if (deltaHeight > 0) {
      canvasAdaptor.resize(cursor.width, cursor.height + deltaHeight);
      console.log(deltaHeight);

      return _.assign({}, cursor, {
        y: cursor.y + deltaHeight,
        height: cursor.height + deltaHeight
      });
    }
  } else if (blockConfig.type === "text") {
    return await renderTextBlock(canvasAdaptor, blockConfig, trip, cursor);
  } else if (blockConfig.type === "location-image") {
    return await renderLocationImage(canvasAdaptor, blockConfig, trip, cursor);
  } else {
    return await renderLessBlock(canvasAdaptor, blockConfig, trip, cursor);
  }
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
