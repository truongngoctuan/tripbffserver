import { EventHandler, TripEvent } from "../events";
import { TripReducers } from "../reducers/_tripReducer";
import { ServiceBus } from "../TripServiceBus";
import { Succeed } from "../../../../_shared/utils";
import _ from "lodash";
import { IExtraParams } from "./_commandHandler";
import { IoC } from "../../../IoC";
import { resolveSignOnlyThumbnailImageUrlFromExternalStorageId } from "../ImageUrlResolver";

// todo move to infographic folder
export type ExportInfographicCommand = {
  type: "exportInfographic";
  ownerId: string;
  tripId: string;
  infographicId: string;
  locale: string;
};

export async function exportInfographic(
  command: ExportInfographicCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus,
  extraParams: IExtraParams,
) {
  const { ownerId, tripId, infographicId, locale } = command;

  const trip = await reducers.getCurrentState(tripId);
  if (!trip) throw "trip not found";

  const event: TripEvent = {
    type: "InfographicCreated",
    ownerId,
    tripId,
    infographicId,
  };

  eventHandler.save(event);

  const jobExportInfo = {
    ownerId,
    tripId,
    infographicId,
    name: trip.name,
    toDate: trip.toDate,
    fromDate: trip.fromDate,
    locale,
    locations: await Promise.all(trip.locations.map(async item => {
      let imageId = undefined,
          signedUrl = "";

      const favoriteImages = item.images.filter(img => img.isFavorite);

      if (favoriteImages.length > 0) {
        imageId = favoriteImages[0].externalStorageId;
      } else if (item.images.length > 0) {
        imageId = item.images[0].externalStorageId;
      }

      if (imageId) {
        // build thumbnail on the flight
        const { fileInfo } = await IoC.fileService.getInfoById(imageId);
        await IoC.imageService.saveThumbnail(fileInfo.path, 400, 400);

        signedUrl = resolveSignOnlyThumbnailImageUrlFromExternalStorageId(imageId);
      }

      let feeling = "",
          activity = "",
          highlights: Array<string> = [];

      if(item.feeling) {
        feeling = (item.feeling as any)["label_" + locale];
      }

      if (item.activity) {
        activity = (item.activity as any)["label_" + locale];
      }

      if (item.highlights) {
        highlights = item.highlights.map(h => {
          return (h as any)["label_" + locale];
        });
      }

      return {
        locationId: item.locationId,
        name: item.name,
        fromTime: item.fromTime,
        toTime: item.toTime,
        feeling,
        activity,
        highlights,
        signedUrl,
      };
    })),
  };

  extraParams.jobDispatcher.dispatch(jobExportInfo);

  // update read store synchronously
  await emitter.emit(event);

  return Succeed();
}
