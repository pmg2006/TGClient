import { BcbmGameConfig } from "./BcbmGameConfig";

const { ccclass } = cc._decorator;

@ccclass
export default class BcbmAllcanvas extends cc.Component {
    // var r = require("./BcbmGameConfig"),

    choosenum = 0;
    eightchoosenum = 1;
    eightresult = 0;
    bankername = null;
    lastChipList = [];
    curChipList = [];

    start = function () {
        this.schedule(function () { }, 1), audioMgr.playMusic(BcbmGameConfig.AudioData.bgm)
    }

    reset = function () {
        this.lastChipList = this.curChipList, this.curChipList = []
    }
}