export type TripEvent = TripCreatedEvent | TripUpdatedEvent;

export type TripCreatedEvent = {
  type: "TripCreated";
  TripId: String;
  name: String;
  fromDate: Date;
  toDate: Date;
};

export type TripUpdatedEvent = {
  type: "TripUpdated";
  TripId: String;
  name: String;
  fromDate: Date;
  toDate: Date;
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
