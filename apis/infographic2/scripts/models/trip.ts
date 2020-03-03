export type Trip = {
  fromDate: number;
  toDate: number;
  locations: {
    locationId: string;
    name: string;
    fromTime: string;
    toTime: string;
    feeling: string;
    activity: string;
    highlights: string;
    signedUrl: string;
  }[];
  locale: string;
  numberOfDays: 1;
};
