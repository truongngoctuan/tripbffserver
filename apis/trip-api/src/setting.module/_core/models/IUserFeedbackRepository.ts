import { IUserFeedback } from "./IUserFeedback";

export interface IUserFeedbackRepository {
  list: () => Promise<Array<IUserFeedback>>;
  insert: (feeling: IUserFeedback) => Promise<void>;
}
