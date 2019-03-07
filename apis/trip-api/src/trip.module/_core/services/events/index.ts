import { Moment } from "moment";
import { ITripLocation } from "../../models/ITrip";
import { TripCreatedEvent, TripUpdatedEvent, TripDateRangeUpdatedEvent } from "./TripEvents";

export type TripEvent =
  | TripCreatedEvent
  | TripUpdatedEvent
  | TripDateRangeUpdatedEvent
  | TripImportLocationsEvent
  | TripLocationRemovedEvent
  | TripLocationAddedEvent
  | TripLocationImageUploadedEvent
  | InfographicCreatedEvent
  | InfographicExportedEvent;

export type TripImportLocationsEvent = {
  type: "TripImportLocations";
  ownerId: string;
  tripId: string;
  locations: Array<ITripLocation>;
};

export type TripLocationRemovedEvent = {
  type: "LocationRemoved";
  ownerId: string;
  tripId: string;
  locationId: string;
};

export type TripLocationAddedEvent = {
  type: "LocationAdded";
  ownerId: string;
  tripId: string;
  location: ITripLocation;
};

export type TripLocationImageUploadedEvent = {
  type: "LocationImageUploaded";
  ownerId: string;
  tripId: string;
  locationId: string;
  imageId: string;
  externalStorageId: string;
};

export type InfographicCreatedEvent = {
  type: "InfographicCreated";
  ownerId: string;
  tripId: string;
  infographicId: string;
};

export type InfographicExportedEvent = {
  type: "InfographicExported";
  ownerId: string;
  tripId: string;
  infographicId: string;
  externalStorageId: string;
};

export class EventHandler {
  constructor(private eventRepository: ITripEventRepository) {}
  async save(event: TripEvent) {
    await this.eventRepository.save(event);
  }
}

export interface ITripEventRepository {
  save: (event: TripEvent) => Promise<void>;
  getAll: (id: string) => Promise<TripEvent[]>;
}
