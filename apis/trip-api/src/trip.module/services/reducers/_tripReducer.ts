import { ITrip } from "../../models/ITrip";
import {
  ITripEventRepository,
  TripCreatedEvent,
  TripUpdatedEvent,
  TripImportLocationsEvent,
  TripEvent,
  TripLocationImageUploadedEvent} from "../TripEvent";
import moment from "moment";
import _ from "lodash";
import createInfographic from "./createInfographic";

export class TripReducers {
  constructor(private TripEventRepository?: ITripEventRepository) {}

  async getCurrentState(id: string): Promise<ITrip> {
    if (!this.TripEventRepository)
      throw "are you forgot to init TripEventRepository ?";

    var events = await this.TripEventRepository.getAll(id);
    // console.log("events");
    // console.log(JSON.stringify(events));
    var state: ITrip = {
      id: "",
      name: "",
      fromDate: moment(),
      toDate: moment(),
      locations: [],
      infographics: []
    };

    events.forEach((event) => {
      state = this.updateState(state, event);
    });

    return state;
  }

  updateState(state: ITrip, event: TripEvent): ITrip {
    switch (event.type) {
      case "TripCreated":
        return this.createTrip(event);
      case "TripUpdated":
      return this.updateTrip(state, event);
      case "TripImportLocations":
      return this.updateTripLocations(state, event);
      case "LocationImageUploaded":
      return this.updateTripLocationImage(state, event);
      case "InfographicCreated":
      return createInfographic(state, event);
      default:
        return state;
    }
  }

  createTrip(command: TripCreatedEvent): ITrip {
    return {
      id: command.tripId,
      name: command.name,
      fromDate: command.fromDate,
      toDate: command.toDate,
      locations: [],
      infographics: []
    };
  }

  updateTrip(
    prevState: ITrip,
    command: TripUpdatedEvent
  ): ITrip {
    return {
      ...prevState,
      name: command.name,
      fromDate: command.fromDate,
      toDate: command.toDate
    };
  }

  updateTripLocations(
    prevState: ITrip,
    command: TripImportLocationsEvent
  ): ITrip {
    return {
      ...prevState,
      locations: command.locations
    };
  }

  updateTripLocationImage(
    prevState: ITrip,
    command: TripLocationImageUploadedEvent
  ): ITrip {

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
