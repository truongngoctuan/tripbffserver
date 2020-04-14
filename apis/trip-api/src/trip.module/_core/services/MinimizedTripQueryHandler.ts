import { ITripsRepository, ITripMinimized } from "../models/ITripsRepository";
import { resolveThumbnailImageUrlFromExternalStorageId } from "./ImageUrlResolver";
import _ from "lodash";
import { NumberOfTrips } from "./Constants";

export class MinimizedTripQueryHandler {
  constructor(private TripsRepository: ITripsRepository) {}

  compareTrip = (firstEle: ITripMinimized, secondEle: ITripMinimized) => {
    if (firstEle.fromDate > secondEle.fromDate) return -1;

    if (firstEle.fromDate < secondEle.fromDate) return 1;

    return 0;
  };  

  async list(ownerId: string): Promise<ITripMinimized[]> {
    return this.TripsRepository.list(ownerId).then(trips => {
      let allTrips = trips.map(trip => this.updateTripImageExternalUrl(trip));
      allTrips = allTrips.filter(item => item.isDeleted != true);
      allTrips.sort(this.compareTrip);
      return allTrips;
    });
  }

  async listNewsFeed(loggedUserId: string, page: number): Promise<ITripMinimized[]> {
    return this.TripsRepository.listNewsFeed(loggedUserId, page, NumberOfTrips).then(trips => {
      let allTrips = trips.map(trip => this.updateTripImageExternalUrl(trip));
      return allTrips;
    });
  }

  async getById(
    ownerId: string,
    tripId: string
  ): Promise<ITripMinimized | undefined> {
    return this.TripsRepository.getById(ownerId, tripId).then(trip => {
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
        imageUrl:
          locationImage.imageUrl === "" || !locationImage.imageUrl
            ? undefined
            : resolveThumbnailImageUrlFromExternalStorageId(
                locationImage.imageUrl
              )
      };
    });
    return trip;
  }
}
