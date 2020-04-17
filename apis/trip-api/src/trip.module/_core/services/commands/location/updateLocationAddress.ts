import { EventHandler, TripEvent } from "../../events";
import { TripReducers } from "../../reducers/_tripReducer";
import { ServiceBus } from "../../TripServiceBus";
import { Succeed } from "../../../../../_shared/utils";

export type UpdateLocationAddressCommand = {
  type: "UpdateLocationAddress";
  ownerId: string;
  tripId: string;
  locationId: string;
  name: string;
  address: string;
  long: number;
  lat: number;
};

export async function UpdateLocationAddress(
  command: UpdateLocationAddressCommand,
  eventHandler: EventHandler,
  reducers: TripReducers,
  emitter: ServiceBus
) {
  const { ownerId, tripId, locationId, name, address, long, lat } = command;

  const event: TripEvent = {
    type: "LocationAddressUpdated",
    ownerId,
    tripId,
    locationId,
    name,
    address,
    long,
    lat,
  };

  eventHandler.save(event);

  await emitter.emit(event);

  return Succeed();
}
