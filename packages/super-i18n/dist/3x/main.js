"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
//@ts-ignore
const package_json_1 = __importDefault(require("../../package.json"));
/**
 * @en
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    open_panel() {
        Editor.Panel.open(package_json_1.default.name);
    },
    import_script() {
        const fs = require("fs");
        const path = require("path");
        let s_script = fs.readFileSync(path.join(Editor.Package.getPath("super-i18n"), "static", "script.txt"));
        Editor.Message.send("asset-db","create-asset", "db://assets/src/super_i18n/super_i18n.ts",s_script);
        console.log("import super_i18n.ts success");
    },
};
/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
exports.load = function () { };
/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
exports.unload = function () { };
