import { RemoveLocationCommand, RemoveLocation } from "./removeLocation";
import { AddLocationCommand, AddLocation } from "./addLocation";
import { UpdateLocationFeelingCommand, UpdateFeeling } from "./updateFeeling"
import { CommandFunc } from "../_commandHandler";

export type LocationCommand = RemoveLocationCommand | AddLocationCommand | UpdateLocationFeelingCommand;

export const LocationFunctions: Array<CommandFunc> = [
  RemoveLocation,
  AddLocation,
  UpdateFeeling
]