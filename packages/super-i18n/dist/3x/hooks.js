"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAfterBuild = void 0;
const cache_1 = __importDefault(require("../core/common/cache"));
exports.onAfterBuild = async function (options, result) {
    if (options.platform !== "web-mobile" && options.platform !== "web-desktop") {
        return;
    }
    if (!cache_1.default.get().enabled) {
        return;
    }
};
