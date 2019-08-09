import { EventHandler, TripEvent } from "../events";
import { TripReducers } from "../reducers/_tripReducer";
import { ServiceBus } from "../TripServiceBus";
import { Succeed } from "../../../../_shared/utils";
import _ from "lodash";
import { IExtraParams } from "./_commandHandler";
import { IoC } from "../../../IoC";

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
    locations: await Promise.all(trip.locations.map(async item => {      
      let imageId = undefined,
          signedUrl = "";

      let favoriteImages = item.images.filter(img => img.isFavorite);

      if (favoriteImages.length > 0)
        imageId = favoriteImages[0].externalStorageId;
      else if (item.images.length > 0)
        imageId = item.images[0].externalStorageId;

      if (imageId) {
        let { fileInfo } = await IoC.fileService.getInfoById(imageId);    
        signedUrl = await IoC.fileService.signGet(fileInfo.fileName, 350);
      }

      return {
        locationId: item.locationId,
        name: item.name,
        fromTime: item.fromTime,
        toTime: item.toTime,
        feeling: item.feeling ? item.feeling.label_vi : "", //TODO: based on locale of user: to use vi or en. Default for now is vi.
        activity: item.activity ? item.activity.label_vi : "", //TODO: based on locale of user: to use vi or en. Default for now is vi.
        highlights: item.highlights ? item.highlights.map(h => h.label_vi) : [], //TODO: based on locale of user: to use vi or en. Default for now is vi.
        signedUrl: signedUrl
      }
    })) 
  }  

  extraParams.jobDispatcher.dispatch(jobExportInfo);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}
