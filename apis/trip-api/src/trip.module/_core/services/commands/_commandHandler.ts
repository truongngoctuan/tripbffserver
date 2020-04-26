import { ServiceBus } from "../TripServiceBus";
import { EventHandler, ITripEventRepository } from "../events";
import { TripReducers } from "../reducers/_tripReducer";
import { CommandResult, Err } from "../../../../_shared/utils";
import { IJobDispatcher } from "../../models/IJobDispatcher";
import { TripBCommand } from ".";

const staticHandlers = new Map<string, CommandFunc>();

export function staticRegister(func: CommandFunc) {
  console.log("register command handler", func.name);
  staticHandlers.set(func.name, func as CommandFunc);
}

export function staticRegisterModule(funcs: Array<CommandFunc>) {
  funcs.forEach((func) => staticRegister(func));
}

export type IExtraParams = { jobDispatcher: IJobDispatcher };

// lower the standard for simplicity, instead of ITripCommand: export type ITripCommand = {};
export type CommandFunc = (
  command: any,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus,
  extraParams: IExtraParams
) => Promise<CommandResult>;

export class TripCommandHandler {
  private reducers: TripReducers;
  private eventHandler: EventHandler;
  constructor(
    TripEventRepository: ITripEventRepository,
    private emitter: ServiceBus,
    private jobDispatcher: IJobDispatcher
  ) {
    this.reducers = new TripReducers(TripEventRepository);
    this.eventHandler = new EventHandler(TripEventRepository);

    this.handlers = staticHandlers;
  }
  private handlers = new Map<string, CommandFunc>();

  // register(
  //   type: String,
  //   func: (command: TripCommand) => Promise<CommandResult>
  // ) {
  //   //todo check any
  //   this.handlers.set(type, func);
  // }

  async exec(command: TripBCommand) {
    const func = this.handlers.get(command.type);
    if (func) {
      return await func(
        command,
        this.eventHandler,
        this.reducers,
        this.emitter,
        { jobDispatcher: this.jobDispatcher }
      );
    }
    return Err(`Can't find command handler ${command.type}`);
  }
}
