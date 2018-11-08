import { join } from "path";
import { IFoo } from "../models/IFoo";
import {
  IFooEventRepository,
  FooCreatedEvent,
  FooUpdatedEvent
} from "./FooEvent";

class FooReducers {
  constructor(private fooEventRepository: IFooEventRepository) {}
  async getCurrentState(id: String) {
    //todo get events from event store
    //todo for each event, update business entities state
    //todo return final state

    var events = await this.fooEventRepository.getAll(id);
    var state: IFoo;

    events.forEach(async (event, idx) => {
      switch (event.type) {
        case "FooCreated":
          state = await this.createFoo(state, event);
          break;
        case "FooUpdated":
          state = await this.updateFoo(state, event);
          break;
        default:
          break;
      }
    });
  }

  async createFoo(prevState: IFoo, command: FooCreatedEvent): Promise<IFoo> {
    return {
      id: command.fooId,
      name: command.name,
      description: command.description
    }
  }

  async updateFoo(prevState: IFoo, command: FooUpdatedEvent): Promise<IFoo> {
    return {
      ...prevState,
      name: command.name,
      description: command.description,
    }
  }
}
