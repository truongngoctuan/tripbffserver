import { ITripEventRepository, TripEvent } from "./events";

export class TripEventQueryHandler {
  constructor(private TripEventRepository: ITripEventRepository) {}

  async getAll(id: string): Promise<TripEvent[] | undefined> {
    return this.TripEventRepository.getAll(id);
  }
};