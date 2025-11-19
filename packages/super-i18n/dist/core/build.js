"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { translate } = require('bing-translate-api');
let $res = {
    text: "你好",
    userLang: 'auto-detect',
    translation: 'Hello',
    language: { from: 'zh-Hans', to: 'en', score: 1 },
    correctedText: ''
};
function toLang(lang) {
    if (lang == "zh") {
        return "zh-Hans";
    }
    else if (lang == "cht") {
        return "zh-Hans";
    }
    return lang;
}
;
exports.default = new class {
    translate(id, from, to, fun_suc, fun_err) {
        id = id.replace(/%s/g, "___ss___");
        from = toLang(from);
        to = toLang(to);
        translate(id, from, to, true).then((res) => {
            res.translation = res.translation.replace(/___ss___/g, "%s");
            console.log(res);
            fun_suc(res.translation);
        }).catch((err) => {
            console.error(err);
            fun_err(err);
        });
    }
};
