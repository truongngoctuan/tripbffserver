export type FooEvent = FooCreatedEvent | FooUpdatedEvent;

export type FooCreatedEvent = {
  type: "FooCreated";
  fooId: string;
  name: string;
  description: string;
};

export type FooUpdatedEvent = {
  type: "FooUpdated";
  fooId: string;
  name: string;
  description: string;
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
  getAll: (id: string) => Promise<FooEvent[]>;
}
