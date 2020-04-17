import { IFeelingRepository } from "../../_core/models/IFeelingRepository";
import { FeelingDocument } from "../models/FeelingModel";
import { IFeelingModel } from "../models/IFeelingModel";
import { IFeeling } from "../../_core/models/ITrip";

export class FeelingRepository implements IFeelingRepository {
  toFeeling(o: IFeelingModel): IFeeling {
    return {
      feelingId: o.feelingId,
      label_en: o.label_en,
      label_vi: o.label_vi,
      icon: o.icon,
    };
  }

  public async list() {
    const feelings = await FeelingDocument.find();
    return feelings.map((f) => this.toFeeling(f));
  }

  public async get(id: number) {
    const feeling = await FeelingDocument.findOne({ feelingId: id });

    if (!feeling) return undefined;

    return this.toFeeling(feeling);
  }

  public async insert(feeling: IFeeling) {
    const { feelingId, label_en, label_vi, icon } = feeling;
    const feelingDocument = new FeelingDocument({
      feelingId: feelingId,
      label_en: label_en,
      label_vi: label_vi,
      icon: icon,
    });

    feelingDocument.save();
  }

  public async insertMany(feelings: Array<IFeeling>) {
    const feelingDocuments = feelings.map((f) => {
      return new FeelingDocument({
        feelingId: f.feelingId,
        label_en: f.label_en,
        label_vi: f.label_vi,
        icon: f.icon,
      });
    });
    FeelingDocument.insertMany(feelingDocuments);
  }

  public async update(payload: IFeeling) {
    const { feelingId, label_en, label_vi, icon } = payload;
    const feeling = await FeelingDocument.findOne(feelingId);

    if (feeling) {
      feeling.label_en = label_en;
      feeling.label_vi = label_vi;
      feeling.icon = icon;
      feeling.save();
    }
  }
}

export default FeelingRepository;
