import { TripEvent } from "./TripEvent";
import { TripReducers } from "./reducers/_tripReducer";
import { ITripRepository } from "../models/ITripRepository";
import { ITrip } from "../models/ITrip";

export class ServiceBus {
  // eventHandlers: (() => void)[] = [];
  // public addEventHandler(handler: () => void) {
  //   this.eventHandlers.push(handler);
  // }
  private reducer: TripReducers;
  constructor(private TripRepository: ITripRepository) {
    this.reducer = new TripReducers();
  }

  public async emit(event: TripEvent) {
    console.log(
      `hi there, I am emiting a event, cheers ${JSON.stringify(event).slice(0, 20)}`
    );
    var tripId = event.tripId;
    var ownerId = event.ownerId;

    var state = await this.TripRepository.get(ownerId, tripId);
    state = await this.reducer.updateState(state as ITrip, event);

    if (event.type == "TripCreated") {
      await this.TripRepository.create(ownerId, state);
    } else {
      await this.TripRepository.update(ownerId, state);
    }
  }
}
