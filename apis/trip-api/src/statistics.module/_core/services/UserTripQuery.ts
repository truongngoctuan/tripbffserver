import { ITrip } from "../models/ITrip";
import { IUserTripRepository } from "../../_infrastructures/repositories/IUserTripRepository";
import { Moment } from "moment";
import { IGrowthChart, IGrowthChartItem } from "../models/IGrowthChart";
import moment = require("moment-timezone");
import { IUserTrip } from "../models/IUserTrip";

export class UserTripQueryHandler {
  constructor(private UserTripRepository: IUserTripRepository) {}

  async getGrowthCharts(
    fromDate: Moment,
    toDate: Moment
  ): Promise<IGrowthChart[]> {
    const userTrips: IUserTrip[] = await this.UserTripRepository.list(
      fromDate,
      toDate
    );
    const iterationDate = fromDate.startOf("day");
    const dataPerDays = [];

    while (iterationDate <= toDate) {
      const userTripsPerDay = userTrips.filter(
        (s) =>
          s.logins.filter(
            (lo) =>
              lo.loginType === "DEVICE" &&
              moment(lo.loggedInDate).startOf("day").toDate().getTime() ===
                iterationDate.toDate().getTime()
          ).length > 0
      );

      const dataPerDay = {
        weekLabel: iterationDate.format("W-GGGG"),
        totalUsers: userTripsPerDay.length,
        totalFacebookUsers: userTripsPerDay.filter(
          (s) => s.logins.filter((lo) => lo.loginType === "FACEBOOK").length > 0
        ).length,
        totalCreatedTripUsers: userTripsPerDay.filter((s) => s.trips.length > 0)
          .length,
        totalExportedInfographicUsers: userTripsPerDay.filter(
          (s) => s.trips.filter((t) => t.infographics.length > 0).length > 0
        ).length,
        totalShareInfographicUsers: userTripsPerDay.filter(
          (s) =>
            s.trips.filter(
              (t) =>
                t.infographics.filter((i) => i.status === "EXPORTED").length > 0
            ).length > 0
        ).length,
      };
      dataPerDays.push(dataPerDay);
      iterationDate.add(1, "day");
    }

    const sums = [
      ...dataPerDays
        .reduce((map, item) => {
          const {
            weekLabel: key,
            totalUsers,
            totalFacebookUsers,
            totalCreatedTripUsers,
            totalExportedInfographicUsers,
            totalShareInfographicUsers,
          } = item;
          const prev = map.get(key);

          if (prev) {
            prev.totalUsers += totalUsers;
            prev.totalFacebookUsers += totalFacebookUsers;
            prev.totalCreatedTripUsers += totalCreatedTripUsers;
            prev.totalExportedInfographicUsers += totalExportedInfographicUsers;
            prev.totalShareInfographicUsers += totalShareInfographicUsers;
          } else {
            map.set(key, Object.assign({}, item));
          }

          return map;
        }, new Map())
        .values(),
    ];

    const totalUsers: IGrowthChartItem[] = [],
      totalFacebookUsers: IGrowthChartItem[] = [],
      totalCreatedTripUsers: IGrowthChartItem[] = [],
      totalExportedInfographicUsers: IGrowthChartItem[] = [],
      totalShareInfographicUsers: IGrowthChartItem[] = [];
    sums.forEach((element) => {
      totalUsers.push({
        x: element.weekLabel,
        y: element.totalUsers,
      });
      totalFacebookUsers.push({
        x: element.weekLabel,
        y: element.totalFacebookUsers,
      });
      totalCreatedTripUsers.push({
        x: element.weekLabel,
        y: element.totalCreatedTripUsers,
      });
      totalExportedInfographicUsers.push({
        x: element.weekLabel,
        y: element.totalExportedInfographicUsers,
      });
      totalShareInfographicUsers.push({
        x: element.weekLabel,
        y: element.totalShareInfographicUsers,
      });
    });

    const data: IGrowthChart[] = [
      {
        category: "Total Users",
        data: totalUsers,
      },
      {
        category: "Total Facebook Users",
        data: totalFacebookUsers,
      },
      {
        category: "Total Created Trip Users",
        data: totalCreatedTripUsers,
      },
      {
        category: "Total Exported Infographic Users",
        data: totalExportedInfographicUsers,
      },
      {
        category: "Total Shared Infographic Users",
        data: totalShareInfographicUsers,
      },
    ];
    return data;
  }
}
