import { IFooRepository } from "./IFooRepository";
import { ServiceBus } from "./ServiceBus";
import { EventHandler, FooEvent, IFooEventRepository } from "./FooEvent";
import { FooReducers } from "./FooReducer";

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
  isSucceed: boolean;
  errors?: String[];
}

export class FooCommandHandler {
  private reducers: FooReducers;
  private eventHandler: EventHandler;
  constructor(
    private fooRepository: IFooRepository,
    fooEventRepository: IFooEventRepository,
    private emitter: ServiceBus
  ) {
    this.reducers = new FooReducers(fooEventRepository);
    this.eventHandler = new EventHandler(fooEventRepository);
  }

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
    //validate

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
    //validate

    const { fooId, name, description } = command;
    const state = await this.reducers.getCurrentState(fooId);

    //get current state
    if (state.name == name && state.description == description) {
      return this.Succeed();
    }
    
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
      isSucceed: true
    };
  }
}
