import { ITrip } from "../models/ITrip";
import { ITripRepository } from "../models/ITripRepository";
import { resolveImageUrlFromExternalStorageId, resolveThumbnailImageUrlFromExternalStorageId } from "./ImageUrlResolver";

export class TripQueryHandler {
  constructor(private TripRepository: ITripRepository) { }

  async GetById(ownerId: string, id: string): Promise<ITrip | undefined> {
    return this.TripRepository.get(ownerId, id)
      .then(trip => {
        if (!trip) return trip;
        return this.updateTripImageExternalUrl(trip);
      });
  }

  async list(ownerId: string): Promise<ITrip[]> {
    return this.TripRepository.list(ownerId)
      .then(trips => {
        return trips.map(trip => this.updateTripImageExternalUrl(trip));
      });
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
    console.log("trip location", trip.locations[0]);
    return trip;
  }
};