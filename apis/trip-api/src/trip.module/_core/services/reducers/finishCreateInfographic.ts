import { ITrip } from "../../models/ITrip";
import { InfographicExportedEvent } from "../events";
import _ from "lodash";

export default function finishCreateInfographic(
  prevState: ITrip,
  command: InfographicExportedEvent
): ITrip {
  var imageIdx = _.findIndex(
    prevState.infographics,
    info => info.infographicId == command.infographicId
  );
  var infographic = prevState.infographics[imageIdx];
  infographic.externalStorageId = command.externalStorageId;
  infographic.status = "EXPORTED";

  return {
    ...prevState,
    infographics: [
      ...prevState.infographics.slice(0, imageIdx),
      infographic,
      ...prevState.infographics.slice(imageIdx + 1)
    ]
  };
}
