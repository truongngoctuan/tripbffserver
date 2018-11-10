import { FooEvent } from "./FooEvent";
import { FooReducers } from "./FooReducer";
import { IFooRepository } from "../models/IFooRepository";
import { IFoo } from "../models/IFoo";

export class ServiceBus {
  // eventHandlers: (() => void)[] = [];
  // public addEventHandler(handler: () => void) {
  //   this.eventHandlers.push(handler);
  // }
  private reducer: FooReducers;
  constructor(private fooRepository: IFooRepository) {
    this.reducer = new FooReducers();
  }

  public async emit(event: FooEvent) {
    console.log(
      `hi there, I am emiting a event, cheers${JSON.stringify(event)}`
    );
    var fooId = event.fooId;

    var state = await this.fooRepository.get(fooId);
    state = await this.reducer.updateState(state as IFoo, event);

    if (event.type == "FooCreated") {
      await this.fooRepository.create(state);
    } else {
      await this.fooRepository.update(state);
    }
  }
}
