import { RemoveLocationCommand, RemoveLocation } from "./removeLocation";
import { AddLocationCommand, AddLocation } from "./addLocation";
import { UpdateLocationFeelingCommand, UpdateLocationFeeling } from "./updateFeeling"
import { CommandFunc } from "../_commandHandler";
import { UpdateLocationActivityCommand, UpdateLocationActivity } from "./updateActivity";

export type LocationCommand = RemoveLocationCommand | 
                              AddLocationCommand | 
                              UpdateLocationFeelingCommand |
                              UpdateLocationActivityCommand;

export const LocationFunctions: Array<CommandFunc> = [
  RemoveLocation,
  AddLocation,
  UpdateLocationFeeling,
  UpdateLocationActivity
]