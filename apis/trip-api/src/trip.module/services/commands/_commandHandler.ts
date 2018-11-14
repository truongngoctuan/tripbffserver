import { ITripRepository } from "../../models/ITripRepository";
import { ServiceBus } from "../TripServiceBus";
import { EventHandler, ITripEventRepository } from "../TripEvent";
import { TripReducers } from "../TripReducer";
import { CommandResult, Err } from "../../../_shared/utils";
import { CreateTripCommand, createTrip } from "./createTrip";
import { UpdateTripCommand, updateTrip } from "./updateTrip";
import { ImportTripCommand, importTrip } from "./importTrip";

type TripCommand = CreateTripCommand | UpdateTripCommand | ImportTripCommand;
var staticHandlers = new Map<String, CommandFunc>();
staticRegister(createTrip);
staticRegister(updateTrip);
staticRegister(importTrip);

function staticRegister(func: Function) {
  staticHandlers.set(func.name, func as CommandFunc);
}

type CommandFunc = (command: TripCommand, eventHandler: EventHandler, reducers: TripReducers, emitter: ServiceBus) => Promise<CommandResult>;

export class TripCommandHandler {
  private reducers: TripReducers;
  private eventHandler: EventHandler;
  constructor(
    TripEventRepository: ITripEventRepository,
    private emitter: ServiceBus
  ) {
    this.reducers = new TripReducers(TripEventRepository);
    this.eventHandler = new EventHandler(TripEventRepository);

    this.handlers = staticHandlers;
  }
  private handlers = new Map<String, CommandFunc>();

  // register(
  //   type: String,
  //   func: (command: TripCommand) => Promise<CommandResult>
  // ) {
  //   //todo check any
  //   this.handlers.set(type, func);
  // }

  async exec(command: TripCommand) {
    const func = this.handlers.get(command.type);
    if (func) {
      return await func(command, this.eventHandler, this.reducers, this.emitter);
    }
    return Err(`Can't find command handler ${command.type}`);
  }

}

