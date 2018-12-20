import { Moment } from "moment";
import { ITripLocation } from "../models/ITrip";

export type TripEvent =
  | TripCreatedEvent
  | TripUpdatedEvent
  | TripImportLocationsEvent
  | TripLocationImageUploadedEvent
  | InfographicCreatedEvent;

export type TripCreatedEvent = {
  type: "TripCreated";
  tripId: string;
  name: string;
  fromDate: Moment;
  toDate: Moment;
};

export type TripUpdatedEvent = {
  type: "TripUpdated";
  tripId: string;
  name: string;
  fromDate: Moment;
  toDate: Moment;
};

export type TripImportLocationsEvent = {
  type: "TripImportLocations";
  tripId: string;
  locations: Array<ITripLocation>;
};

export type TripLocationImageUploadedEvent = {
  type: "LocationImageUploaded";
  tripId: string;
  locationId: string;
  imageId: string;
  externalStorageId: string;
};

export type InfographicCreatedEvent = {
  type: "InfographicCreated";
  tripId: string;
  infographicId: string;
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
