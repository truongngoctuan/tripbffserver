import { ITrip } from "../models/ITrip";
import { IUserTripRepository } from "../../_infrastructures/repositories/IUserTripRepository";
import { Moment } from "moment";
import { IGrowthChart, IGrowthChartItem } from "../models/IGrowthChart";
import moment = require("moment-timezone");
import { IUserTrip } from "../models/IUserTrip";

export class UserTripQueryHandler {
  constructor(private UserTripRepository: IUserTripRepository) { }  

  async getGrowthCharts(fromDate: Moment, toDate: Moment): Promise<IGrowthChart> {      
    let data: IGrowthChart = {
      totalUsers: [],
      totalFacebookUsers: [],
      totalCreatedTripUsers: [],
      totalExportedInfographicUsers: [],
      totalShareInfographicUsers: []
    };    

    let userTrips : IUserTrip[] = await this.UserTripRepository.list(fromDate, toDate); 
    let iterationDate = fromDate.startOf('day');    
    let dataPerDays = [];
    
    while(iterationDate <= toDate) {
      let userTripsPerDay = 
        userTrips.filter(s => 
          s.logins.filter(lo => lo.loginType === 'DEVICE' &&
            moment(lo.loggedInDate).startOf('day').toDate().getTime() === iterationDate.toDate().getTime()).length > 0);

      var dataPerDay = {
        weekLabel: iterationDate.format('W-GGGG'),
        totalUsers: userTripsPerDay.length,
        totalFacebookUsers: userTripsPerDay.filter(s => s.logins.filter(lo => lo.loginType === 'FACEBOOK').length > 0).length,
        totalCreatedTripUsers: userTripsPerDay.filter(s => s.trips.length > 0).length,
        totalExportedInfographicUsers: userTripsPerDay.filter(s => s.trips.filter(t => t.infographics.length > 0).length > 0).length,
        totalShareInfographicUsers: userTripsPerDay.filter(s => s.trips.filter(t => t.infographics.filter(i => i.status === 'EXPORTED').length > 0).length > 0).length
      };
      dataPerDays.push(dataPerDay);
      iterationDate.add(1, 'day');
    } 

    const sums = [
      ...dataPerDays.reduce(
        (map, item) => {
          const { weekLabel: key, 
                  totalUsers, 
                  totalFacebookUsers,
                  totalCreatedTripUsers,
                  totalExportedInfographicUsers,
                  totalShareInfographicUsers } = item;
          const prev = map.get(key);
          
          if(prev) {
            prev.totalUsers += totalUsers;
            prev.totalFacebookUsers += totalFacebookUsers;
            prev.totalCreatedTripUsers += totalCreatedTripUsers;
            prev.totalExportedInfographicUsers += totalExportedInfographicUsers;
            prev.totalShareInfographicUsers += totalShareInfographicUsers;
          } else {
            map.set(key, Object.assign({}, item))
          }
          
          return map
        },
        new Map()
      ).values()
    ];
    
    sums.forEach(element => {
      data.totalUsers.push({
        week: element.weekLabel,
        value: element.totalUsers
      });
      data.totalFacebookUsers.push({
        week: element.weekLabel,
        value: element.totalFacebookUsers
      });
      data.totalCreatedTripUsers.push({
        week: element.weekLabel,
        value: element.totalCreatedTripUsers
      });
      data.totalExportedInfographicUsers.push({
        week: element.weekLabel,
        value: element.totalExportedInfographicUsers
      });
      data.totalShareInfographicUsers.push({
        week: element.weekLabel,
        value: element.totalShareInfographicUsers
      });
    });
    
    return data;
  }  
};