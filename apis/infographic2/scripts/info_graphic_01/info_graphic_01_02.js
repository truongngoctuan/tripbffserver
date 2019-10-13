//follow this demo
//      https://blog.adioma.com/how-to-create-timeline-infographic/

// draw basic shape
// https://www.dashingd3js.com/svg-basic-shapes-and-d3js

const utils = require("../utils");
const globalInfographic01Config = require("../../configs/info_graphic_01/config");
const commonFunc = require("../commonFunc");
const _ = require("lodash");

var globalConfig = globalInfographic01Config.config_01_02;

let w = globalConfig.infographic.width;
let h = globalConfig.infographic.height;

function drawHeader(canvasAdaptor, trip) {
  canvasAdaptor.drawRect({
    x: 0,
    y: 0,
    width: w,
    height: globalConfig.header.height,
    backgroundColor: globalConfig.header.background
  });

  // .append("rect")
  // .attr("width", w)
  // .attr("height", globalConfig.header.height)
  // .attr("fill", globalConfig.header.background);

  let tripNameNode = canvasAdaptor.drawText(
    trip.name.toUpperCase(),
    {
      y: 50,
      x: w / 2
    },
    {
      color: globalConfig.header.tripName.color,
      font: globalConfig.header.tripName.font,
      fontSize: globalConfig.header.tripName.fontSize,
      textAnchor: globalConfig.header.tripName.textAnchor,
      fontWeight: globalConfig.header.tripName.fontWeight,
      textTransform: globalConfig.header.tripName.textTransform,
      wrapNumber: w - globalConfig.infographic.paddingLeftRight * 2
    }
  );
  let tripNameNodeBbox = tripNameNode.bounds;
  let numberOfDays = trip.numberOfDays,
    numberOfLocations = trip.locations.length,
    dayLabel = commonFunc.getDayLabel(trip.locale, numberOfDays),
    locationLabel = commonFunc.getLocationLabel(trip.locale, numberOfLocations);

  let dayText = " " + dayLabel + ", ",
    locationText = " " + locationLabel,
    basicTripInfo = numberOfDays + dayText + numberOfLocations + locationText;

  canvasAdaptor.drawText(
    basicTripInfo,
    {
      y: tripNameNodeBbox.y + tripNameNodeBbox.height + 40,
      x: w / 2
    },
    {
      color: globalConfig.header.tripDescription.color,
      font: globalConfig.header.tripDescription.font,
      fontSize: globalConfig.header.tripDescription.fontSize,
      textAnchor: globalConfig.header.tripDescription.textAnchor,
      wrapNumber: w - globalConfig.infographic.paddingLeftRight * 2
    }
  );
}

async function drawContent(
  canvasAdaptor,
  location,
  startPointCoordinate,
  locale
) {
  let startPoint_px = startPointCoordinate.x,
    startPoint_py = startPointCoordinate.y;

  let feelingLabel = commonFunc.getFeelingLabel(locale);

  let locationName = capitalizeFirstLetter(location.name) + ".",
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
      font: globalConfig.location.name.font,
      fontSize: globalConfig.location.name.fontSize,
      fontWeight: globalConfig.location.name.fontWeight,
      textAnchor: globalConfig.location.name.textAnchor,
      textTransform: globalConfig.location.name.textTransform,
      wrapNumber: w / 2 - globalConfig.imageContainer.paddingBetweenImage * 4
    }
  );
  let locationNameNodeBbox = locationNameNode.bounds;
  let nextElementYCoordinate =
    locationNameNodeBbox.y + locationNameNodeBbox.height;

  if (nodeFeelingActivity) {
    let feelingActivityNode = canvasAdaptor.drawText(
      nodeFeelingActivity,
      {
        y: nextElementYCoordinate + globalConfig.location.paddingTop,
        x: locationName_px
      },
      {
        color: globalConfig.location.description.color,
        font: globalConfig.location.description.font,
        fontSize: globalConfig.location.description.fontSize,
        textAnchor: globalConfig.location.description.textAnchor,
        wrapNumber: w / 2 - globalConfig.imageContainer.paddingBetweenImage * 4
      }
    );
    let feelingActivityNodeBbox = feelingActivityNode.bounds;
    nextElementYCoordinate =
      feelingActivityNodeBbox.y + feelingActivityNodeBbox.height;
  }

  if (highlights) {
    let hightlightNode = canvasAdaptor.drawText(
      highlights,
      {
        y: nextElementYCoordinate + globalConfig.location.paddingTop,
        x: locationName_px
      },
      {
        color: globalConfig.location.description.color,
        font: globalConfig.location.description.font,
        fontSize: globalConfig.location.description.fontSize,
        textAnchor: globalConfig.location.description.textAnchor,
        wrapNumber: w / 2 - globalConfig.imageContainer.paddingBetweenImage * 4
      }
    );
    let highlightNodeBbox = hightlightNode.bounds;
    nextElementYCoordinate = highlightNodeBbox.y + highlightNodeBbox.height;
  }

  return nextElementYCoordinate;
}

function drawImage(svgImage, coordinate, uri, config) {
  var svgCanvas = svgImage.append("svg:image");
  svgCanvas
    .attr("x", coordinate.x)
    .attr("y", coordinate.y)
    .attr("width", config.width)
    .attr("height", config.height)
    .attr("xlink:href", uri)
    .attr("clip-path", config.imageClipPath);
}

async function drawFooter(canvasAdaptor) {
  await canvasAdaptor.drawImage(
    "data/images/App_Signature.png",
    {
      x: w - globalConfig.footer.marginRight,
      y: h - globalConfig.footer.marginBottom
    },
    {
      //   width: globalConfig.footer.imageWidth,
      //   height: globalConfig.footer.imageHeight
    }
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function onLoadImage(canvasAdaptor, imageResult, url, coordinate, index) {
  let ratio = imageResult.width / imageResult.height,
    svgWidth = globalConfig.imageContainer.svgWidth,
    svgHeight = globalConfig.imageContainer.svgHeight,
    viewBoxWidth = globalConfig.imageContainer.viewBoxWidth,
    viewBoxHeight = globalConfig.imageContainer.viewBoxHeight,
    width = viewBoxWidth,
    height = viewBoxHeight;

  if (ratio >= 1) {
    width = height * ratio;
  } else {
    height = width / ratio;
  }

  //   var svgImage = canvasAdaptor
  //     .append("svg")
  //     .attr("y", coordinate.y)
  //     .attr("x", coordinate.x)
  //     .attr("width", svgWidth)
  //     .attr("height", svgHeight)
  //     .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight);

  //   let clipPathId = "_id" + index;

  //todo
  // svgImage
  //   .append("defs")
  //   .append("clipPath")
  //   .attr("id", clipPathId)
  //   .append("path")
  //   .attr("x", 0)
  //   .attr("y", 0)
  //   .attr("d", globalConfig.imageContainer.clipPath);

  //   drawImage(
  //     svgImage,
  //     {
  //       y: 0,
  //       x: 0
  //     },
  //     url,
  //     {
  //       width: width,
  //       height: height,
  //       imageClipPath: "url(#" + clipPathId + ")"
  //     }
  //   );
}

async function draw(canvasAdaptor, trip) {
  drawHeader(canvasAdaptor, trip);

  let locationNoImage = trip.locations.find(
    item => item.signedUrl == "" || _.isEmpty(item.signedUrl)
  );

  if (locationNoImage) {
    // load default image if location has no image
    trip.locations = trip.locations.map(item => {
      return {
        ...item,
        signedUrl: item.signedUrl
          ? item.signedUrl
          : "./data/images/EmptyImage02.jpg"
      };
    });
  }

  let promise01 = canvasAdaptor
    .drawImage(
      trip.locations[0].signedUrl,
      {
        x: globalConfig.infographic.paddingLeftRight,
        y: 170 + globalConfig.imageContainer.paddingTop
      },
      {
        width: globalConfig.imageContainer.svgWidth,
        height: globalConfig.imageContainer.svgHeight,
        clipPath: globalConfig.imageContainer.clipPath
      }
    )
    .then(imageResult =>
      onLoadImage(canvasAdaptor, imageResult, trip.locations[0].signedUrl, {
        x: globalConfig.infographic.paddingLeftRight,
        y: 170 + globalConfig.imageContainer.paddingTop
      })
    );

  let promise02 = canvasAdaptor
    .drawImage(
      trip.locations[1].signedUrl,
      {
        x: w / 2 + globalConfig.imageContainer.paddingBetweenImage,
        y: 170 + globalConfig.imageContainer.paddingTop
      },
      {
        width: globalConfig.imageContainer.svgWidth,
        height: globalConfig.imageContainer.svgHeight,
        clipPath: globalConfig.imageContainer.clipPath
      }
      // 1
    )
    .then(imageResult =>
      onLoadImage(
        canvasAdaptor,
        imageResult,
        trip.locations[1].signedUrl,
        {
          x: w / 2 + globalConfig.imageContainer.paddingBetweenImage,
          y: 170 + globalConfig.imageContainer.paddingTop
        },
        1
      )
    );

  await Promise.all([promise01, promise02]);

  let firstLatestHeight = await drawContent(
    canvasAdaptor,
    trip.locations[0],
    {
      x: globalConfig.infographic.paddingLeftRight,
      y: 1100
    },
    trip.locale
  );

  let secondLatestHeight = await drawContent(
    canvasAdaptor,
    trip.locations[1],
    {
      x: w / 2 + globalConfig.imageContainer.paddingBetweenImage * 4,
      y: 1100
    },
    trip.locale
  );

  h =
    firstLatestHeight >= secondLatestHeight
      ? firstLatestHeight +
        globalConfig.infographic.paddingBottom +
        globalConfig.footer.height
      : secondLatestHeight +
        globalConfig.infographic.paddingBottom +
        globalConfig.footer.height;

  canvasAdaptor.resize(w, h);
  canvasAdaptor.drawBackground(globalConfig.infographic.background);

  await drawFooter(canvasAdaptor);
}

module.exports = {
  draw: draw
};
