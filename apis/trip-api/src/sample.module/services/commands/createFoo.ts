import { EventHandler, FooEvent } from "../FooEvent";
import { FooReducers } from "../FooReducer";
import { ServiceBus } from "../ServiceBus";
import { CommandResult, Succeed } from "../../../_shared/utils";

export type CreateFooCommand = {
  type: "createFoo";
  fooId: string;
  name: string;
  description: string;
};

export async function createFoo(command: CreateFooCommand, eventHandler: EventHandler, reducers: FooReducers, emitter: ServiceBus): Promise<CommandResult> {
  //validate

  const { fooId, name, description } = command;
  const event: FooEvent = {
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