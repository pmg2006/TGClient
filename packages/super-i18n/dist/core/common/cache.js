"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class dict_platform {
    constructor() {
        this.name = "";
        //mb
        this.size = 0;
        this.html_path = "";
    }
}
;
class dict_data {
    constructor() {
        this.enabled = true;
        this.path = "";
        //platforms: dict_platform[] = [];
    }
}
function get_path() {
    //@ts-ignore
    var projectPath = Editor.Project.path || Editor.projectPath;
    return path.join(projectPath, "settings", "super-language.json");
}
class Loose {
    set(data) {
        fs.writeFileSync(get_path(), JSON.stringify(data, null, 2));
    }
    get() {
        var config = null;
        if (fs.existsSync(get_path())) {
            config = JSON.parse(fs.readFileSync(get_path(), 'utf8'));
        }
        if (!config) {
            config = new dict_data();
        }
        update_data(config);
        return config;
    }
}
function update_data(data) {
    data.path = data.path || "";
}
exports.default = new class {
    constructor() {
        try {
            if (this.get_version().search(/2.[0-9].[0-9]/) == 0) {
                const loose = new Loose();
                this.get = loose.get;
                this.set = loose.set;
            }
        }
        catch (error) {
            //console.log(error)
        }
    }
    get() {
        let data;
        try {
            let super_html_cache = localStorage.getItem("super_html_cache") || "";
            data = JSON.parse(super_html_cache);
        }
        catch (error) {
            data = new dict_data();
        }
        update_data(data);
        return data;
    }
    set(data) {
        try {
            localStorage.setItem("super_html_cache", JSON.stringify(data));
        }
        catch (error) {
        }
    }
    get_version() {
        //@ts-ignore
        const projectPath = Editor.Project.path || Editor.projectPath;
        let _path = path.join(projectPath, "project.json");
        if (fs.existsSync(_path)) {
            return JSON.parse(fs.readFileSync(_path, { encoding: "utf-8" })).version;
        }
        try {
            //@ts-ignore
            return Editor.App.version;
        }
        catch (error) {
            //@ts-ignore
            return Editor.remote.App.version;
        }
    }
};
