import { ITrip, IFeeling } from "../models/ITrip";
import { IFeelingRepository } from "../models/IFeelingRepository";

export class DataSourceQueryHandler {
  constructor(private FeelingRepository: IFeelingRepository) {}

  async getFeelingById(id: number): Promise<IFeeling | undefined> {
    return this.FeelingRepository.get(id);
  }

  async getFeelings(): Promise<IFeeling[]> {
    var results = this.FeelingRepository.list();
    return results;
  }
};