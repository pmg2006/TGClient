import { zp_GameConfig } from "./zp_GameConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class zp_UIMenu extends cc.Component {
    // var r = require("../kernel/GameTools"),
    //     a = require("../Spript/zp_GameConfig"),
    //     c = require("../Spript/zp_GameConfig"),

    start = function () {
        GameTools.addBtnOnClick(this.node, this.onBtnClick, this);
        console.log("背景音乐", audioMgr.isBgmOpen());
        console.log("特效音乐", audioMgr.isEffectOpen());
        this.node.children[0].children[0].active = audioMgr.isBgmOpen();
        this.node.children[0].children[1].active = !audioMgr.isBgmOpen();
        this.node.children[0].children[2].active = audioMgr.isEffectOpen();
        this.node.children[0].children[3].active = !audioMgr.isEffectOpen();
    }

    onBtnClick = function (e) {
        var t = e.getCurrentTarget().name;
        switch (audioMgr.playEffect(zp_GameConfig.AudioData.fq_button, false), t) {
            case zp_GameConfig.gameName + "UIMenu":
                cc.find("Canvas/zp_UIMenu").active = false;
                break;
            case "btn_yinyue_off":
                audioMgr.openBgm(true), audioMgr.setMusicVolume(1);
                break;
            case "btn_yinyue":
                audioMgr.openBgm(false), audioMgr.setMusicVolume(0);
                break;
            case "btn_yinxiao_off":
                audioMgr.openEffect(true), audioMgr.setEffectsVolume(1);
                break;
            case "btn_yinxiao":
                audioMgr.openEffect(false), audioMgr.setEffectsVolume(0);
                break;
            case "btn_exit":
                clientKernel.dismissGame();
        }
        this.node.children[0].children[0].active = audioMgr.isBgmOpen();
        this.node.children[0].children[1].active = !audioMgr.isBgmOpen();
        this.node.children[0].children[2].active = audioMgr.isEffectOpen();
        this.node.children[0].children[3].active = !audioMgr.isEffectOpen();
        console.log("UIMenu 点击按钮", t);
    }
}