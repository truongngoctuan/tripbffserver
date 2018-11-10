import { EventHandler, FooEvent } from "../FooEvent";
import { FooReducers } from "../FooReducer";
import { ServiceBus } from "../ServiceBus";
import { CommandResult, Succeed } from "./utils";

export type CreateFooCommand = {
  type: "createFoo";
  fooId: String;
  name: String;
  description: String;
};

export async function createFoo(command: CreateFooCommand, eventHandler: EventHandler, reducers: FooReducers, emitter: ServiceBus): Promise<CommandResult> {
  //validate

  const { fooId, name, description } = command;
  var event: FooEvent = {
    type: "FooCreated",
    fooId,
    name,
    description
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}