import { Moment } from "moment";

export type TripCreatedEvent = {
  type: "TripCreated";
  ownerId: string;
  tripId: string;
  name: string;
  fromDate: Moment;
  toDate: Moment;
};

export type TripUpdatedEvent = {
  type: "TripUpdated";
  ownerId: string;
  tripId: string;
  name: string;
  fromDate: Moment;
  toDate: Moment;
};

export type TripDateRangeUpdatedEvent = {
  type: "TripDateRangeUpdated";
  ownerId: string;
  tripId: string;
  fromDate: Moment;
  toDate: Moment;
};