import { IActivityRepository } from "../../_core/models/IActivityRepository";
import { ActivityDocument } from "../models/ActivityModel";
import { IActivity } from "../../_core/models/ITrip";
import { IActivityModel } from "../models/IActivityModel";

export class ActivityRepository implements IActivityRepository {
    toActivity(o: IActivityModel): IActivity {
        return {
            activityId: o.activityId,
            label: o.label,
            icon: o.icon
        }
    }

    public async list() {
        var activities = await ActivityDocument.find();
        return activities.map(f => this.toActivity(f));
    } 

    public async get(id: number) {
        var activity = await ActivityDocument.findOne({activityId: id});

        if (!activity)
            return undefined;

        return this.toActivity(activity);
    }

    public async insert(activity: IActivity) {
        var { activityId, label, icon } = activity;
        var activityDocument = new ActivityDocument({
            activityId: activityId,
            label: label,
            icon: icon
        });

        activityDocument.save();
    }

    public async insertMany(activities: Array<IActivity>) {
        var activityDocuments = activities.map(f => {
            return new ActivityDocument({
                activityId: f.activityId,
                label: f.label,
                icon: f.icon
            });
        });
        ActivityDocument.insertMany(activityDocuments);
    }

    public async update(payload: IActivity) {
        var { activityId, label, icon } = payload;
        var activity = await ActivityDocument.findOne(activityId);

        if (activity) {
            activity.label = label;
            activity.icon = icon;
            activity.save();
        }
    }
}

export default ActivityRepository