import { ServiceBus } from "../TripServiceBus";
import { EventHandler, ITripEventRepository } from "../TripEvent";
import { TripReducers } from "../reducers/_tripReducer";
import { CommandResult, Err } from "../../../_shared/utils";
import { CreateTripCommand, createTrip } from "./createTrip";
import { UpdateTripCommand, updateTrip } from "./updateTrip";
import { ImportTripCommand, importTrip } from "./importTrip";
import { UploadImageCommand, uploadImage } from "./uploadImage";
import { exportInfographic, ExportInfographicCommand } from "./exportInfographic";
import { finishExportInfographic, FinishExportInfographicCommand } from "./finishExportInfographic";
import { IJobDispatcher } from "../../models/IJobDispatcher";

type TripCommand = CreateTripCommand | UpdateTripCommand | ImportTripCommand
| UploadImageCommand
| ExportInfographicCommand
| FinishExportInfographicCommand;

var staticHandlers = new Map<string, CommandFunc>();
staticRegister(createTrip);
staticRegister(updateTrip);
staticRegister(importTrip);
staticRegister(uploadImage);
staticRegister(exportInfographic);
staticRegister(finishExportInfographic);

function staticRegister(func: Function) {
  staticHandlers.set(func.name, func as CommandFunc);
}

export type IExtraParams =  { jobDispatcher: IJobDispatcher}
export type CommandFunc = (command: TripCommand, eventHandler: EventHandler, reducers: TripReducers, emitter: ServiceBus, extraParams?: IExtraParams) => Promise<CommandResult>;

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

  async exec(command: TripCommand) {
    const func = this.handlers.get(command.type);
    if (func) {
      return await func(command, this.eventHandler, this.reducers, this.emitter, { jobDispatcher: this.jobDispatcher});
    }
    return Err(`Can't find command handler ${command.type}`);
  }

}

