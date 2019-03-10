import { IFeelingRepository } from "../../_core/models/IFeelingRepository";
import { FeelingDocument } from "../models/FeelingModel";
import { IFeelingModel } from "../models/IFeelingModel";
import { IFeeling } from "../../_core/models/ITrip";

export class FeelingRepository implements IFeelingRepository {
    toFeeling(o: IFeelingModel): IFeeling {
        return {
            feelingId: o.feelingId,
            label: o.label,
            icon: o.icon
        }
    }

    public async list() {
        var feelings = await FeelingDocument.find();
        return feelings.map(f => this.toFeeling(f));
    } 

    public async get(id: number) {
        var feeling = await FeelingDocument.findOne(id);

        if (!feeling)
            return undefined;

        return this.toFeeling(feeling);
    }

    public async insert(feeling: IFeeling) {
        var { feelingId, label, icon } = feeling;
        var feelingDocument = new FeelingDocument({
            feelingId: feelingId,
            label: label,
            icon: icon
        });

        feelingDocument.save();
    }

    public async insertMany(feelings: Array<IFeeling>) {
        var feelingDocuments = feelings.map(f => {
            return new FeelingDocument({
                feelingId: f.feelingId,
                label: f.label,
                icon: f.icon
            });
        });
        FeelingDocument.insertMany(feelingDocuments);
    }

    public async update(payload: IFeeling) {
        var { feelingId, label, icon } = payload;
        var feeling = await FeelingDocument.findOne(feelingId);

        if (feeling) {
            feeling.label = label;
            feeling.icon = icon;
            feeling.save();
        }
    }
}

export default FeelingRepository