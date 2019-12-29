import { CommandFunc } from "../_commandHandler";
import { CreateTripCommand, createTrip } from "./createTrip";
import { UpdateTripCommand, updateTrip } from "./updateTrip";
import { ImportTripCommand, importTrip } from "./importTrip";
import { UpdatePatchTripCommand, updatePatchTrip } from "./updatePatchTrip";
import { DeleteTripCommand, deleteTrip } from "./deleteTrip";

export type TripCommand = CreateTripCommand
| UpdateTripCommand
| UpdatePatchTripCommand
| ImportTripCommand
| DeleteTripCommand;

export const TripFunctions: Array<CommandFunc> = [
  createTrip,
  updateTrip,
  updatePatchTrip,
  importTrip,
  deleteTrip
];