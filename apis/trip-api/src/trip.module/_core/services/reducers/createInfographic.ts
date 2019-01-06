import { ITrip, IInfographic, InfographicStatus } from "../../models/ITrip";
import { InfographicCreatedEvent } from "../TripEvent";

export default function createInfographic(
  prevState: ITrip,
  command: InfographicCreatedEvent
): ITrip {
  var newInfographic: IInfographic = {
    infographicId: command.infographicId,
    status: InfographicStatus.Created
  };

  return {
    ...prevState,
    infographics: [...prevState.infographics, newInfographic]
  };
}
