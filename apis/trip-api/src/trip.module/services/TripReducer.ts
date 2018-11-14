import { ITrip } from "../models/ITrip";
import {
  ITripEventRepository,
  TripCreatedEvent,
  TripUpdatedEvent,
  TripImportLocationsEvent,
  TripEvent
} from "./TripEvent";
import moment from "moment";

export class TripReducers {
  constructor(private TripEventRepository?: ITripEventRepository) {}

  async getCurrentState(id: String): Promise<ITrip> {
    if (!this.TripEventRepository) throw "are you forgot to init TripEventRepository ?";
    
    var events = await this.TripEventRepository.getAll(id);
    var state: ITrip = {
      id: "",
      name: "",
      fromDate: moment(),
      toDate: moment(),
      locations: []
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
      case "TripImportLocations":
        state = await this.updateTripLocations(state, event);
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
      locations: []
    };
  }

  async updateTrip(prevState: ITrip, command: TripUpdatedEvent): Promise<ITrip> {
    return {
      ...prevState,
      name: command.name,
      fromDate: command.fromDate,
      toDate: command.toDate
    };
  }

  async updateTripLocations(prevState: ITrip, command: TripImportLocationsEvent): Promise<ITrip> { 
    return {
      ...prevState,
      locations: command.locations
    };
  }
}
