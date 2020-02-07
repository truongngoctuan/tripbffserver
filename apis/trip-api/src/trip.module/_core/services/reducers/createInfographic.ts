import { ITrip, IInfographic } from "../../models/ITrip";
import { InfographicCreatedEvent } from "../events";

export default function createInfographic(
  prevState: ITrip,
  command: InfographicCreatedEvent
): ITrip {
  const newInfographic: IInfographic = {
    infographicId: command.infographicId,
    status: "CREATED"
  };

  return {
    ...prevState,
    infographics: [...prevState.infographics, newInfographic]
  };
}
