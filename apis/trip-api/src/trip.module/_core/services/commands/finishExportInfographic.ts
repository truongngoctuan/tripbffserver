import { EventHandler, TripEvent } from "../TripEvent";
import { TripReducers } from "../reducers/_tripReducer";
import { ServiceBus } from "../TripServiceBus";
import { Succeed } from "../../../_shared/utils";
import _ from "lodash";

export type FinishExportInfographicCommand = {
  type: "finishExportInfographic";
  ownerId: string;
  tripId: string;
  infographicId: string;
  externalStorageId: string;
};

export async function finishExportInfographic(
  command: FinishExportInfographicCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { ownerId, tripId, infographicId, externalStorageId } = command;

  const trip = await reducers.getCurrentState(tripId);
  if (!trip) throw "trip not found";

  var event: TripEvent = {
    type: "InfographicExported",
    ownerId,
    tripId,
    infographicId,
    externalStorageId
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}
