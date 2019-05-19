import { ITripsRepository, ITripMinimized } from "../models/ITripsRepository";
import { resolveThumbnailImageUrlFromExternalStorageId } from "./ImageUrlResolver";

export class MinimizedTripQueryHandler {
  constructor(private TripsRepository: ITripsRepository) { }

  async list(ownerId: string): Promise<ITripMinimized[]> {
    return this.TripsRepository.list(ownerId)
      .then(trips => {
        return trips.map(trip => this.updateTripImageExternalUrl(trip));
      });
  }

  private updateTripImageExternalUrl(trip: ITripMinimized) {
    if (!trip) return trip;
    trip.locationImages = trip.locationImages.map(locationImage => {
      return {
        name: locationImage.name,
        address: locationImage.address,
        description: locationImage.description,
        imageUrl: locationImage.imageUrl === "" ? "" : resolveThumbnailImageUrlFromExternalStorageId(locationImage.imageUrl),
      }
    });
    return trip;
  }
};