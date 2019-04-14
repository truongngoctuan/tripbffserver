import { TripEventRepository } from "./_infrastructures/repositories/TripEventRepository";
import TripRepository from "./_infrastructures/repositories/TripRepository";
import { JobDispatcher } from "./_infrastructures/JobDispatcher";
import { TripCommandHandler } from "./_core/services/commands/_commandHandler";
import { ServiceBus } from "./_core/services/TripServiceBus";
import { TripQueryHandler } from "./_core/services/TripQuery";
import { IFileStorageService } from "../image.module/IFileStorageService";
import { FileStorageOfflineService } from "../image.module/FileStorageOfflineService";
import { IImageService } from "../image.module/IImageService";
import { ImageService } from "../image.module/ImageService";
import { TripEventQueryHandler } from "./_core/services/TripEventQuery";
import { DataSourceQueryHandler } from "./_core/services/DataSourceQueryHandler";
import FeelingRepository from "./_infrastructures/repositories/FeelingRepository";
import ActivityRepository from "./_infrastructures/repositories/ActivityRepository";
import { HighlightRepository } from "./_infrastructures/repositories/HighlightRepository";

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
const imageService: IImageService = new ImageService();

const dataSourceQueryHandler = new DataSourceQueryHandler(
  new FeelingRepository(),
  new ActivityRepository(),
  new HighlightRepository());

export const IoC = {
  tripCommandHandler,
  tripQueryHandler,
  fileService,
  imageService,
  tripEventQueryHandler,
  dataSourceQueryHandler
};
