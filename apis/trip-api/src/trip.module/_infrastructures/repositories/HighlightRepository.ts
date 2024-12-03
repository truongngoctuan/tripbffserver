import { IHighlightRepository } from "../../_core/models/IHighlightRepository";
import { HighlightDocument } from "../models/HighlightModel";
import { IHighlight } from "../../_core/models/ITrip";
import { IHighlightModel } from "../models/IHighlightModel";

export class HighlightRepository implements IHighlightRepository {
  toHighlight(o: IHighlightModel): IHighlight {
    return {
      highlightId: o.highlightId,
      label_en: o.label_en,
      label_vi: o.label_vi,
      highlightType: o.highlightType,
    };
  }

  public async list() {
    const highlights = await HighlightDocument.find();
    return highlights.map((f) => this.toHighlight(f));
  }

  public async get(id: number) {
    const highlight = await HighlightDocument.findOne({ highlightId: id.toString() });

    if (!highlight) return undefined;

    return this.toHighlight(highlight);
  }

  public async insert(highlight: IHighlight) {
    const { highlightId, label_en, label_vi, highlightType } = highlight;
    const highlightDocument = new HighlightDocument({
      highlightId: highlightId,
      label_en: label_en,
      label_vi: label_vi,
      highlightType: highlightType,
    });

    highlightDocument.save();
  }

  public async insertMany(highlights: Array<IHighlight>) {
    const highlightDocuments = highlights.map((f) => {
      return new HighlightDocument({
        highlightId: f.highlightId,
        label_en: f.label_en,
        label_vi: f.label_vi,
        highlightType: f.highlightType,
      });
    });
    HighlightDocument.insertMany(highlightDocuments);
  }

  public async update(payload: IHighlight) {
    const { highlightId, label_en, label_vi, highlightType } = payload;
    const highlight = await HighlightDocument.findOne({ highlightId });

    if (highlight) {
      highlight.label_en = label_en;
      highlight.label_vi = label_vi;
      highlight.highlightType = highlightType;
      highlight.save();
    }
  }
}

export default HighlightRepository;
