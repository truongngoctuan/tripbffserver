import { ILogin } from "./IUser";
import { ITrip } from "./ITrip";

export interface IGrowthChartItem {
  x: string;
  y: number;
}

export interface IGrowthChart {
  category: string;
  data: Array<IGrowthChartItem>;
}