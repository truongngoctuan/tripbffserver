import { TripEventRepository } from "./infrastructures/repositories/TripEventRepository";
import TripRepository from "./infrastructures/repositories/TripRepository";
import { JobDispatcher } from "./infrastructures/JobDispatcher";
import { TripCommandHandler } from "./services/commands/_commandHandler";
import { ServiceBus } from "./services/TripServiceBus";
import { TripQueryHandler } from "./services/TripQuery";
import { IFileStorageService } from "../image.module/IFileStorageService";
import { FileStorageOfflineService } from "../image.module/FileStorageOfflineService";

const tripEventRepository = new TripEventRepository();
const tripRepository = new TripRepository();
const jobDispatcher = new JobDispatcher();
const tripCommandHandler = new TripCommandHandler(
  tripEventRepository,
  new ServiceBus(tripRepository),
  jobDispatcher
);
const tripQueryHandler = new TripQueryHandler(new TripRepository());

const fileService: IFileStorageService = new FileStorageOfflineService();


export const IoC = {
  tripCommandHandler,
  tripQueryHandler,
  fileService
}