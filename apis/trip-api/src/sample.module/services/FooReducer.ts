import { IFoo } from "../models/IFoo";
import {
  IFooEventRepository,
  FooCreatedEvent,
  FooUpdatedEvent,
  FooEvent,
} from "./FooEvent";

export class FooReducers {
  constructor(private fooEventRepository?: IFooEventRepository) {}

  async getCurrentState(id: string): Promise<IFoo> {
    if (!this.fooEventRepository)
      throw "are you forgot to init fooEventRepository ?";

    const events = await this.fooEventRepository.getAll(id);
    let state: IFoo = {
      id: "",
      name: "",
      description: "",
    };

    events.forEach(async (event, idx) => {
      state = await this.updateState(state, event);
    });

    return state;
  }

  async updateState(state: IFoo, event: FooEvent): Promise<IFoo> {
    switch (event.type) {
      case "FooCreated":
        state = await this.createFoo(event);
        break;
      case "FooUpdated":
        state = await this.updateFoo(state, event);
        break;
      default:
        break;
    }

    return state;
  }

  async createFoo(command: FooCreatedEvent): Promise<IFoo> {
    return {
      id: command.fooId,
      name: command.name,
      description: command.description,
    };
  }

  async updateFoo(prevState: IFoo, command: FooUpdatedEvent): Promise<IFoo> {
    return {
      ...prevState,
      name: command.name,
      description: command.description,
    };
  }
}
