export type TripCreatedEvent = {
  type: "TripCreated";
  ownerId: string;
  tripId: string;
  name: string;
  fromDate: Date;
  toDate: Date;
  isPublic: boolean
};

export type TripUpdatedEvent = {
  type: "TripUpdated";
  ownerId: string;
  tripId: string;
  name: string;
  fromDate: Date;
  toDate: Date;
  isPublic: boolean
};

export type TripDateRangeUpdatedEvent = {
  type: "TripDateRangeUpdated";
  ownerId: string;
  tripId: string;
  fromDate: Date;
  toDate: Date;
};

export type TripNameUpdatedEvent = {
  type: "TripNameUpdated";
  ownerId: string;
  tripId: string;
  name: string;
  isPublic: boolean;
};

export type TripDeletedEvent = {
  type: "TripDeleted";
  ownerId: string;
  tripId: string;
  isDeleted: boolean;
};