import { InfographicConfig } from "../../../configs";
import { LeafTransformer } from "./typings";
import _ from "lodash";

export const leafLocationImage: LeafTransformer = {
  type: "leaf",
  handler: (c, trip, cursor) => {
    const locationImageNode = c as InfographicConfig.LocationImageBlock;

    var imgUri =
    trip.locations[cursor.location].signedUrl &&
    !_.isEmpty(trip.locations[cursor.location].signedUrl)
      ? trip.locations[cursor.location].signedUrl
      : "./data/images/EmptyImage01.jpg";

    return {
      ...c,
      type: "image",
      url: imgUri
    } as InfographicConfig.Block;
  }
}