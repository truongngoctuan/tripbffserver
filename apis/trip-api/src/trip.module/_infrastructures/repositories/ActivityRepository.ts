import { IActivityRepository } from "../../_core/models/IActivityRepository";
import { ActivityDocument } from "../models/ActivityModel";
import { IActivity } from "../../_core/models/ITrip";
import { IActivityModel } from "../models/IActivityModel";

export class ActivityRepository implements IActivityRepository {
    toActivity(o: IActivityModel): IActivity {
        return {
            activityId: o.activityId,
            label_en: o.label_en,
            label_vi: o.label_vi,
            icon: o.icon
        };
    }

    public async list() {
        const activities = await ActivityDocument.find();
        return activities.map(f => this.toActivity(f));
    } 

    public async get(id: number) {
        const activity = await ActivityDocument.findOne({activityId: id});

        if (!activity)
            return undefined;

        return this.toActivity(activity);
    }

    public async insert(activity: IActivity) {
        const { activityId, label_en, label_vi, icon } = activity;
        const activityDocument = new ActivityDocument({
            activityId: activityId,
            label_en: label_en,
            label_vi: label_vi,
            icon: icon
        });

        activityDocument.save();
    }

    public async insertMany(activities: Array<IActivity>) {
        const activityDocuments = activities.map(f => {
            return new ActivityDocument({
                activityId: f.activityId,
                label_en: f.label_en,
                label_vi: f.label_vi,
                icon: f.icon
            });
        });
        ActivityDocument.insertMany(activityDocuments);
    }

    public async update(payload: IActivity) {
        const { activityId, label_en, label_vi, icon } = payload;
        const activity = await ActivityDocument.findOne(activityId);

        if (activity) {
            activity.label_en = label_en;
            activity.label_vi = label_vi;
            activity.icon = icon;
            activity.save();
        }
    }
}

export default ActivityRepository;