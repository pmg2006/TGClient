"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class main {
    constructor() {
        this.messages = {
            'open-panel'() {
                Editor.Panel.open('super-i18n');
            },
        };
    }
    //当package被正确加载的时候执行
    load() {
        Editor.Builder.on('build-start', this.funOnBuildStart);
        Editor.Builder.on('build-finished', this.funOnBuildFinished);
    }
    //当package被正确卸载的时候执行
    unload() {
        Editor.Builder.removeListener('build-start', this.funOnBuildStart);
        Editor.Builder.removeListener('build-finished', this.funOnBuildFinished);
    }
    funOnBuildStart(options, callback) {
        callback();
    }
    funOnBuildFinished(options, callback) {
        if (options.actualPlatform !== "web-mobile" && options.platform !== "web-desktop") {
            callback();
            return;
        }
        callback();
    }
}
module.exports = new main();
