import { TripEvent } from "./TripEvent";
import { TripReducers } from "./TripReducer";
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
      `hi there, I am emiting a event, cheers${JSON.stringify(event)}`
    );
    var TripId = event.tripId;

    var state = await this.TripRepository.get(TripId);
    state = await this.reducer.updateState(state as ITrip, event);

    if (event.type == "TripCreated") {
      await this.TripRepository.create(state);
    } else {
      await this.TripRepository.update(state);
    }
  }
}
