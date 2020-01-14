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
function componentCircle(baseFuncs, canvasAdaptor, blockConfig, cursor) {
    return __awaiter(this, void 0, void 0, function* () {
        const { x, y, r, fillColor } = blockConfig;
        // const paper = canvasAdaptor.getPaper();
        const newXY = utils_1.getRelativePosition(cursor, { left: x, top: y });
        canvasAdaptor.drawCircle({
            x: newXY.x,
            y: newXY.y,
            r,
            fillColor
        });
        if (lodash_1.default.isEmpty(baseFuncs))
            return cursor;
        const lastBaseFunc = baseFuncs[baseFuncs.length - 1];
        return lastBaseFunc(baseFuncs.slice(0, baseFuncs.length - 1), canvasAdaptor, blockConfig, cursor);
    });
}
exports.componentCircle = componentCircle;
