import { InfographicConfig } from "../../../configs/index";
import { CanvasAdaptor } from "../../utils";
import { getRelativePosition } from "./utils";
const commonFunc = require("../../commonFunc");
const _ = require("lodash");

export async function componentText(
  baseFuncs: Function[],
  canvasAdaptor: CanvasAdaptor,
  blockConfig: InfographicConfig.TextBlock,
  cursor,
  trip
) {
  const paper = canvasAdaptor.getPaper();

  const text = getText(blockConfig, trip, cursor);
  const newCursor = renderTextBlock(canvasAdaptor, blockConfig, text, cursor);

  if (_.isEmpty(baseFuncs)) return newCursor;

  const lastBaseFunc = baseFuncs[baseFuncs.length - 1];
  return lastBaseFunc(
    baseFuncs.slice(0, baseFuncs.length - 1),
    canvasAdaptor,
    blockConfig,
    newCursor
  );
}
function renderTextBlock(
  canvasAdaptor,
  blockConfig: InfographicConfig.TextBlock,
  text: string,
  cursor
) {
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

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getText(blockConfig: InfographicConfig.TextBlock, trip, cursor) {
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
  return text;
}
