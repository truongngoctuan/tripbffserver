import { TripEventRepository } from "./_infrastructures/repositories/TripEventRepository";
import TripRepository from "./_infrastructures/repositories/TripRepository";
import TripsRepository from "./_infrastructures/repositories/TripsRepository";
import { JobDispatcher } from "./_infrastructures/JobDispatcher";
import { TripCommandHandler } from "./_core/services/commands/_commandHandler";
import { ServiceBus } from "./_core/services/TripServiceBus";
import { TripQueryHandler } from "./_core/services/TripQuery";
import { MinimizedTripQueryHandler } from "./_core/services/MinimizedTripQueryHandler";
import { IFileStorageService2 } from "../image.module/IFileStorageService2";
import { FileStorageS3Service } from "../image.module/FileStorageS3Service";
import { IImageService } from "../image.module/_core/IImageService";
import { ImageS3Service } from "../image.module/_infrastructures/ImageS3Service";
import { TripEventQueryHandler } from "./_core/services/TripEventQuery";
import { DataSourceQueryHandler } from "./_core/services/DataSourceQueryHandler";
import FeelingRepository from "./_infrastructures/repositories/FeelingRepository";
import ActivityRepository from "./_infrastructures/repositories/ActivityRepository";
import { HighlightRepository } from "./_infrastructures/repositories/HighlightRepository";

import mongoose from "mongoose";
import {initSchemas} from "./_infrastructures/models/mongoosed";
import SearchLocationRepository from "./_infrastructures/repositories/SearchLocationRepository";
const mg = initSchemas(mongoose);

const tripEventRepository = new TripEventRepository();
const tripRepository = new TripRepository(mg);
const tripsRepository = new TripsRepository(mg);

const jobDispatcher = new JobDispatcher();
const tripCommandHandler = new TripCommandHandler(
  tripEventRepository,
  new ServiceBus(tripRepository, tripsRepository),
  jobDispatcher,
);
const tripQueryHandler = new TripQueryHandler(tripRepository);
const minimizedTripsQueryHandler = new MinimizedTripQueryHandler(tripsRepository);
const tripEventQueryHandler = new TripEventQueryHandler(new TripEventRepository());
const fileService: IFileStorageService2 = new FileStorageS3Service();
const imageService: IImageService = new ImageS3Service();

const dataSourceQueryHandler = new DataSourceQueryHandler(
  new FeelingRepository(),
  new ActivityRepository(),  
  new HighlightRepository(),
  new SearchLocationRepository());

export const IoC = {
  tripCommandHandler,
  tripQueryHandler,
  minimizedTripsQueryHandler,
  fileService,
  imageService,
  tripEventQueryHandler,
  dataSourceQueryHandler
};
