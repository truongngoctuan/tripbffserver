import { InfographicConfig } from "../../../configs";
import { LeafTransformer } from "./typings";

export const leafText: LeafTransformer = {
  type: "leaf",
  handler: (c: InfographicConfig.Block, trip, cursor) => {
    const textNode = c as InfographicConfig.TextBlock;

    return {
      ...c,
      text: getText(textNode, trip, cursor)
    } as InfographicConfig.Block;
  }
}

const commonFunc = require("../../commonFunc");

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
