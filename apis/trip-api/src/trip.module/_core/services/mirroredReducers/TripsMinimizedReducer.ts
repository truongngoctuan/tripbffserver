import { ITrip } from "../../models/ITrip";
import _ from "lodash";
import { ITripMinimized } from "../../models/ITripsRepository";



export class TripsMinimizedReducer {

  async transform(state: ITrip): Promise<ITripMinimized> {

    //each location will have an represent image
    //if image = "" mean to be filled with default image
    const locationImages = state.locations.map(loc => {
      var favoredImages = loc.images.filter(img => img.isFavorite);
      let returnId;
      if (favoredImages.length > 0)
        returnId = favoredImages[0].externalStorageId;
      if (loc.images.length > 0)
        returnId = loc.images[0].externalStorageId;

      return {
        name: loc.name,
        address: loc.location.address,
        description: loc.description as string,
        imageUrl: returnId ? returnId : "",
      }
    });


    let newState: ITripMinimized = {
      tripId: state.tripId,
      name: state.name,
      fromDate: state.fromDate,
      toDate: state.toDate,
      locationImages,
      isDeleted: state.isDeleted
    }

    return newState;
  }

  // updateState(state: ITrip, event: TripEvent): ITrip {
  //   switch (event.type) {
  //     case "TripCreated":
  //       return createTrip(event);
  //     case "TripUpdated":
  //       return updateTrip(state, event);
  //     case "TripDateRangeUpdated":
  //       return updateTripDateRange(state, event);
  //     case "TripNameUpdated":
  //       return updateTripName(state, event);
  //     case "TripImportLocations":
  //       return updateTripLocations(state, event);
  //     case "LocationRemoved":
  //       return removeLocation(state, event);
  //     case "LocationAdded":
  //       return addLocation(state, event);
  //     case "LocationFeelingUpdated":
  //       return state;
  //     case "LocationActivityUpdated":
  //       return state;
  //     case "LocationAddressUpdated":
  //       return state;
  //     case "LocationHighlightUpdated":
  //       return state;
  //     case "LocationDescriptionUpdated":
  //       return state;
  //       case "LocationImageAdded":
  //       return addTripLocationImage(state, event);
  //     case "LocationImageUploaded":
  //       return updateTripLocationImage(state, event);
  //     case "LocationImagesRemoved":
  //       return removeTripLocationImages(state, event);
  //       case "LocationImagesFavored":
  //       return favorTripLocationImage(state, event);
  //     case "InfographicCreated":
  //       return state;
  //     case "InfographicExported":
  //       return state;
  //     default:
  //       console.log("MISSING register event: ", (event as any).type);
  //       return state;
  //   }
  // }

}
