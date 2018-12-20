import { Stream } from "stream";
import fs from "fs";
import { EventHandler, TripEvent } from "../TripEvent";
import { TripReducers } from "../reducers/_tripReducer";
import { ServiceBus } from "../TripServiceBus";
import { CommandResult, Succeed } from "../../../_shared/utils";
import _ from "lodash";
import { assert } from "joi";
import { JobDispatcher } from "../../infrastructures/JobDispatcher";

export type ExportInfographicCommand = {
  type: "exportInfographic";
  tripId: string;
  infographicId: string;
};

export async function exportInfographic(
  command: ExportInfographicCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { tripId, infographicId } = command;

  const trip = await reducers.getCurrentState(tripId);
  if (!trip) throw "trip not found";

  var event: TripEvent = {
    type: "InfographicCreated",
    tripId,
    infographicId,
  };

  eventHandler.save(event);

  //todo trigger job to export infographic
  var jobDispatcher = new JobDispatcher();
  jobDispatcher.dispatch(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}
