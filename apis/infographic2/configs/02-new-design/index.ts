import { config02Locations } from "./2-locations";
import { config03Locations } from "./3-locations";
import { configNLocations } from "./n-locations";
import { config01Location } from "./1-location";

export const fullNewDesignConfig = {
  1: config01Location,
  2: config02Locations,
  3: config03Locations,
  n: configNLocations
};