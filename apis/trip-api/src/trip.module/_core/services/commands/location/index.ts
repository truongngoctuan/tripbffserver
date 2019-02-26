import { RemoveLocationCommand, RemoveLocation } from "./removeLocation";
import { AddLocationCommand, AddLocation } from "./addLocation";
import { CommandFunc } from "../_commandHandler";

export type LocationCommand = RemoveLocationCommand | AddLocationCommand;

export const LocationFunctions: Array<CommandFunc> = [
  RemoveLocation,
  AddLocation
]