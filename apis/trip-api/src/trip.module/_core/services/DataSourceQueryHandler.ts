import { IActivity, IFeeling, IHighlight } from "../models/ITrip";
import { IFeelingRepository } from "../models/IFeelingRepository";
import { IActivityRepository } from "../models/IActivityRepository";
import { IHighlightRepository } from "../models/IHighlightRepository";
import { ISearchLocationRepository } from "../models/ISearchLocationRepository";
import { ISearchLocation } from "../models/ISearchLocation";
import { calculateDistance } from "../services/CommonService";

export class DataSourceQueryHandler {
  constructor(
    private FeelingRepository: IFeelingRepository,
    private ActivityRepository: IActivityRepository,
    private HighlightRepository: IHighlightRepository,
    private SearchLocationRepository: ISearchLocationRepository) {}

  async getFeelingById(id: number): Promise<IFeeling | undefined> {
    return this.FeelingRepository.get(id);
  }

  async getFeelings(): Promise<IFeeling[]> {
    var results = this.FeelingRepository.list();
    return results;
  }

  async getActivityById(id: number): Promise<IActivity | undefined> {
    return this.ActivityRepository.get(id);
  }

  async getActivities(): Promise<IActivity[]> {
    var results = this.ActivityRepository.list();
    return results;
  }

  async getHighlightById(id: number): Promise<IHighlight | undefined> {
    return this.HighlightRepository.get(id);
  }

  async getHighlights(): Promise<IHighlight[]> {
    var results = this.HighlightRepository.list();
    return results;
  }

  async getSearchLocations(query: string): Promise<ISearchLocation[]> {
    var results = this.SearchLocationRepository.list(query);
    return results;
  }

  async getNearestLocationByCoordinate(lat: number, long: number): Promise<ISearchLocation | undefined> {
    let locations = await this.SearchLocationRepository.list("");
    let nearestLocation = undefined;
    let smallestDistance = 0;
    let index = 0;

    locations.forEach(location => {
      let distance = calculateDistance(lat, long, location.lat, location.long);

      if (index == 0)
        smallestDistance = distance;
      else {
        if (distance < smallestDistance)
        {
          smallestDistance = distance;
          nearestLocation = location;
        }
      }      

      index++;
    });

    return nearestLocation;
  }
};