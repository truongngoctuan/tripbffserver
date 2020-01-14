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
const utils_1 = require("./utils");
function componentLine(baseFuncs, canvasAdaptor, blockConfig, cursor) {
    return __awaiter(this, void 0, void 0, function* () {
        const { x1, y1, x2, y2, strokeColor, strokeWidth } = blockConfig;
        // const paper = canvasAdaptor.getPaper();
        const newX1Y1 = utils_1.getRelativePosition(cursor, { left: x1, top: y1 });
        const newX2Y2 = utils_1.getRelativePosition(cursor, { left: x2, top: y2 });
        canvasAdaptor.drawLine({
            x1: newX1Y1.x,
            y1: newX1Y1.y,
            x2: newX2Y2.x,
            y2: newX2Y2.y,
            strokeColor,
            strokeWidth
        });
        if (lodash_1.default.isEmpty(baseFuncs))
            return cursor;
        const lastBaseFunc = baseFuncs[baseFuncs.length - 1];
        return lastBaseFunc(baseFuncs.slice(0, baseFuncs.length - 1), canvasAdaptor, blockConfig, cursor);
    });
}
exports.componentLine = componentLine;
