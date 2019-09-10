import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { CommandResult, Succeed } from "../../../../../_shared/utils";
import { ITripLocation } from "../../../models/ITrip";
import moment from "moment";
import _ from 'lodash';
import uuid4 from 'uuid/v4';

export type ImportTripCommand = {
  type: "importTrip";
  ownerId: string;
  tripId: string;
  locations: Array<ITripLocation>
};

export async function importTrip(command: ImportTripCommand, eventHandler: EventHandler, reducers: TripReducers, emitter: ServiceBus): Promise<CommandResult> {
  //validate

  const { ownerId, tripId, locations } = command;

  //add ids internally
  _.each(locations, loc => {
    loc.locationId = uuid4();
    loc.fromTime = moment(loc.fromTime);
    loc.toTime = moment(loc.toTime);

    _.each(loc.images, img => {
      img.imageId = uuid4();
      img.time = moment(img.time);
    })
  })


  var event: TripEvent = {
    type: "TripImportLocations",
    ownerId,
    tripId,
    locations
  };

  eventHandler.save(event);

  //update read store synchronously
  await emitter.emit(event);

  return Succeed();
}