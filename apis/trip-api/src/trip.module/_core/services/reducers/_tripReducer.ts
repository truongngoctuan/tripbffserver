import { ITrip } from "../../models/ITrip";
import {
  ITripEventRepository,
  TripImportLocationsEvent,
  TripEvent,
  TripLocationImageUploadedEvent} from "../events";
import moment from "moment";
import _ from "lodash";
import createInfographic from "./createInfographic";
import finishCreateInfographic from "./finishCreateInfographic";
import { removeLocation } from "./removeLocation";
import { addLocation } from "./addLocation";
import { TripCreatedEvent, TripUpdatedEvent } from "../events/TripEvents";
import { updateTripDateRange } from "./updateTripDateRange";
import { updateTripName } from "./updateTripName";
import { updateLocationFeeling } from "./updateLocationFeeling";
import { updateLocationActivity } from "./updateLocationActivity";
import { updateLocationAddress } from "./updateLocationAddress";
import { addTripLocationImage } from "./addTripLocationImage";
import { removeTripLocationImages } from "./removeTripLocationImages";
import { favorTripLocationImage } from "./favorTripLocationImage";
import { updateLocationHighlight } from "./updateLocationHighlight";
import { updateLocationDescription } from "./updateLocationDescription";
import { deleteTrip } from "./deleteTrip";
import finishShareInfographic from "./finishShareInfographic";

// var staticEventHandlers = new Map<string, Function>();

// export function staticRegister(eventType: string, eventHandler: Function) {
//   staticEventHandlers.set(eventType, eventHandler);
// }

export class TripReducers {
  constructor(private TripEventRepository?: ITripEventRepository) {}
  
  helloWorld() {
    return "hello world";
  }

  async getCurrentState(id: string): Promise<ITrip> {
    if (!this.TripEventRepository)
      throw "are you forgot to init TripEventRepository ?";

    const events = await this.TripEventRepository.getAll(id);
    // console.log("events");
    // console.log(JSON.stringify(events));
    let state: ITrip = {
      tripId: "",
      name: "",
      fromDate: moment().toDate(),
      toDate: moment().toDate(),
      locations: [],
      infographics: [],
      isDeleted: false,
      createdById: "",
      canContribute: false,
      isPublic: true
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
      case "TripDateRangeUpdated":
        return updateTripDateRange(state, event);
      case "TripNameUpdated":
        return updateTripName(state, event);
      case "TripImportLocations":
        return this.updateTripLocations(state, event);
      case "LocationRemoved":
        return removeLocation(state, event);
      case "LocationAdded":
        return addLocation(state, event);
      case "LocationFeelingUpdated":
        return updateLocationFeeling(state, event);
      case "LocationActivityUpdated":
        return updateLocationActivity(state, event);
      case "LocationAddressUpdated":
        return updateLocationAddress(state, event);
      case "LocationHighlightUpdated":
        return updateLocationHighlight(state, event);
      case "LocationDescriptionUpdated":
        return updateLocationDescription(state, event);
        case "LocationImageAdded":
        return addTripLocationImage(state, event);
      case "LocationImageUploaded":
        return this.updateTripLocationImage(state, event);
      case "LocationImagesRemoved":
        return removeTripLocationImages(state, event);
        case "LocationImagesFavored":
        return favorTripLocationImage(state, event);
      case "InfographicCreated":
        return createInfographic(state, event);
      case "InfographicExported":
        return finishCreateInfographic(state, event);
      case "InfographicShared": 
        return finishShareInfographic(state, event);
      case "TripDeleted":
        return deleteTrip(state, event);
      default:
        console.log("MISSING register event: ", (event as any).type);
        return state;
    }
  }

  createTrip(command: TripCreatedEvent): ITrip {
    return {
      tripId: command.tripId,
      name: command.name,
      fromDate: command.fromDate,
      toDate: command.toDate,
      locations: [],
      infographics: [],
      isDeleted: false,
      createdById: command.ownerId,
      canContribute: false,
      isPublic: command.isPublic
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
      toDate: command.toDate,
      isPublic: command.isPublic
    };
  }

  private defaultImageValue = {
    externalUrl: "",
    thumbnailExternalUrl: "",
    isFavorite: false
  }
  private updateTripLocations(
    prevState: ITrip,
    command: TripImportLocationsEvent
  ): ITrip {

    return {
      ...prevState,
      locations: command.locations.map(location => {
        return {
          ...location,
          images: location.images.map(img => {
            return {
              ...this.defaultImageValue,
              ...img
            };
        })
        };
      })
    };
  }

  updateTripLocationImage(
    prevState: ITrip,
    command: TripLocationImageUploadedEvent
  ): ITrip {

    //get location
    const locationIdx = _.findIndex(
      prevState.locations,
      loc => loc.locationId == command.locationId
    );

    const location = prevState.locations[locationIdx];
    if (location) {
      //get image
      const imageIdx = _.findIndex(
        location.images,
        img => img.imageId == command.imageId
      );
      const image = location.images[imageIdx];

      if (image) {
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
    
    return prevState;
  }

}
