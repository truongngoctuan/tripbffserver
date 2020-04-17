import { RemoveLocationCommand, RemoveLocation } from "./removeLocation";
import { AddLocationCommand, AddLocation } from "./addLocation";
import {
  UpdateLocationFeelingCommand,
  UpdateLocationFeeling,
} from "./updateFeeling";
import { CommandFunc } from "../_commandHandler";
import {
  UpdateLocationActivityCommand,
  UpdateLocationActivity,
} from "./updateActivity";
import {
  UpdateLocationAddressCommand,
  UpdateLocationAddress,
} from "./updateLocationAddress";
import { AddLocationImageCommand, AddLocationImage } from "./addLocationImage";
import {
  RemoveLocationImagesCommand,
  RemoveLocationImages,
} from "./removeLocationImages";
import {
  FavoriteLocationImageCommand,
  FavoriteLocationImage,
} from "./favoriteLocationImage";
import {
  UpdateLocationHighlightCommand,
  UpdateLocationHighlight,
} from "./updateLocationHighlight";
import {
  UpdateLocationDescriptionCommand,
  UpdateLocationDescription,
} from "./updateLocationDesription";

export type LocationCommand =
  | RemoveLocationCommand
  | AddLocationCommand
  | UpdateLocationFeelingCommand
  | UpdateLocationActivityCommand
  | UpdateLocationAddressCommand
  | AddLocationImageCommand
  | RemoveLocationImagesCommand
  | FavoriteLocationImageCommand
  | UpdateLocationHighlightCommand
  | UpdateLocationDescriptionCommand;

export const LocationFunctions: Array<CommandFunc> = [
  RemoveLocation,
  AddLocation,
  UpdateLocationFeeling,
  UpdateLocationActivity,
  UpdateLocationAddress,
  AddLocationImage,
  RemoveLocationImages,
  FavoriteLocationImage,
  UpdateLocationHighlight,
  UpdateLocationDescription,
];
