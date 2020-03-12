import { ITrip } from "../../models/ITrip";
import { InfographicSharedEvent } from "../events";
import _ from "lodash";

export default function finishShareInfographic(
  prevState: ITrip,
  command: InfographicSharedEvent
): ITrip {
  const imageIdx = _.findIndex(
    prevState.infographics,
    info => info.infographicId == command.infographicId
  );
  const infographic = prevState.infographics[imageIdx];
  infographic.status = "SHARED";

  return {
    ...prevState,
    infographics: [
      ...prevState.infographics.slice(0, imageIdx),
      infographic,
      ...prevState.infographics.slice(imageIdx + 1)
    ]
  };
}
