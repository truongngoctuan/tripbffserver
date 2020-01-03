import { ILogin } from "./IUser";
import { ITrip } from "./ITrip";

export interface IGrowthChartItem {
  week: string,
  value: number
}

export interface IGrowthChart {
  totalUsers: Array<IGrowthChartItem>,
  totalFacebookUsers: Array<IGrowthChartItem>,
  totalCreatedTripUsers: Array<IGrowthChartItem>,
  totalExportedInfographicUsers: Array<IGrowthChartItem>,
  totalShareInfographicUsers: Array<IGrowthChartItem>,
}