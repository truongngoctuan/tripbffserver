import { EventHandler, TripEvent } from "../TripEvent";
import { TripReducers } from "../reducers/_tripReducer";
import { ServiceBus } from "../TripServiceBus";
import { Succeed } from "../../../_shared/utils";
import _ from "lodash";
import { IExtraParams } from "./_commandHandler";

export type ExportInfographicCommand = {
  type: "exportInfographic";
  ownerId: string;
  tripId: string;
  infographicId: string;
};

export async function exportInfographic(
  command: ExportInfographicCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus,
  extraParams: IExtraParams
) {
  const { ownerId, tripId, infographicId } = command;

  const trip = await reducers.getCurrentState(tripId);
  if (!trip) throw "trip not found";

  var event: TripEvent = {
    type: "InfographicCreated",
    ownerId,
    tripId,
    infographicId
  };

  eventHandler.save(event);

  extraParams.jobDispatcher.dispatch(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}
