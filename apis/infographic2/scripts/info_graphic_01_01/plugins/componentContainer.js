"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const strokeColorByLevel = {
    1: "green",
    2: "red",
    3: "blue",
    4: "green"
};
function componentContainer(baseFuncs, canvasAdaptor, blockConfig, cursor) {
    const paper = canvasAdaptor.getPaper();
    const { width, height } = blockConfig;
    let newBounds = {
        x: cursor.x,
        y: cursor.y,
        width: width ? width : cursor.width,
        height: height ? height : cursor.height
    };
    if (blockConfig.positioning) {
        const newXY = getRelativePosition(cursor, blockConfig.positioning);
        // console.log("newXY", newXY)
        newBounds = _.assign(newBounds, newXY);
    }
    // console.log("cursor", cursor);
    // console.log("newBounds", newBounds);
    const rect = new paper.Shape.Rectangle(new paper.Point(newBounds.x, newBounds.y), new paper.Size(newBounds.width, newBounds.height));
    rect.strokeColor = new paper.Color(strokeColorByLevel[cursor.level]);
    rect.strokeWidth = 10;
    if (_.isEmpty(baseFuncs))
        return _.assign({}, cursor, newBounds);
    const lastBaseFunc = baseFuncs[baseFuncs.length - 1];
    return lastBaseFunc(baseFuncs.slice(0, baseFuncs.length - 1), canvasAdaptor, blockConfig, _.assign({}, cursor, newBounds));
}
exports.componentContainer = componentContainer;
function getRelativePosition(bounds, positioning) {
    var x = bounds.x;
    var y = bounds.y;
    if (!positioning)
        return { x, y };
    if (positioning.left)
        x = x + positioning.left;
    if (positioning.right)
        x = x + bounds.width - positioning.right;
    if (positioning.top)
        y = y + positioning.top;
    if (positioning.bottom)
        y = bounds.height - positioning.bottom;
    return { x, y };
}
