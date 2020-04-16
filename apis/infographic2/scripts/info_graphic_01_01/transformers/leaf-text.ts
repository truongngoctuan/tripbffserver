import { InfographicConfig } from "../../../configs";
import { LeafTransformer } from "./typings";
import { scaleBlock } from "../utils";

export const leafText: LeafTransformer = {
  type: "leaf",
  handler: (c, trip, cursor) => {
    const textNode = scaleBlock(c, cursor.scale) as InfographicConfig.TextBlock;

    return {
      ...c,
      text: getText(textNode, trip, cursor),
    } as InfographicConfig.Block;
  },
};

const commonFunc = require("../../commonFunc");

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getText(blockConfig: InfographicConfig.TextBlock, trip, cursor) {
  const feelingLabel = commonFunc.getFeelingLabel(trip.locale);

  let location = trip.locations[cursor.location],
    locationName = capitalizeFirstLetter(location.name) + ".",
    feeling = location.feeling ? feelingLabel + " " + location.feeling : "",
    activity = location.activity,
    highlights = location.highlights.toLowerCase(),
    textActivity = "",
    textFeeling = "";

  if (activity) {
    textActivity = capitalizeFirstLetter(activity.toLowerCase());
  }

  if (feeling) {
    feeling = capitalizeFirstLetter(feeling.toLowerCase());
    textFeeling = textFeeling ? textFeeling + ". " + feeling : feeling;
  }
  if (textFeeling) textFeeling += ".";

  if (highlights) highlights = capitalizeFirstLetter(highlights) + ".";

  let text = blockConfig.text;
  if (text === "{{location.name}}") {
    text = locationName;
  }
  if (text === "{{location.activity}}") {
    text = textActivity;
  }
  if (text === "{{location.feeling}}") {
    text = textFeeling;
  }
  if (text === "{{location.hight-lights}}") {
    text = highlights;
  }
  if (text === "{{trip.name}}") {
    text = trip.name;
  }
  if (text === "{{trip.info}}") {
    const numberOfDays = trip.numberOfDays,
      numberOfLocations = trip.locations.length,
      dayLabel = commonFunc.getDayLabel(trip.locale, numberOfDays),
      locationLabel = commonFunc.getLocationLabel(
        trip.locale,
        numberOfLocations
      );

    const dayText = " " + dayLabel + ", ",
      locationText = " " + locationLabel,
      basicTripInfo = numberOfDays + dayText + numberOfLocations + locationText;

    text = basicTripInfo;
  }
  return text;
}
