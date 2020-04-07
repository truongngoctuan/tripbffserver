import { ITrip } from "../models/ITrip";
import { ITripRepository } from "../models/ITripRepository";
import { resolveImageUrlFromExternalStorageId, resolveThumbnailImageUrlFromExternalStorageId } from "./ImageUrlResolver";

export class TripQueryHandler {
  constructor(private TripRepository: ITripRepository) { }

  async GetById(ownerId: string, id: string, createdById: string): Promise<ITrip | undefined> {
    return this.TripRepository.get(ownerId, id, createdById)
      .then(trip => {
        if (!trip) return trip;
      
        if (trip.infographics && trip.infographics.length > 0) {
          let latestExportedInfographics = trip.infographics.filter(item => item.status === "EXPORTED");
          
          if (latestExportedInfographics.length > 0)
              trip.latestExportedExternalStorageId = latestExportedInfographics[latestExportedInfographics.length - 1].externalStorageId;
        }

        return this.updateTripImageExternalUrl(trip);
      });
  }  

  async list(ownerId: string): Promise<ITrip[]> {
    return this.TripRepository.list(ownerId)
      .then(trips => {
        return trips.map(trip => this.updateTripImageExternalUrl(trip));
      });
  }

  async getThumbnailUrlByExternalId(externalId: string): Promise<string> {
    return resolveThumbnailImageUrlFromExternalStorageId(externalId);
  }

  async getExternalUrlByExternalId(externalId: string): Promise<string> {
    return resolveImageUrlFromExternalStorageId(externalId);
  }

  private updateTripImageExternalUrl(trip: ITrip) {
    if (!trip) return trip;
    trip.locations = trip.locations.map(location => {
      location.images = location.images.map(image => {
        if (image.externalStorageId) {
          image.externalUrl = resolveImageUrlFromExternalStorageId(image.externalStorageId);
          image.thumbnailExternalUrl = resolveThumbnailImageUrlFromExternalStorageId(image.externalStorageId);
        }
        return image;
      });

      return location;
    });
    return trip;
  }
};