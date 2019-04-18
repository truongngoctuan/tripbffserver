import { IActivity, IFeeling, IHighlight } from "../models/ITrip";
import { IFeelingRepository } from "../models/IFeelingRepository";
import { IActivityRepository } from "../models/IActivityRepository";
import { IHighlightRepository } from "../models/IHighlightRepository";

export class DataSourceQueryHandler {
  constructor(
    private FeelingRepository: IFeelingRepository,
    private ActivityRepository: IActivityRepository,
    private HighlightRepository: IHighlightRepository) {}

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
};