import { CommandFunc } from "../_commandHandler";
import { CreateTripCommand, createTrip } from "./createTrip";
import { UpdateTripCommand, updateTrip } from "./updateTrip";
import { ImportTripCommand, importTrip } from "./importTrip";

export type TripCommand = CreateTripCommand | UpdateTripCommand | ImportTripCommand;

export const TripFunctions: Array<CommandFunc> = [
  createTrip,
  updateTrip,
  importTrip,
]