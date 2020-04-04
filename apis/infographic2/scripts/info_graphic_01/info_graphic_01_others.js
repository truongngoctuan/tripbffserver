//follow this demo
//      https://blog.adioma.com/how-to-create-timeline-infographic/

// draw basic shape
// https://www.dashingd3js.com/svg-basic-shapes-and-d3js

const config_infographic_01 = require("../../configs/info_graphic_01/config");
const commonFunc = require("../commonFunc");
const _ = require("lodash");
let globalConfig = {};
let w = 940;
let h = 1500;

function drawHeader(canvasAdaptor, trip) {
  canvasAdaptor.drawRect({
    x: 0,
    y: 0,
    width: w,
    height: globalConfig.header.height,
    backgroundColor: globalConfig.header.background,
  });

  const tripNameNode = canvasAdaptor.drawText(
    trip.name,
    {
      y: globalConfig.header.tripName.paddingTop,
      x: w / 2,
    },
    {
      color: globalConfig.header.tripName.color,
      font: globalConfig.header.tripName.font,
      fontSize: globalConfig.header.tripName.fontSize,
      textAnchor: globalConfig.header.tripName.textAnchor,
      textTransform: globalConfig.header.tripName.textTransform,
      wrapNumber: w - globalConfig.infographic.paddingLeftRight * 2,
    }
  );
  const tripNameNodeBbox = tripNameNode.bounds;
  const numberOfLocations = trip.locations.length,
    dayLabel = commonFunc.getDayLabel(trip.locale, trip.numberOfDays),
    locationLabel = commonFunc.getLocationLabel(trip.locale, numberOfLocations);

  const basicTripInfo =
    trip.numberOfDays +
    " " +
    dayLabel +
    ", " +
    numberOfLocations +
    " " +
    locationLabel;

  canvasAdaptor.drawText(
    basicTripInfo,
    {
      y:
        tripNameNodeBbox.y +
        tripNameNodeBbox.height +
        globalConfig.header.tripDescription.paddingTop,
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

function drawNodesInPath(canvasAdaptor, numberOfLocations) {
  for (let idx = 0; idx < numberOfLocations; idx++) {
    const px = w / 2,
      py =
        globalConfig.header.height +
        globalConfig.content.paddingTop +
        idx * globalConfig.content.itemHeight;

    canvasAdaptor.drawCircle({
      x: px,
      y: py,
      r: globalConfig.content.circleRadius,
      fillColor: globalConfig.content.nodeColor,
    });
  }
}

function drawPathBetweenLocations(canvasAdaptor, numberOfLocations) {
  const x1 = w / 2,
    y1 = globalConfig.header.height + globalConfig.content.paddingTop,
    x2 = x1,
    y2 = h - globalConfig.content.paddingBottom - globalConfig.footer.height;

  canvasAdaptor.drawLine({
    x1,
    y1,
    x2,
    y2,
    strokeColor: globalConfig.content.pathStroke,
    strokeWidth: globalConfig.content.pathStrokeWidth,
  });

  drawNodesInPath(canvasAdaptor, numberOfLocations);
}

function drawContent(canvasAdaptor, trip, numberOfLocations) {
  const startPoint_px = w / 2,
    startPoint_py =
      globalConfig.header.height + globalConfig.content.paddingTop;

  const locationImageCoordinates = [];

  for (let idx = 0; idx < numberOfLocations; idx++) {
    let location = trip.locations[idx],
      locationName = capitalizeFirstLetter(location.name) + ".",
      feelingLabel = commonFunc.getFeelingLabel(trip.locale),
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

    if (idx % 2 == 0) {
      const locationName_px = startPoint_px + globalConfig.location.paddingPath,
        locationName_py = startPoint_py + idx * globalConfig.content.itemHeight;

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
          textAnchor: globalConfig.location.name.textAnchorEven,
          textTransform: globalConfig.location.name.textTransform,
          wrapNumber:
            w / 2 -
            globalConfig.location.paddingPath -
            globalConfig.infographic.paddingLeftRight,
        }
      );
      const locationNameNodeBbox = locationNameNode.bounds;
      let nextElementYCoordinate =
        locationNameNodeBbox.y +
        locationNameNodeBbox.height +
        globalConfig.location.linePadding;

      if (nodeFeelingActivity) {
        const feelingActivityNode = canvasAdaptor.drawText(
          nodeFeelingActivity,
          {
            y: nextElementYCoordinate,
            x: locationName_px,
          },
          {
            color: globalConfig.location.description.color,
            font: globalConfig.location.description.font,
            fontSize: globalConfig.location.description.fontSize,
            textAnchor: globalConfig.location.description.textAnchorEven,
            wrapNumber:
              w / 2 -
              globalConfig.location.paddingPath -
              globalConfig.infographic.paddingLeftRight * 2,
          }
        );
        const feelingActivityNodeBbox = feelingActivityNode.bounds;
        nextElementYCoordinate =
          feelingActivityNodeBbox.y +
          feelingActivityNodeBbox.height +
          globalConfig.location.linePadding;
      }

      canvasAdaptor.drawText(
        highlights,
        {
          y: nextElementYCoordinate,
          x: locationName_px,
        },
        {
          color: globalConfig.location.description.color,
          font: globalConfig.location.description.font,
          fontSize: globalConfig.location.description.fontSize,
          textAnchor: globalConfig.location.description.textAnchorEven,
          wrapNumber:
            w / 2 -
            globalConfig.location.paddingPath -
            globalConfig.infographic.paddingLeftRight * 2,
        }
      );

      locationImageCoordinates.push({
        x:
          locationName_px -
          globalConfig.location.paddingPath * 3 -
          globalConfig.location.image.svgWidth,
        y: locationName_py,
        id: location.locationId,
      });
    } else {
      const locationName_px = startPoint_px - globalConfig.location.paddingPath,
        locationName_py = startPoint_py + idx * globalConfig.content.itemHeight;

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
          textAnchor: globalConfig.location.name.textAnchorOdd,
          textTransform: globalConfig.location.name.textTransform,
          wrapNumber:
            w / 2 -
            globalConfig.location.paddingPath -
            globalConfig.infographic.paddingLeftRight,
        }
      );
      const locationNameNodeBbox = locationNameNode.bounds;
      let nextElementYCoordinate =
        locationNameNodeBbox.y +
        locationNameNodeBbox.height +
        globalConfig.location.linePadding;

      if (nodeFeelingActivity) {
        const feelingActivityNode = canvasAdaptor.drawText(
          nodeFeelingActivity,
          {
            y: nextElementYCoordinate,
            x: locationName_px,
          },
          {
            color: globalConfig.location.description.color,
            font: globalConfig.location.description.font,
            fontSize: globalConfig.location.description.fontSize,
            textAnchor: globalConfig.location.description.textAnchorOdd,
            wrapNumber:
              w / 2 -
              globalConfig.location.paddingPath -
              globalConfig.infographic.paddingLeftRight * 2,
          }
        );

        const feelingActivityNodeBbox = feelingActivityNode.bounds;
        nextElementYCoordinate =
          feelingActivityNodeBbox.y +
          feelingActivityNodeBbox.height +
          globalConfig.location.linePadding;
      }

      canvasAdaptor.drawText(
        highlights,
        {
          y: nextElementYCoordinate,
          x: locationName_px,
        },
        {
          color: globalConfig.location.description.color,
          font: globalConfig.location.description.font,
          fontSize: globalConfig.location.description.fontSize,
          textAnchor: globalConfig.location.description.textAnchorOdd,
          wrapNumber:
            w / 2 -
            globalConfig.location.paddingPath -
            globalConfig.infographic.paddingLeftRight * 2,
        }
      );

      locationImageCoordinates.push({
        x: locationName_px + globalConfig.location.paddingPath * 3,
        y: locationName_py,
        id: location.locationId,
      });
    }
  }

  return locationImageCoordinates;
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

function calculateInfographicHeight(numberOfLocations) {
  return (
    globalConfig.header.height +
    globalConfig.content.paddingTop +
    globalConfig.content.itemHeight * numberOfLocations +
    globalConfig.content.paddingBottom +
    globalConfig.footer.height
  );
}

function setGlobalConfig(numberOfLocations) {
  if (numberOfLocations == 3 || numberOfLocations == 4) {
    globalConfig = config_infographic_01.config_01_0304;
  } else if (numberOfLocations == 5 || numberOfLocations == 6) {
    globalConfig = config_infographic_01.config_01_0506;
  } else if (numberOfLocations >= 7) {
    globalConfig = config_infographic_01.config_01_others;
  }
}

async function draw(canvasAdaptor, trip) {
  const numberOfLocations = trip.locations.length;
  setGlobalConfig(numberOfLocations);

  w = globalConfig.infographic.width;
  h = calculateInfographicHeight(numberOfLocations);

  drawHeader(canvasAdaptor, trip);
  drawPathBetweenLocations(canvasAdaptor, numberOfLocations);

  const locationImageCoordinates = drawContent(
    canvasAdaptor,
    trip,
    numberOfLocations
  );
  const promises = [];

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
          : "./data/images/EmptyImageOthers.jpg",
      };
    });
  }
  const startDownload = new Date().getTime();

  trip.locations.forEach((location, index) => {
    const coordinate = locationImageCoordinates[index];
    promises.push(
      canvasAdaptor.drawImage(location.signedUrl, coordinate, {
        width: globalConfig.location.image.svgWidth,
        height: globalConfig.location.image.svgHeight,
        clipPath: globalConfig.location.image.clipPath,
      })
    );
  });

  await Promise.all(promises);
  const strTimer = `TIME ${
    new Date().getTime() - startDownload
  } ms: total images download completed`;
  console.log(strTimer);

  canvasAdaptor.resize(w, h);
  canvasAdaptor.drawBackground(globalConfig.infographic.background);

  await drawFooter(canvasAdaptor);
}

module.exports = {
  draw: draw,
};
