import { ITripsRepository, ITripMinimized } from "../models/ITripsRepository";
import { resolveThumbnailImageUrlFromExternalStorageId } from "./ImageUrlResolver";

export class MinimizedTripQueryHandler {
  constructor(private TripsRepository: ITripsRepository) { }

  compareTrip = (firstEle: ITripMinimized, secondEle: ITripMinimized) => {
    if (firstEle.fromDate > secondEle.fromDate)
        return -1;
    
      if (firstEle.fromDate < secondEle.fromDate)
        return 1;

    return 0;
  }

  async list(ownerId: string): Promise<ITripMinimized[]> {
    return this.TripsRepository.list(ownerId)
      .then(trips => {
        let allTrips = trips.map(trip => this.updateTripImageExternalUrl(trip));
        allTrips = allTrips.filter(item => item.isDeleted != true);
        allTrips.sort(this.compareTrip);
        return allTrips;
      });
  }

  async getById(ownerId: string, tripId: string): Promise<ITripMinimized | undefined> {
    return this.TripsRepository.getById(ownerId, tripId)
      .then(trip => {
        return trip ? this.updateTripImageExternalUrl(trip) : undefined;
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
      };
    });
    return trip;
  }
};