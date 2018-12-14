import { ITrip } from "../models/ITrip";
import { ITripRepository } from "../models/ITripRepository";

export class TripQueryHandler {
  constructor(private TripRepository: ITripRepository) {}

  async GetById(id: string): Promise<ITrip | undefined> {
    return this.TripRepository.get(id);
  }

  // async list(): Promise<ITrip[]> {
  //   var results = this.TripRepository.list();
  //   return results;
  // }
};