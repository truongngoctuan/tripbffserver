import { Moment } from "moment";

export type TripEvent = TripCreatedEvent | TripUpdatedEvent;

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
