const globalInfographic01Config = require("../../configs/info_graphic_01/config");
const commonFunc = require("../commonFunc");
const _ = require("lodash");

var globalConfig = globalInfographic01Config.config_01_01;

var w = globalConfig.infographic.width,
  h = globalConfig.infographic.height,
  content_height = globalConfig.infographic.content_height,
  paddingLeftRight = globalConfig.infographic.paddingLeftRight,
  c_paddingTop = globalConfig.infographic.c_paddingTop;

async function drawContent(canvasAdaptor, trip) {
  let startPoint_px = paddingLeftRight,
    startPoint_py = h - content_height + c_paddingTop;

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

  let locationName_px = startPoint_px,
    locationName_py = startPoint_py;

  let locationNameNode = canvasAdaptor.drawText(
    locationName.toUpperCase(),
    {
      y: locationName_py,
      x: locationName_px
    },
    {
      color: globalConfig.location.name.color,
      font: globalConfig.location.name.fontFamily,
      fontSize: globalConfig.location.name.fontSize,
      fontWeight: globalConfig.location.name.fontWeight,
      textAnchor: globalConfig.location.name.textAnchor,
      textTransform: globalConfig.location.name.textTransform,
      wrapNumber: w - paddingLeftRight
    }
  );

  let locationNameNodeBbox = locationNameNode.bounds;
  var nextElementYCoordinate =
    locationNameNodeBbox.y +
    locationNameNodeBbox.height +
    globalConfig.location.paddingTop;

  if (nodeFeelingActivity) {
    console.log("nodeFeelingActivity", nodeFeelingActivity);
    let feelingActivityNode = canvasAdaptor.drawText(
      nodeFeelingActivity,
      {
        y: nextElementYCoordinate,
        x: locationName_px
      },
      {
        color: globalConfig.location.description.color,
        font: globalConfig.location.description.fontFamily,
        fontSize: globalConfig.location.description.fontSize,
        textAnchor: globalConfig.location.description.textAnchor,
        wrapNumber: w - paddingLeftRight
      }
    );
    let feelingActivityNodeBbox = feelingActivityNode.bounds;
    nextElementYCoordinate =
      feelingActivityNodeBbox.y +
      feelingActivityNodeBbox.height +
      globalConfig.location.paddingTop;
  }

  if (highlights) {
    console.log("highlights", highlights);
    let hightlightNode = canvasAdaptor.drawText(
      highlights,
      {
        y: nextElementYCoordinate,
        x: locationName_px
      },
      {
        color: globalConfig.location.description.color,
        font: globalConfig.location.description.fontFamily,
        fontSize: globalConfig.location.description.fontSize,
        textAnchor: globalConfig.location.description.textAnchor,
        wrapNumber: w - paddingLeftRight
      }
    );
    let hightlightNodeBbox = hightlightNode.bounds;
    nextElementYCoordinate =
      hightlightNodeBbox.y +
      hightlightNodeBbox.height +
      globalConfig.location.paddingTop;
  }

  await canvasAdaptor.drawImage("./data/images/App_Signature.png", {
    x: w - globalConfig.footer.marginRight,
    y: h - globalConfig.footer.marginBottom
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function draw(canvasAdaptor, trip) {
  // load default image if location has no image
  var imgUri =
    trip.locations[0].signedUrl && !_.isEmpty(trip.locations[0].signedUrl)
      ? trip.locations[0].signedUrl
      : "./data/images/EmptyImage01.jpg";
  console.log("original w h", `${w} ${h}`);
  await canvasAdaptor.drawImage(
    imgUri,
    { x: 0, y: 0 },
    {
      width: w,
      height: h
    })
    .then(({ width, height }) => {
      // var ratio = width / height;
      // var h = w / ratio;

      h += content_height;
      console.log("new w h", `${w} ${h}`);
      canvasAdaptor.resize(w, h);
    });

  canvasAdaptor.drawBackground(globalConfig.infographic.background);

  await drawContent(canvasAdaptor, trip);
}

module.exports = {
  draw
};
