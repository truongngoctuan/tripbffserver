import { Succeed } from "./utils";
import { FooEvent, EventHandler } from "../FooEvent";
import { FooReducers } from "../FooReducer";
import { ServiceBus } from "../ServiceBus";

export type UpdateFooCommand = {
  type: "updateFoo";
  fooId: String;
  name: String;
  description: String;
};

export async function updateFoo(command: UpdateFooCommand, eventHandler: EventHandler, reducers: FooReducers, emitter: ServiceBus) {
  //validate

  const { fooId, name, description } = command;
  const state = await reducers.getCurrentState(fooId);

  //get current state
  if (state.name == name && state.description == description) {
    return Succeed();
  }

  var event: FooEvent = {
    type: "FooUpdated",
    fooId,
    name,
    description
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}