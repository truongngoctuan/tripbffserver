import { ISearchLocationRepository } from "../../_core/models/ISearchLocationRepository";
import { SearchLocationDocument } from "../models/SearchLocationModel";
import { ISearchLocationModel } from "../models/ISearchLocationModel";
import { ISearchLocation } from "../../_core/models/ISearchLocation";

export class SearchLocationRepository implements ISearchLocationRepository {
    toLocation(o: ISearchLocationModel): ISearchLocation {
        return {
            title: o.title,
            address: o.address,
            long: o.long,
            lat: o.lat
        }
    }

    public async list() {
        var locations = await SearchLocationDocument.find();
        return locations.map(f => this.toLocation(f));
    } 

    public async insertMany(locations: Array<ISearchLocation>) {        
        var searchLocationDocuments = locations.map(f => {
            return new SearchLocationDocument({
                title: f.title,
                address: f.address,
                long: f.long,
                lat: f.lat
            });
        });
        SearchLocationDocument.insertMany(searchLocationDocuments);
    }    
}

export default SearchLocationRepository