import { IFooEventRepository, FooEvent } from "../../services/FooEvent";

export class FooEventRepository implements IFooEventRepository {
  async save(event: FooEvent) {}

  async getAll(id: String): Promise<FooEvent[]> {
    return [
      {
        type: "FooCreated",
        fooId: "aaa",
        name: "aaa",
        description: "aaa"
      }
    ];
  }
}