import { IFeelingRepository } from "../../_core/models/IFeelingRepository";
import { FeelingDocument } from "../models/FeelingModel";
import { IFeelingModel } from "../models/IFeelingModel";
import { IFeeling } from "../../_core/models/ITrip";

export class FeelingRepository implements IFeelingRepository {
    toFeeling(o: IFeelingModel): IFeeling {
        return {
            feelingId: o.feelingId,
            label: o.label
        }
    }

    public async list() {
        var feelings = await FeelingDocument.find();
        return feelings.map(f => this.toFeeling(f));
    } 

    public async get(id: String) {
        var feeling = await FeelingDocument.findOne(id);

        if (!feeling)
            return undefined;

        return this.toFeeling(feeling);
    }

    // public async insert(feeling: IFeeling) {
    //     var { feelingId, label } = feeling;
    //     var feelingDocument = new FeelingDocument({
    //         feelingId: feelingId,
    //         label: label
    //     });

    //     feelingDocument.save();
    // }

    // public async insertMany(feelings: Array<IFeeling>) {
    //     var feelingDocuments = feelings.map(f => {
    //         return new FeelingDocument({
    //             feelingId: f.feelingId,
    //             label: f.label
    //         });
    //     });
    //     FeelingDocument.insertMany(feelingDocuments);
    // }

    // public async update(payload: IFeeling) {
    //     var { feelingId, label } = payload;
    //     var feeling = await FeelingDocument.findOne(feelingId);

    //     if (feeling) {
    //         feeling.label = label;
    //         feeling.save();
    //     }
    // }
}

export default FeelingRepository