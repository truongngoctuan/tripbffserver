import { staticRegister, staticRegisterModule } from "./_commandHandler";
import { uploadImage, UploadImageCommand } from "./uploadImage";
import {
  exportInfographic,
  ExportInfographicCommand,
} from "./exportInfographic";
import {
  finishExportInfographic,
  FinishExportInfographicCommand,
} from "./finishExportInfographic";
import {
  finishShareInfographic,
  FinishShareInfographicCommand,
} from "././finishShareInfographic";
import { LocationCommand, LocationFunctions } from "./location";
import { TripFunctions, TripCommand } from "./trip";

//register modules
export function registerModules() {
  staticRegisterModule(TripFunctions);
  staticRegisterModule(LocationFunctions);

  staticRegister(uploadImage);
  staticRegister(exportInfographic);
  staticRegister(finishExportInfographic);
  staticRegister(finishShareInfographic);
}

export type TripBCommand =
  | TripCommand
  | LocationCommand
  | UploadImageCommand
  | ExportInfographicCommand
  | FinishExportInfographicCommand
  | FinishShareInfographicCommand;
