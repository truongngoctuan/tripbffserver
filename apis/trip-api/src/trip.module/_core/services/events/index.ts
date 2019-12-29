import { Moment } from "moment";
import { ITripLocation, IHighlight } from "../../models/ITrip";
import { TripCreatedEvent, TripUpdatedEvent, TripDateRangeUpdatedEvent, TripNameUpdatedEvent, TripDeletedEvent } from "./TripEvents";

export type TripEvent =
  | TripCreatedEvent
  | TripUpdatedEvent
  | TripDateRangeUpdatedEvent
  | TripNameUpdatedEvent
  | TripImportLocationsEvent
  | TripLocationRemovedEvent
  | TripLocationAddedEvent
  | TripLocationImageAddedEvent
  | TripLocationImageUploadedEvent
  | TripLocationImagesRemovedEvent
  | TripLocationImageFavoredEvent
  | TripLocationUpdatedFeelingEvent
  | TripLocationUpdatedActivityEvent
  | TripLocationUpdatedAddressEvent
  | TripLocationUpdatedHighlightEvent
  | TripLocationUpdatedDescriptionEvent
  | InfographicCreatedEvent
  | InfographicExportedEvent
  | TripDeletedEvent;

export type TripImportLocationsEvent = {
  type: "TripImportLocations";
  ownerId: string;
  tripId: string;
  locations: {
    locationId: string;
    name: string;
    location: {
      long: number;
      lat: number;
      address: string;
    };
    fromTime: Moment;
    toTime: Moment;
    images: {
      imageId: string;
      url: string; //url stored in local mobile
      time: Moment;
    }[];
  }[];
};

export type TripLocationRemovedEvent = {
  type: "LocationRemoved";
  ownerId: string;
  tripId: string;
  locationId: string;
};

export type TripLocationAddedEvent = {
  type: "LocationAdded";
  ownerId: string;
  tripId: string;
  location: ITripLocation;
};


export type TripLocationImageAddedEvent = {
  type: "LocationImageAdded";
  ownerId: string;
  tripId: string;
  locationId: string;
  imageId: string;
  url: string;
  time: Moment;
};

export type TripLocationImageUploadedEvent = {
  type: "LocationImageUploaded";
  ownerId: string;
  tripId: string;
  locationId: string;
  imageId: string;
  externalStorageId: string;
};

export type TripLocationImagesRemovedEvent = {
  type: "LocationImagesRemoved";
  ownerId: string;
  tripId: string;
  locationId: string;
  imageIds: string[];
};

export type TripLocationImageFavoredEvent = {
  type: "LocationImagesFavored";
  ownerId: string;
  tripId: string;
  locationId: string;
  imageId: string;
  isFavorite: boolean;
};

export type TripLocationUpdatedFeelingEvent = {
  type: "LocationFeelingUpdated";
  ownerId: string;
  tripId: string;
  locationId: string;
  feelingId: string;
  label_en: string;
  label_vi: string;
  feelingIcon: string;
}

export type TripLocationUpdatedActivityEvent = {
  type: "LocationActivityUpdated";
  ownerId: string;
  tripId: string;
  locationId: string;
  activityId: string;
  label_en: string;
  label_vi: string;
  activityIcon: string;
}

export type TripLocationUpdatedHighlightEvent = {
  type: "LocationHighlightUpdated";
  ownerId: string;
  tripId: string;
  locationId: string;
  highlights: Array<IHighlight>;
}

export type TripLocationUpdatedAddressEvent = {
  type: "LocationAddressUpdated";
  ownerId: string;
  tripId: string;
  locationId: string;
  name: string;
  address: string;
  long: number;
  lat: number;
}

export type TripLocationUpdatedDescriptionEvent = {
  type: "LocationDescriptionUpdated";
  ownerId: string;
  tripId: string;
  locationId: string;
  description: string;
}

export type InfographicCreatedEvent = {
  type: "InfographicCreated";
  ownerId: string;
  tripId: string;
  infographicId: string;
};

export type InfographicExportedEvent = {
  type: "InfographicExported";
  ownerId: string;
  tripId: string;
  infographicId: string;
  externalStorageId: string;
};

export class EventHandler {
  constructor(private eventRepository: ITripEventRepository) {}
  async save(event: TripEvent) {
    await this.eventRepository.save(event);
  }
}

export interface ITripEventRepository {
  save: (event: TripEvent) => Promise<void>;
  getAll: (id: string) => Promise<TripEvent[]>;
}
