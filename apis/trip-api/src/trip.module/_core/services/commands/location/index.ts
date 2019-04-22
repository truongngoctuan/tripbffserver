import { RemoveLocationCommand, RemoveLocation } from "./removeLocation";
import { AddLocationCommand, AddLocation } from "./addLocation";
import { UpdateLocationFeelingCommand, UpdateLocationFeeling } from "./updateFeeling"
import { CommandFunc } from "../_commandHandler";
import { UpdateLocationActivityCommand, UpdateLocationActivity } from "./updateActivity";
import { UpdateLocationAddressCommand, UpdateLocationAddress } from "./updateLocationAddress";
import { RemoveLocationImagesCommand, RemoveLocationImages } from "./removeLocationImages";
import { FavoriteLocationImageCommand, FavoriteLocationImage } from "./favoriteLocationImage";
import { UpdateLocationHighlightCommand, UpdateLocationHighlight } from "./updateLocationHighlight"

export type LocationCommand = RemoveLocationCommand 
                              | AddLocationCommand
                              | UpdateLocationFeelingCommand
                              | UpdateLocationActivityCommand
                              | UpdateLocationAddressCommand
                              | RemoveLocationImagesCommand
                              | FavoriteLocationImageCommand
                              | UpdateLocationHighlightCommand
                              ;

export const LocationFunctions: Array<CommandFunc> = [
  RemoveLocation,
  AddLocation,
  UpdateLocationFeeling,
  UpdateLocationActivity,
  UpdateLocationAddress,
  RemoveLocationImages,
  FavoriteLocationImage,
  UpdateLocationHighlight
]