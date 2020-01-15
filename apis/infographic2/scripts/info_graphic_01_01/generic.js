"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const { executePlugins } = require("./plugins/index");
function log(level, message, data = undefined) {
    if (data)
        console.log(lodash_1.default.repeat("    ", level) + message, data);
    else
        console.log(lodash_1.default.repeat("    ", level) + message);
}
function renderLessBlock(canvasAdaptor, blockConfig, trip, cursor) {
    return __awaiter(this, void 0, void 0, function* () {
        log(cursor.level, "render-less block", blockConfig.type);
        // log(cursor.level, "cursor", cursor);
        return cursor;
    });
}
function renderLocation(canvasAdaptor, blockConfig, trip, cursor) {
    return __awaiter(this, void 0, void 0, function* () {
        // log(cursor.level, "render block", blockConfig.type);
        return lodash_1.default.assign({}, cursor, { location: cursor.location + 1 });
    });
}
function renderLocationImage(canvasAdaptor, blockConfig, trip, cursor) {
    return __awaiter(this, void 0, void 0, function* () {
        log(cursor.level, "render block", blockConfig.type);
        // log(cursor.level, "cursor", cursor);
        // load default image if location has no image
        var imgUri = trip.locations[cursor.location].signedUrl &&
            !lodash_1.default.isEmpty(trip.locations[cursor.location].signedUrl)
            ? trip.locations[cursor.location].signedUrl
            : "./data/images/EmptyImage01.jpg";
        var result = (yield canvasAdaptor.drawImage(imgUri, getRelativePosition(cursor, blockConfig.positioning), {
            width: blockConfig.width,
            height: blockConfig.height,
            clipPath: blockConfig.clipPath
        }));
        // log(cursor.level, "new w h", `${result.width} ${result.height}`);
        return lodash_1.default.assign({}, cursor, { y: cursor.y + result.height });
    });
}
function renderImage(canvasAdaptor, blockConfig, trip, cursor) {
    return __awaiter(this, void 0, void 0, function* () {
        log(cursor.level, "render block", blockConfig.type);
        // log(cursor.level, "cursor", cursor);
        const relativePosition = getRelativePosition(cursor, blockConfig.positioning);
        log(cursor.level, "relative position", relativePosition);
        yield canvasAdaptor.drawImage(blockConfig.url, getRelativePosition(cursor, blockConfig.positioning));
    });
}
function getRelativePosition(cursor, positioning) {
    var x = cursor.x;
    var y = cursor.y;
    if (!positioning)
        return { x, y };
    if (positioning.left)
        x = x + positioning.left;
    if (positioning.right)
        x = x + cursor.width - positioning.right;
    if (positioning.top)
        y = y + positioning.top;
    if (positioning.bottom)
        y = y + cursor.height - positioning.bottom;
    return { x, y };
}
function renderBlock(canvasAdaptor, blockConfig, trip, cursor) {
    return __awaiter(this, void 0, void 0, function* () {
        if (blockConfig.type === "container" || blockConfig.type === "location") {
            log(cursor.level, "render block", blockConfig.type);
        }
        var nextCursor = lodash_1.default.assign({}, cursor, { level: cursor.level + 1 });
        let isFixedHeight = false;
        if (blockConfig.type === "container") {
            isFixedHeight = blockConfig.height > 0;
            const deltaHeight = blockConfig.height;
            if (deltaHeight > 0) {
                nextCursor.height = nextCursor.height + deltaHeight;
            }
            nextCursor = yield executePlugins(blockConfig.type, canvasAdaptor, blockConfig, cursor, trip);
            // console.log("nextCursor return container", nextCursor);
        }
        if (blockConfig.type === "location") {
            isFixedHeight = blockConfig.height > 0;
            nextCursor = yield executePlugins(blockConfig.type, canvasAdaptor, blockConfig, cursor, trip);
            // console.log("nextCursor return location", nextCursor);
        }
        var totalHeight = 0;
        if (!lodash_1.default.isEmpty(blockConfig.blocks)) {
            const containerBlockConfig = blockConfig;
            let childBlockConfigs = [];
            if (blockConfig.type === "locations") {
                // nLoc > nLocConfig, clone locConfig until n == nLoc
                // else keep just enough logConfig
                const nLoc = trip.locations.length;
                const nLocConfig = containerBlockConfig.blocks.length;
                if (nLoc > nLocConfig) {
                    for (let iLoc = 0; iLoc < nLoc; iLoc++) {
                        const locConfig = containerBlockConfig.blocks[iLoc % nLocConfig];
                        childBlockConfigs.push(locConfig);
                    }
                }
                else {
                    childBlockConfigs = containerBlockConfig.blocks.slice(0, nLoc);
                }
                // console.log("childBlockConfigs.length", childBlockConfigs.length);
            }
            else {
                childBlockConfigs = [...containerBlockConfig.blocks];
            }
            let isStackingHeight = false;
            for (var i = 0; i < childBlockConfigs.length; i++) {
                var previousChildBlock = i != 0 ? childBlockConfigs[i - 1] : undefined;
                var childBlock = childBlockConfigs[i];
                // log(
                //   cursor.level + 1,
                //   "cursor info",
                //   `w=${cursor.width} h=${cursor.height}`
                // );
                if (previousChildBlock &&
                    (previousChildBlock.type === "container" ||
                        previousChildBlock.type === "location" ||
                        // previousChildBlock.type === "location-image" ||
                        previousChildBlock.type === "text")) {
                    isStackingHeight = true;
                    // console.log("debugging", cursor.y + " " + totalHeight);
                }
                var next = yield renderBlock(canvasAdaptor, childBlock, trip, lodash_1.default.assign({}, nextCursor, {
                    level: cursor.level + 1,
                    y: isStackingHeight ? nextCursor.y : cursor.y
                }));
                if (!isFixedHeight &&
                    next &&
                    (childBlock.type === "container" || childBlock.type === "location")) {
                    totalHeight += next.height;
                }
                if (!lodash_1.default.isEmpty(next))
                    nextCursor = next;
            }
        }
        if (blockConfig.type === "container" || blockConfig.type === "location") {
            if (isFixedHeight) {
                nextCursor.totalHeight = blockConfig.height;
            }
            else {
                nextCursor.totalHeight = totalHeight;
            }
            // log(cursor.level, "cursor", nextCursor);
            // log(cursor.level, "totalHeight", nextCursor.totalHeight);
        }
        if (blockConfig.type === "container") {
            //reset cursor
            return lodash_1.default.assign({}, nextCursor, {
                x: cursor.x,
                y: cursor.y + nextCursor.height,
                width: cursor.width
            });
        }
        else if (blockConfig.type === "location") {
            return yield renderLocation(canvasAdaptor, blockConfig, trip, lodash_1.default.assign({}, nextCursor, {
                x: cursor.x,
                y: cursor.y + nextCursor.height,
                width: cursor.width
            }));
        }
        else if (lodash_1.default.findIndex(["text", "line", "circle"], type => blockConfig.type === type) !== -1) {
            return yield executePlugins(blockConfig.type, canvasAdaptor, blockConfig, cursor, trip);
            // return await renderTextBlock(canvasAdaptor, blockConfig, trip, cursor);
        }
        else if (blockConfig.type === "location-image") {
            return yield renderLocationImage(canvasAdaptor, blockConfig, trip, cursor);
        }
        else if (blockConfig.type === "image") {
            return yield renderImage(canvasAdaptor, blockConfig, trip, cursor);
        }
        return yield renderLessBlock(canvasAdaptor, blockConfig, trip, cursor);
    });
}
function renderInfographic(canvasAdaptor, infographicConfig, trip) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultCursor = {
            x: 0,
            y: 0,
            level: 0,
            width: infographicConfig.width,
            height: 0,
            totalWidth: infographicConfig.width,
            totalHeight: 0,
            location: 0
        };
        const finalCursor = yield renderBlock(canvasAdaptor, infographicConfig, trip, defaultCursor);
        console.log("final cursor", finalCursor);
        canvasAdaptor.resize(finalCursor.totalWidth, finalCursor.totalHeight);
        // canvasAdaptor.resize(3000, 3000);
        canvasAdaptor.drawBackground(infographicConfig.backgroundColor);
        return;
    });
}
module.exports = {
    renderInfographic
};
