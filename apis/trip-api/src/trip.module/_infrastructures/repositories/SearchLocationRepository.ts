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
            var queryItems = query.split(' ');
            var newQuery = '';

            queryItems.forEach(item => {                
                item = item.toLowerCase();

                if (item.startsWith('d')) {
                    var newItem = item.replace('d', 'đ');
                    newQuery = query.replace(item, newItem);
                }
            }); 

            console.log('new query: ' + newQuery);

            var phrase = "\"" + query + "\"";            
            locations = await SearchLocationDocument.find({ $text: { $search: phrase } });

            if (newQuery) {
                var newPhrase = "\"" + newQuery + "\"";            
                var newLocations = await SearchLocationDocument.find({ $text: { $search: newPhrase } });
                console.log('new locations: ' + JSON.stringify(newLocations));
                locations.push(newLocations);
            }
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