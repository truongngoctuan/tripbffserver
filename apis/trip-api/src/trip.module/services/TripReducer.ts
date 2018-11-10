import { ITrip } from "../models/ITrip";
import {
  ITripEventRepository,
  TripCreatedEvent,
  TripUpdatedEvent,
  TripEvent
} from "./TripEvent";

export class TripReducers {
  constructor(private TripEventRepository?: ITripEventRepository) {}

  async getCurrentState(id: String): Promise<ITrip> {
    if (!this.TripEventRepository) throw "are you forgot to init TripEventRepository ?";
    
    var events = await this.TripEventRepository.getAll(id);
    var state: ITrip = {
      id: "",
      name: "",
      fromDate: new Date(),
      toDate: new Date(),
    };

    events.forEach(async (event, idx) => {
      state = await this.updateState(state, event);
    });

    return state;
  }

  async updateState(state: ITrip, event: TripEvent): Promise<ITrip> {
    switch (event.type) {
      case "TripCreated":
        state = await this.createTrip(event);
        break;
      case "TripUpdated":
        state = await this.updateTrip(state, event);
        break;
      default:
        break;
    }

    return state;
  }

  async createTrip(command: TripCreatedEvent): Promise<ITrip> {
    return {
      id: command.TripId,
      name: command.name,
      fromDate: command.fromDate,
      toDate: command.toDate,
    };
  }

  async updateTrip(prevState: ITrip, command: TripUpdatedEvent): Promise<ITrip> {
    return {
      ...prevState,
      name: command.name,
      fromDate: command.fromDate,
      toDate: command.toDate,
    };
  }
}
