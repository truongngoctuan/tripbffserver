import { ITrip } from "../models/ITrip";
import { IUserTripRepository } from "../../_infrastructures/repositories/IUserTripRepository";
import { Moment } from "moment";
import { IGrowthChart, IGrowthChartItem } from "../models/IGrowthChart";

export class UserTripQueryHandler {
  constructor(private UserTripRepository: IUserTripRepository) { }  

  async getGrowthCharts(fromDate: Moment, toDate: Moment): Promise<IGrowthChart> {
    let userTrips =  this.UserTripRepository.list(fromDate, toDate);    
    let data: IGrowthChart = {
      totalUsers: [],
      totalFacebookUsers: [],
      totalCreatedTripUsers: [],
      totalExportedInfographicUsers: [],
      totalShareInfographicUsers: []
    };
    return data;
  }  
};