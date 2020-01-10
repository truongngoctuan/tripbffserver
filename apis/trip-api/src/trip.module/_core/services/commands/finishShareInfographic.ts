import { EventHandler, TripEvent } from "../events";
import { TripReducers } from "../reducers/_tripReducer";
import { ServiceBus } from "../TripServiceBus";
import { Succeed } from "../../../../_shared/utils";
import _ from "lodash";

// todo move to infographic folder
export type FinishShareInfographicCommand = {
  type: "finishShareInfographic";
  ownerId: string;
  tripId: string;
  infographicId: string;
};

export async function finishShareInfographic(
  command: FinishShareInfographicCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { ownerId, tripId, infographicId } = command;

  const trip = await reducers.getCurrentState(tripId);
  if (!trip) throw "trip not found";

  const event: TripEvent = {
    type: "InfographicShared",
    ownerId,
    tripId,
    infographicId
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}
