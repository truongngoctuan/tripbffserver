import { TripEvent } from "./events";
import { TripReducers } from "./reducers/_tripReducer";
import { ITripRepository } from "../models/ITripRepository";
import { TripsMinimizedReducer } from "./mirroredReducers/TripsMinimizedReducer";
import { ITrip } from "../models/ITrip";
import { ITripsRepository } from "../models/ITripsRepository";


/**
 * todo use kafka to stream events or gRPC
 * todo can rerun events
 *
 * @export
 * @class ServiceBus
 */
export class ServiceBus {
  // eventHandlers: (() => void)[] = [];
  // public addEventHandler(handler: () => void) {
  //   this.eventHandlers.push(handler);
  // }
  private reducer: TripReducers;
  private _tripMinimizedReducer: TripsMinimizedReducer
  constructor(private TripRepository: ITripRepository,
    private TripsRepository: ITripsRepository) {
    this.reducer = new TripReducers();
    this._tripMinimizedReducer = new TripsMinimizedReducer();
  }

  public async emit(event: TripEvent) {
    console.log("emitting a event: ", event.type);
    const tripId = event.tripId;
    const ownerId = event.ownerId;

    //the first subscriber consume our event
    let state = await this.TripRepository.get(ownerId, tripId, ownerId);
    state = await this.reducer.updateState(state as ITrip, event);

    if (event.type == "TripCreated") {
      await this.TripRepository.create(ownerId, state);
    } else {
      await this.TripRepository.update(ownerId, state);
    }

    //TODO: should we do it every update ? Or we will do it when user load profile page ?
    //todo the second subscriber consume our event
    const minimizedState = await this._tripMinimizedReducer.transform(state);

    if (event.type == "TripCreated") {
      await this.TripsRepository.create(ownerId, minimizedState);
    } else {
      await this.TripsRepository.update(ownerId, minimizedState);
    }
  }
}
