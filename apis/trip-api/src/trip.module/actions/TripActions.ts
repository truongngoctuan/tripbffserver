import { IoC } from "../IoC";
import { Err, CommandResult } from "../../_shared/utils";
import uuid from "uuid/v1";

import { ITripMinimized } from "../_core/models/ITripsRepository";
import moment from "moment-timezone";
import { ITrip } from "../_core/models/ITrip";

const tripCommandHandler = IoC.tripCommandHandler;
const tripQueryHandler = IoC.tripQueryHandler;
const minimizedTripQueryHandler = IoC.minimizedTripsQueryHandler;

export async function listTripsAction(
  userId: string
): Promise<ITripMinimized[] | CommandResult> {
  const trips = await minimizedTripQueryHandler.list(userId);

  if (!trips) return Err("can't get data after create trip");

  console.log("trips len ", trips.length);
  return trips;
}

export async function listNewsFeedTripsAction(
  userId: string, page: number
): Promise<ITripMinimized[] | CommandResult> {
  const trips = await minimizedTripQueryHandler.listNewsFeed(userId, page);

  if (!trips) return Err("can't get data after create trip");

  console.log("trips len ", trips.length);
  return trips;
}

export async function getTripByIdAction(
  userId: string,
  tripId: string,
  createdById: string
): Promise<ITrip> {
  console.log("trip id :" + tripId);
  const trip = await tripQueryHandler.GetById(userId, tripId, createdById);
  if (!trip) throw "trip not found";
  return trip;
}

export async function getMinimizedTripByIdAction(
  userId: string,
  tripId: string
): Promise<ITripMinimized> {
  console.log("trip id :" + tripId);
  const trip = await minimizedTripQueryHandler.getById(userId, tripId);
  if (!trip) throw "trip not found";
  return trip;
}

export async function createTripAction(
  ownerId: string,
  name: string,
  fromDate: string,
  toDate: string,
  isPublic: boolean
): Promise<string | CommandResult | string[] | undefined> { // todo refactor return commandResult.errors
  console.log("trip name :" + name);
  console.log("trip from date:" + fromDate);
  console.log("trip to date:" + toDate);

  const tripId = uuid();

  const commandResult = await tripCommandHandler.exec({
    type: "createTrip",
    ownerId,
    tripId: tripId.toString(),
    name,
    fromDate: moment(fromDate).toDate(),
    toDate: moment(toDate).toDate(),
    isPublic
  });

  if (commandResult.isSucceed) {
    const queryResult = await tripQueryHandler.GetById(
      ownerId,
      tripId.toString(),
      ownerId
    );

    if (!queryResult) return Err("can't get data after create trip");
    return queryResult.tripId;
  }

  return commandResult.errors;
}

export async function patchTripAction(
  ownerId: string,
  tripId: string,
  name: string,
  fromDate: string,
  toDate: string,
  isPublic: boolean
): Promise<ITrip | CommandResult | string[] | undefined> { // todo refactor return commandResult.errors
  console.log("trip name", name);
  console.log("trip from date:", fromDate);
  console.log("trip to date:", toDate);

  const commandResult = await tripCommandHandler.exec({
    type: "updatePatchTrip",
    ownerId,
    tripId,
    name,
    fromDate: moment(fromDate).toDate(),
    toDate: moment(toDate).toDate(),
    isPublic
  });

  if (commandResult.isSucceed) {
    const queryResult = await tripQueryHandler.GetById(
      ownerId,
      tripId.toString(),
      ownerId
    );

    if (!queryResult) return Err("can't get data after patch trip");
    return queryResult;
  }

  return commandResult.errors;
}

export async function deleteTripAction(
  ownerId: string,
  tripId: string
): Promise<boolean | CommandResult | string[] | undefined> { // todo refactor return commandResult.errors
  const commandResult = await tripCommandHandler.exec({
    type: "deleteTrip",
    ownerId,
    tripId,
    isDeleted: true
  });

  if (commandResult.isSucceed) {
    return true;
  }

  return commandResult.errors;
}
