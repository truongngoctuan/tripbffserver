import { EventHandler, TripEvent } from "../events";
import { TripReducers } from "../reducers/_tripReducer";
import { ServiceBus } from "../TripServiceBus";
import { Succeed } from "../../../../_shared/utils";
import _ from "lodash";
import { IExtraParams } from "./_commandHandler";

// todo move to infographic folder
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

  var jobExportInfo = {
    ownerId,
    tripId,
    infographicId,
    name: trip.name,
    toDate: trip.toDate,
    fromDate: trip.fromDate,
    locations: trip.locations.map(item => {
      return {
        name: item.name,
        fromTime: item.fromTime,
        toTime: item.toTime,
        feeling: item.feeling ? item.feeling.label : "",
        activity: item.activity ? item.activity.label : "",
        highlights: item.highlights ? item.highlights.map(h => h.label) : []
      }
    })
  }
  
  extraParams.jobDispatcher.dispatch(jobExportInfo);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}
