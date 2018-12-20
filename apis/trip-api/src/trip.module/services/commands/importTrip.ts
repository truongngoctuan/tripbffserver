import { EventHandler, TripEvent } from "../TripEvent";
import { TripReducers } from "../reducers/_tripReducer";
import { ServiceBus } from "../TripServiceBus";
import { CommandResult, Succeed } from "../../../_shared/utils";
import { ITripLocation } from "../../models/ITrip";
import _ from 'lodash';
import uuid4 from 'uuid/v4';

export type ImportTripCommand = {
  type: "importTrip";
  tripId: string;
  locations: Array<ITripLocation>
};

export async function importTrip(command: ImportTripCommand, eventHandler: EventHandler, reducers: TripReducers, emitter: ServiceBus): Promise<CommandResult> {
  //validate

  const { tripId, locations } = command;

  //add ids internally
  _.each(locations, loc => {
    loc.locationId = uuid4();

    _.each(loc.images, img => {
      img.imageId = uuid4();
    })
  })


  var event: TripEvent = {
    type: "TripImportLocations",
    tripId,
    locations
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}