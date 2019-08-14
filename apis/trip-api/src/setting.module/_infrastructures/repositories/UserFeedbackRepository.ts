import { IUserFeedbackRepository } from "../../_core/models/IUserFeedbackRepository";
import { UserFeedbackDocument } from "../models/UserFeedbackModel";
import { IUserFeedbackModel } from "../models/interfaces/IUserFeedbackModel";
import { IUserFeedback } from "../../_core/models/IUserFeedback";

export class UserFeedbackRepository implements IUserFeedbackRepository {
    toFeedback(o: IUserFeedbackModel): IUserFeedback {
        return {
            userId: o.userId,
            feedback: o.feedback,
            email: o.email
        }
    }

    public async list() {
        var feedbacks = await UserFeedbackDocument.find();
        return feedbacks.map(f => this.toFeedback(f));
    }     

    public async insert(userFeedback: IUserFeedback) {
        var { userId, feedback, email } = userFeedback;
        var feedbackDocument = new UserFeedbackDocument({
            userId: userId,
            feedback: feedback,
            email: email
        });

        feedbackDocument.save();
    }    
}

export default UserFeedbackRepository