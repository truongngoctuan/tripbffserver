import { IFooRepository } from "../../models/IFooRepository";
import { ServiceBus } from "../ServiceBus";
import { EventHandler, IFooEventRepository } from "../FooEvent";
import { FooReducers } from "../FooReducer";
import { CommandResult, Err } from "./utils";
import { CreateFooCommand, createFoo } from "./createFoo";
import { UpdateFooCommand, updateFoo } from "./updateFoo";

type FooCommand = CreateFooCommand | UpdateFooCommand;
var staticHandlers = new Map<String, CommandFunc>();
staticRegister(createFoo);
staticRegister(updateFoo);

function staticRegister(func: Function) {
  staticHandlers.set(func.name, func as CommandFunc);
}

type CommandFunc = (command: FooCommand, eventHandler: EventHandler, reducers: FooReducers, emitter: ServiceBus) => Promise<CommandResult>;

export class FooCommandHandler {
  private reducers: FooReducers;
  private eventHandler: EventHandler;
  constructor(
    fooEventRepository: IFooEventRepository,
    private emitter: ServiceBus
  ) {
    this.reducers = new FooReducers(fooEventRepository);
    this.eventHandler = new EventHandler(fooEventRepository);
  }
  private handlers = new Map<String, CommandFunc>();

  // register(
  //   type: String,
  //   func: (command: FooCommand) => Promise<CommandResult>
  // ) {
  //   //todo check any
  //   this.handlers.set(type, func);
  // }

  async exec(command: FooCommand) {
    const func = this.handlers.get(command.type);
    if (func) {
      return await func(command, this.eventHandler, this.reducers, this.emitter);
    }
    return Err(`Can't find command handler ${command.type}`);
  }

}

