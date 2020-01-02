import { SearchLocationRepository } from "../../_infrastructures/repositories/SearchLocationRepository";
import { ISearchLocation } from "../models/ISearchLocation";
const fs = require("fs"),
    path = require("path");

function deg2rad(deg: number): number {
  return deg * (Math.PI/180);
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371*1000; // Radius of the earth in meter
  const dLat = deg2rad(lat2-lat1);  // deg2rad below
  const dLon = deg2rad(lon2-lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance
  return d;
}

export function insertSearchLocations(filePath: string): void {
  const searchLocationRepository = new SearchLocationRepository();

  fs.readFile(filePath, function(err: any, data: any){
    if (!err) {
      // store data to DB            
      const result = JSON.parse(data);
      const locations = result.Locations as Array<ISearchLocation>;
      searchLocationRepository.insertMany(locations);
    } else {
        console.log(err);
    }
  });
}