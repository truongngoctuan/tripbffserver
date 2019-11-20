import { ISearchLocationRepository } from "../../_core/models/ISearchLocationRepository";
import { SearchLocationDocument, ISearchLocationDocument } from "../models/SearchLocationModel";
import { ISearchLocationModel } from "../models/ISearchLocationModel";
import { ISearchLocation } from "../../_core/models/ISearchLocation";
import { DocumentQuery } from "mongoose";

export class SearchLocationRepository implements ISearchLocationRepository {
    toLocation(o: ISearchLocationModel): ISearchLocation {
        return {
            title: o.title,
            address: o.address,
            long: o.long,
            lat: o.lat
        }
    }

    public async list(query: string) {
        var locations;

        if (query) {            
            var regex = ".*" + query + ".*";            
            locations = await SearchLocationDocument.find({ title: { $regex: regex, $options: "i" } });
        }
        else {
            locations = await SearchLocationDocument.find();
        }

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