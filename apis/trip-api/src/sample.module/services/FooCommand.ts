import { IFooRepository } from "./IFooRepository";
import { ServiceBus } from "./ServiceBus";
import { EventHandler, FooEvent } from "./FooEvent";

// type FooCommand = CreateFooCommand | UpdateFooCommand;

type CreateFooCommand = {
  type: "createFoo";
  fooId: String;
  name: String;
  description: String;
};
type UpdateFooCommand = {
  type: "updateFoo";
  fooId: String;
  name: String;
  description: String;
};

export interface CommandResult {
  isSucceed: boolean,
  errors?: String[],
}

export class FooCommandHandler {
  constructor(
    private fooRepository: IFooRepository,
    private eventHandler: EventHandler,
    private emitter: ServiceBus
  ) {}

  // async exec(command: FooCommand) {
  //   var result;
  //   switch (command.type) {
  //     case "createFoo":
  //       result = this.createFoo(command);
  //       break;
  //     case "updateFoo":
  //       result = this.updateFoo(command);

  //       break;
  //     default:
  //       break;
  //   }
  // }

  async createFoo(command: CreateFooCommand): Promise<CommandResult> {
    //TODO validate

    const { fooId, name, description } = command;
    var event: FooEvent = {
      type: "FooCreated",
      fooId,
      name,
      description
    };

    this.eventHandler.save(event);

    //update read store synchronously
    await this.emitter.emit(event);

    return this.Succeed();
  }

  async updateFoo(command: UpdateFooCommand) {
    //TODO validate

    const { fooId, name, description } = command;

    //todo get current state
    var event: FooEvent = {
      type: "FooUpdated",
      fooId,
      name,
      description
    };

    this.eventHandler.save(event);

    //update read store synchronously
    await this.emitter.emit(event);

    return this.Succeed();
  }

  //utils function
  Succeed(): CommandResult {
    return {
      isSucceed: true,
    }
  }
}
