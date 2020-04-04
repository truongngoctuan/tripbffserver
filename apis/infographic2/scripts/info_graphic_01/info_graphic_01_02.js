//follow this demo
//      https://blog.adioma.com/how-to-create-timeline-infographic/

// draw basic shape
// https://www.dashingd3js.com/svg-basic-shapes-and-d3js

const globalInfographic01Config = require("../../configs/info_graphic_01/config");
const commonFunc = require("../commonFunc");
const _ = require("lodash");

const globalConfig = globalInfographic01Config.config_01_02;

const w = globalConfig.infographic.width;
let h = globalConfig.infographic.height;

function drawHeader(canvasAdaptor, trip) {
  const tripNameNode = canvasAdaptor.drawText(
    trip.name.toUpperCase(),
    {
      y: 20,
      x: w / 2,
    },
    {
      color: globalConfig.header.tripName.color,
      font: globalConfig.header.tripName.font,
      fontSize: globalConfig.header.tripName.fontSize,
      textAnchor: globalConfig.header.tripName.textAnchor,
      fontWeight: globalConfig.header.tripName.fontWeight,
      textTransform: globalConfig.header.tripName.textTransform,
      wrapNumber: w - globalConfig.infographic.paddingLeftRight * 2,
    }
  );
  const tripNameNodeBbox = tripNameNode.bounds;
  const numberOfDays = trip.numberOfDays,
    numberOfLocations = trip.locations.length,
    dayLabel = commonFunc.getDayLabel(trip.locale, numberOfDays),
    locationLabel = commonFunc.getLocationLabel(trip.locale, numberOfLocations);

  const dayText = " " + dayLabel + ", ",
    locationText = " " + locationLabel,
    basicTripInfo = numberOfDays + dayText + numberOfLocations + locationText;

  canvasAdaptor.drawText(
    basicTripInfo,
    {
      y: tripNameNodeBbox.y + tripNameNodeBbox.height + 5,
      x: w / 2,
    },
    {
      color: globalConfig.header.tripDescription.color,
      font: globalConfig.header.tripDescription.font,
      fontSize: globalConfig.header.tripDescription.fontSize,
      textAnchor: globalConfig.header.tripDescription.textAnchor,
      wrapNumber: w - globalConfig.infographic.paddingLeftRight * 2,
    }
  );
}

async function drawContent(
  canvasAdaptor,
  location,
  startPointCoordinate,
  locale
) {
  const startPoint_px = startPointCoordinate.x,
    startPoint_py = startPointCoordinate.y;

  const feelingLabel = commonFunc.getFeelingLabel(locale);

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

  const locationName_px = startPoint_px,
    locationName_py = startPoint_py;

  const locationNameNode = canvasAdaptor.drawText(
    locationName.toUpperCase(),
    {
      y: locationName_py,
      x: locationName_px,
    },
    {
      color: globalConfig.location.name.color,
      font: globalConfig.location.name.font,
      fontSize: globalConfig.location.name.fontSize,
      fontWeight: globalConfig.location.name.fontWeight,
      textAnchor: globalConfig.location.name.textAnchor,
      textTransform: globalConfig.location.name.textTransform,
      wrapNumber: w / 2 - globalConfig.imageContainer.paddingBetweenImage * 4,
    }
  );
  const locationNameNodeBbox = locationNameNode.bounds;
  let nextElementYCoordinate =
    locationNameNodeBbox.y + locationNameNodeBbox.height;

  if (nodeFeelingActivity) {
    const feelingActivityNode = canvasAdaptor.drawText(
      nodeFeelingActivity,
      {
        y: nextElementYCoordinate + globalConfig.location.paddingTop,
        x: locationName_px,
      },
      {
        color: globalConfig.location.description.color,
        font: globalConfig.location.description.font,
        fontSize: globalConfig.location.description.fontSize,
        textAnchor: globalConfig.location.description.textAnchor,
        wrapNumber: w / 2 - globalConfig.imageContainer.paddingBetweenImage * 4,
      }
    );
    const feelingActivityNodeBbox = feelingActivityNode.bounds;
    nextElementYCoordinate =
      feelingActivityNodeBbox.y + feelingActivityNodeBbox.height;
  }

  if (highlights) {
    const hightlightNode = canvasAdaptor.drawText(
      highlights,
      {
        y: nextElementYCoordinate + globalConfig.location.paddingTop,
        x: locationName_px,
      },
      {
        color: globalConfig.location.description.color,
        font: globalConfig.location.description.font,
        fontSize: globalConfig.location.description.fontSize,
        textAnchor: globalConfig.location.description.textAnchor,
        wrapNumber: w / 2 - globalConfig.imageContainer.paddingBetweenImage * 4,
      }
    );
    const highlightNodeBbox = hightlightNode.bounds;
    nextElementYCoordinate = highlightNodeBbox.y + highlightNodeBbox.height;
  }

  return nextElementYCoordinate;
}

async function drawFooter(canvasAdaptor) {
  await canvasAdaptor.drawImage("data/images/App_Signature.png", {
    x: w - globalConfig.footer.marginRight,
    y: h - globalConfig.footer.marginBottom,
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function onLoadImage(canvasAdaptor, imageResult, url, coordinate, index) {
  let ratio = imageResult.width / imageResult.height,
    viewBoxWidth = globalConfig.imageContainer.viewBoxWidth,
    viewBoxHeight = globalConfig.imageContainer.viewBoxHeight,
    width = viewBoxWidth,
    height = viewBoxHeight;

  if (ratio >= 1) {
    width = height * ratio;
  } else {
    height = width / ratio;
  }
}

async function draw(canvasAdaptor, trip) {
  drawHeader(canvasAdaptor, trip);

  const locationNoImage = trip.locations.find(
    (item) => item.signedUrl == "" || _.isEmpty(item.signedUrl)
  );

  if (locationNoImage) {
    // load default image if location has no image
    trip.locations = trip.locations.map((item) => {
      return {
        ...item,
        signedUrl: item.signedUrl
          ? item.signedUrl
          : "./data/images/EmptyImage02.jpg",
      };
    });
  }

  const promise01 = canvasAdaptor
    .drawImage(
      trip.locations[0].signedUrl,
      {
        x: globalConfig.infographic.paddingLeftRight,
        y: 170 + globalConfig.imageContainer.paddingTop,
      },
      {
        width: globalConfig.imageContainer.svgWidth,
        height: globalConfig.imageContainer.svgHeight,
        clipPath: globalConfig.imageContainer.clipPath,
      }
    )
    .then((imageResult) =>
      onLoadImage(canvasAdaptor, imageResult, trip.locations[0].signedUrl, {
        x: globalConfig.infographic.paddingLeftRight,
        y: 170 + globalConfig.imageContainer.paddingTop,
      })
    );

  const promise02 = canvasAdaptor
    .drawImage(
      trip.locations[1].signedUrl,
      {
        x: w / 2 + globalConfig.imageContainer.paddingBetweenImage,
        y: 170 + globalConfig.imageContainer.paddingTop,
      },
      {
        width: globalConfig.imageContainer.svgWidth,
        height: globalConfig.imageContainer.svgHeight,
        clipPath: globalConfig.imageContainer.clipPath,
      }
      // 1
    )
    .then((imageResult) =>
      onLoadImage(
        canvasAdaptor,
        imageResult,
        trip.locations[1].signedUrl,
        {
          x: w / 2 + globalConfig.imageContainer.paddingBetweenImage,
          y: 170 + globalConfig.imageContainer.paddingTop,
        },
        1
      )
    );

  await Promise.all([promise01, promise02]);

  const firstLatestHeight = await drawContent(
    canvasAdaptor,
    trip.locations[0],
    {
      x: globalConfig.infographic.paddingLeftRight,
      y: 1100,
    },
    trip.locale
  );

  const secondLatestHeight = await drawContent(
    canvasAdaptor,
    trip.locations[1],
    {
      x: w / 2 + globalConfig.imageContainer.paddingBetweenImage * 4,
      y: 1100,
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
  draw: draw,
};
