import { ITrip } from "../models/ITrip";
import { ITripRepository } from "../models/ITripRepository";

export class TripQueryHandler {
  constructor(private TripRepository: ITripRepository) {}

  async GetById(ownerId: string, id: string): Promise<ITrip | undefined> {
    return this.TripRepository.get(ownerId, id);
  }

  async list(ownerId: string): Promise<ITrip[]> {
    var results = this.TripRepository.list(ownerId);
    return results;
  }
};