import { IHighlightRepository } from "../../_core/models/IHighlightRepository";
import { HighlightDocument } from "../models/HighlightModel";
import { IHighlight } from "../../_core/models/ITrip";
import { IHighlightModel } from "../models/IHighlightModel";

export class HighlightRepository implements IHighlightRepository {
    toHighlight(o: IHighlightModel): IHighlight {
        return {
            highlightId: o.highlightId,
            label: o.label,
            type: o.type
        }
    }

    public async list() {
        var highlights = await HighlightDocument.find();
        return highlights.map(f => this.toHighlight(f));
    } 

    public async get(id: number) {
        var highlight = await HighlightDocument.findOne({highlightId: id});

        if (!highlight)
            return undefined;

        return this.toHighlight(highlight);
    }

    public async insert(highlight: IHighlight) {
        var { highlightId, label, type } = highlight;
        var highlightDocument = new HighlightDocument({
            highlightId: highlightId,
            label: label,
            type: type
        });

        highlightDocument.save();
    }

    public async insertMany(highlights: Array<IHighlight>) {
        var highlightDocuments = highlights.map(f => {
            return new HighlightDocument({
                highlightId: f.highlightId,
                label: f.label,
                type: f.type
            });
        });
        HighlightDocument.insertMany(highlightDocuments);
    }

    public async update(payload: IHighlight) {
        var { highlightId, label, type } = payload;
        var highlight = await HighlightDocument.findOne(highlightId);

        if (highlight) {
            highlight.label = label;
            highlight.type = type;
            highlight.save();
        }
    }
}

export default HighlightRepository