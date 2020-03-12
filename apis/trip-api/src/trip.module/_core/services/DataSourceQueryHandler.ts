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
    const results = this.FeelingRepository.list();
    return results;
  }

  async getActivityById(id: number): Promise<IActivity | undefined> {
    return this.ActivityRepository.get(id);
  }

  async getActivities(): Promise<IActivity[]> {
    const results = this.ActivityRepository.list();
    return results;
  }

  async getHighlightById(id: number): Promise<IHighlight | undefined> {
    return this.HighlightRepository.get(id);
  }

  async getHighlights(): Promise<IHighlight[]> {
    const results = this.HighlightRepository.list();
    return results;
  }

  async getSearchLocations(query: string): Promise<ISearchLocation[]> {
    const results = this.SearchLocationRepository.list(query);
    return results;
  }

  async getTopNearerLocationsByCoordinate(lat: number, long: number): Promise<ISearchLocation[]> {
    const locations = await this.SearchLocationRepository.list("");    
    const sortLocations: any[] = [];

    locations.forEach(location => {
      const distance = calculateDistance(lat, long, location.lat, location.long);         
      sortLocations.push({
        distance: distance,
        location: location
      });      
    });
    
    sortLocations.sort(compareLocation);

    const topNearerLocations = sortLocations.slice(0, 4).map(lo => 
      {
        return lo.location;
      }
    );

    return topNearerLocations;
  }
};

  function compareLocation(a: any, b: any) {
    return a.distance - b.distance;
  }