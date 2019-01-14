import { RemoveLocationCommand, RemoveLocation } from "./removeLocation";
import { CommandFunc } from "../_commandHandler";

export type LocationCommand = RemoveLocationCommand;

export const LocationFunctions: Array<CommandFunc> = [
  RemoveLocation
]