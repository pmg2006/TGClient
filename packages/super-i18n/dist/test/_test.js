"use strict";
const { translate } = require('bing-translate-api');
let $res = {
    text: "你好",
    userLang: 'auto-detect',
    translation: 'Hello',
    language: { from: 'zh-Hans', to: 'en', score: 1 },
    correctedText: ''
};
translate("你好", null, "pt", true).then((res) => {
    console.log(res);
}).catch((err) => {
    console.error(err);
});
