import { LeafTransformer } from "./typings";
import { scaleBlock } from "../utils";
import { InfographicRendererConfig } from "../plugins/index.renderer";

export const leafText: LeafTransformer = {
  type: "leaf",
  handler: (c, trip, cursor) => {
    const textNode = scaleBlock(
      c,
      cursor.scale
    ) as InfographicRendererConfig.TextBlock;

    return {
      ...c,
      text: getText(textNode, trip, cursor),
    } as InfographicRendererConfig.Block;
  },
};

import * as commonFunc from "../../commonFunc";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getText(
  blockConfig: InfographicRendererConfig.TextBlock,
  trip,
  cursor
) {
  const feelingLabel = commonFunc.getFeelingLabel(trip.locale);

  const location = trip.locations[cursor.location];
  const locationName = capitalizeFirstLetter(location.name) + ".";
  let feeling = location.feeling ? feelingLabel + " " + location.feeling : "";
  const activity = location.activity;
  let highlights = location.highlights.toLowerCase();
  let textActivity = "";
  let textFeeling = "";

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
