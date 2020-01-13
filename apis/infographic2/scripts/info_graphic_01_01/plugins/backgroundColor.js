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
const _ = require("lodash");
function backgroundColor(baseFuncs, canvasAdaptor, blockConfig, cursor) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("backgroundColor", blockConfig);
        const { backgroundColor } = blockConfig;
        if (backgroundColor) {
            // console.log("backgroundColor", backgroundColor);
            const { x, y, width, height } = cursor;
            console.log(`cursor${x} ${y} ${width} ${height}`);
            //todo use fillColor in the current layer
            canvasAdaptor.drawRect({
                x,
                y,
                width,
                height,
                backgroundColor
            });
        }
        if (_.isEmpty(baseFuncs))
            return cursor;
        const lastBaseFunc = baseFuncs[baseFuncs.length - 1];
        return lastBaseFunc(baseFuncs.slice(0, baseFuncs.length - 1), canvasAdaptor, blockConfig, cursor);
    });
}
exports.backgroundColor = backgroundColor;
