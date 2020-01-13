"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const commonFunc = require("../../commonFunc");
const _ = require("lodash");
const strokeColorByLevel = {
    1: "green",
    2: "red",
    3: "blue",
    4: "green"
};
function componentText(baseFuncs, canvasAdaptor, blockConfig, cursor, trip) {
    return __awaiter(this, void 0, void 0, function* () {
        const paper = canvasAdaptor.getPaper();
        const text = getText(blockConfig, trip, cursor);
        const newCursor = renderTextBlock(canvasAdaptor, blockConfig, text, cursor);
        if (_.isEmpty(baseFuncs))
            return newCursor;
        const lastBaseFunc = baseFuncs[baseFuncs.length - 1];
        return lastBaseFunc(baseFuncs.slice(0, baseFuncs.length - 1), canvasAdaptor, blockConfig, newCursor);
    });
}
exports.componentText = componentText;
function renderTextBlock(canvasAdaptor, blockConfig, text, cursor) {
    var relativePosition = utils_1.getRelativePosition(cursor, blockConfig.positioning);
    if (blockConfig.textAnchor === "middle") {
        relativePosition.x = relativePosition.x + cursor.width / 2;
    }
    let locationNameNode = canvasAdaptor.drawText(text, relativePosition, {
        color: blockConfig.color,
        font: blockConfig.fontFamily,
        fontSize: blockConfig.fontSize,
        fontWeight: blockConfig.fontWeight,
        textAnchor: blockConfig.textAnchor,
        textTransform: blockConfig.textTransform,
        wrapNumber: blockConfig.width
        // wrapNumber: w - paddingLeftRight
    });
    let locationNameNodeBbox = locationNameNode.bounds;
    return _.assign({}, cursor, { y: cursor.y + locationNameNodeBbox.height });
}
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function getText(blockConfig, trip, cursor) {
    let feelingLabel = commonFunc.getFeelingLabel(trip.locale);
    let location = trip.locations[cursor.location], locationName = capitalizeFirstLetter(location.name) + ".", feeling = location.feeling ? feelingLabel + " " + location.feeling : "", activity = location.activity, highlights = location.highlights.toLowerCase(), nodeFeelingActivity = "";
    if (activity)
        nodeFeelingActivity = capitalizeFirstLetter(activity.toLowerCase());
    if (feeling) {
        feeling = capitalizeFirstLetter(feeling.toLowerCase());
        nodeFeelingActivity = nodeFeelingActivity
            ? nodeFeelingActivity + ". " + feeling
            : feeling;
    }
    if (nodeFeelingActivity)
        nodeFeelingActivity += ".";
    if (highlights)
        highlights = capitalizeFirstLetter(highlights) + ".";
    let text = blockConfig.text;
    if (text === "{{location.name}}") {
        text = locationName.toUpperCase();
    }
    if (text === "{{location.feeling}}") {
        text = nodeFeelingActivity;
    }
    if (text === "{{location.hight-lights}}") {
        text = highlights;
    }
    if (text === "{{trip.name}}") {
        text = trip.name.toUpperCase();
    }
    if (text === "{{trip.info}}") {
        let numberOfDays = trip.numberOfDays, numberOfLocations = trip.locations.length, dayLabel = commonFunc.getDayLabel(trip.locale, numberOfDays), locationLabel = commonFunc.getLocationLabel(trip.locale, numberOfLocations);
        let dayText = " " + dayLabel + ", ", locationText = " " + locationLabel, basicTripInfo = numberOfDays + dayText + numberOfLocations + locationText;
        text = basicTripInfo;
    }
    return text;
}
