import { RemoveLocationCommand, RemoveLocation } from "./removeLocation";
import { AddLocationCommand, AddLocation } from "./addLocation";
import { AddFeelingCommand, AddFeeling } from "./addFeeling"
import { CommandFunc } from "../_commandHandler";

export type LocationCommand = RemoveLocationCommand | AddLocationCommand | AddFeelingCommand;

export const LocationFunctions: Array<CommandFunc> = [
  RemoveLocation,
  AddLocation,
  AddFeeling
]