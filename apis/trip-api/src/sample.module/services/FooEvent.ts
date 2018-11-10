export type FooEvent = FooCreatedEvent | FooUpdatedEvent;

export type FooCreatedEvent = {
  type: "FooCreated";
  fooId: String;
  name: String;
  description: String;
};

export type FooUpdatedEvent = {
  type: "FooUpdated";
  fooId: String;
  name: String;
  description: String;
};

export class EventHandler {
  constructor(private eventRepository: IFooEventRepository) {

  }
  async save(event: FooEvent) {
    await this.eventRepository.save(event);
  }
}

export interface IFooEventRepository {
  save: (event: FooEvent) => Promise<void>;
  getAll: (id: String) => Promise<FooEvent[]>;
}
