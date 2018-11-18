import { ITrip } from "../models/ITrip";
import {
  ITripEventRepository,
  TripCreatedEvent,
  TripUpdatedEvent,
  TripImportLocationsEvent,
  TripEvent,
  TripLocationImageUploadedEvent
} from "./TripEvent";
import moment from "moment";
import _ from "lodash";

export class TripReducers {
  constructor(private TripEventRepository?: ITripEventRepository) {}

  async getCurrentState(id: string): Promise<ITrip> {
    if (!this.TripEventRepository)
      throw "are you forgot to init TripEventRepository ?";

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
      case "LocationImageUploaded":
        state = await this.updateTripLocationImage(state, event);
      default:
        break;
    }

    return state;
  }

  async createTrip(command: TripCreatedEvent): Promise<ITrip> {
    return {
      id: command.tripId,
      name: command.name,
      fromDate: command.fromDate,
      toDate: command.toDate,
      locations: []
    };
  }

  async updateTrip(
    prevState: ITrip,
    command: TripUpdatedEvent
  ): Promise<ITrip> {
    return {
      ...prevState,
      name: command.name,
      fromDate: command.fromDate,
      toDate: command.toDate
    };
  }

  async updateTripLocations(
    prevState: ITrip,
    command: TripImportLocationsEvent
  ): Promise<ITrip> {
    return {
      ...prevState,
      locations: command.locations
    };
  }

  async updateTripLocationImage(
    prevState: ITrip,
    command: TripLocationImageUploadedEvent
  ): Promise<ITrip> {

    //get location
    var locationIdx = _.findIndex(
      prevState.locations,
      loc => loc.locationId == command.locationId
    );

    var location = prevState.locations[locationIdx];

    //get image
    var imageIdx = _.findIndex(
      location.images,
      img => img.imageId == command.imageId
    );
    var image = location.images[imageIdx];
    image.externalStorageId = command.externalStorageId;

    //update state
    location.images = [
      ...location.images.slice(0, imageIdx),
      image,
      ...location.images.slice(imageIdx + 1)
    ];

    return {
      ...prevState,
      locations: [
        ...prevState.locations.slice(0, locationIdx),
        location,
        ...prevState.locations.slice(locationIdx + 1)
      ]
    };
  }
}
