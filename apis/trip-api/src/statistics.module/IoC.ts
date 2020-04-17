import UserTripRepository from "./_infrastructures/repositories/UserTripRepository";
import { UserTripQueryHandler } from "./_core/services/UserTripQuery";

import mongoose from "mongoose";
import { initSchemas } from "./_infrastructures/models/mongoosed";
const mg = initSchemas(mongoose);

const userTripRepository = new UserTripRepository(mg);
const userTripQueryHandler = new UserTripQueryHandler(userTripRepository);

export const IoC = {
  userTripQueryHandler,
};
