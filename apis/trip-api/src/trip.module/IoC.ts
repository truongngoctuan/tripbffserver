import { TripEventRepository } from "./_infrastructures/repositories/TripEventRepository";
import TripRepository from "./_infrastructures/repositories/TripRepository";
import { JobDispatcher } from "./_infrastructures/JobDispatcher";
import { TripCommandHandler } from "./_core/services/commands/_commandHandler";
import { ServiceBus } from "./_core/services/TripServiceBus";
import { TripQueryHandler } from "./_core/services/TripQuery";
import { IFileStorageService } from "../image.module/IFileStorageService";
import { FileStorageOfflineService } from "../image.module/FileStorageOfflineService";
import { TripEventQueryHandler } from "./_core/services/TripEventQuery";

const tripEventRepository = new TripEventRepository();
const tripRepository = new TripRepository();
const jobDispatcher = new JobDispatcher();
const tripCommandHandler = new TripCommandHandler(
  tripEventRepository,
  new ServiceBus(tripRepository),
  jobDispatcher,
);
const tripQueryHandler = new TripQueryHandler(new TripRepository());
const tripEventQueryHandler = new TripEventQueryHandler(new TripEventRepository());
const fileService: IFileStorageService = new FileStorageOfflineService();

export const IoC = {
  tripCommandHandler,
  tripQueryHandler,
  fileService,
  tripEventQueryHandler,
};
