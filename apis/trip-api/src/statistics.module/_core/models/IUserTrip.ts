import { ILogin } from "./IUser";
import { ITrip } from "../../../trip.module/_core/models/ITrip";

export interface IUserTrip {
    userId: string,
    logins: ILogin[],
    trips: Array<ITrip>
}