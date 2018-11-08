import { FooEvent } from "./FooEvent";

export class ServiceBus {
  // eventHandlers: (() => void)[] = [];
  // public addEventHandler(handler: () => void) {
  //   this.eventHandlers.push(handler);
  // }

  public async emit(event: FooEvent) {
    console.log("hi there, I am emiting a event, cheers");
  }
}
