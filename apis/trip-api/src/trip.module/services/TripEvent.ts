import { Moment } from "moment";
import { ITripLocation } from "../models/ITrip"

export type TripEvent = TripCreatedEvent | TripUpdatedEvent | TripImportLocationsEvent;

export type TripCreatedEvent = {
  type: "TripCreated";
  TripId: String;
  name: String;
  fromDate: Moment;
  toDate: Moment;
};

export type TripUpdatedEvent = {
  type: "TripUpdated";
  TripId: String;
  name: String;
  fromDate: Moment;
  toDate: Moment;
};

export type TripImportLocationsEvent = {
  type: "TripImportLocations";
  TripId: String;
  locations?: Array<ITripLocation>
};

export class EventHandler {
  constructor(private eventRepository: ITripEventRepository) {

  }
  async save(event: TripEvent) {
    await this.eventRepository.save(event);
  }
}

export interface ITripEventRepository {
  save: (event: TripEvent) => Promise<void>;
  getAll: (id: String) => Promise<TripEvent[]>;
}
