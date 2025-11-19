import { zp_GameConfig } from "./zp_GameConfig";
import { zp_GameData } from "./zp_GameData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class zp_BetTime extends cc.Component {

    @property([cc.Node])
    Ct: cc.Node[] = [];

    startTime = 0;
    betTime = 0;
    sound = 0;
    times = 0;

    start = function () { }

    showTime = function (e) {
        this.times = 0;
        this.node.stopAllActions();
        audioMgr.stopEffect(this.sound);
        this.betTime = e - 1;
        this.node.runAction(cc.repeat(cc.sequence(cc.callFunc(() => { }), cc.delayTime(1)), e));
        this.startTime = Date.now();
        this.Ct[3].getComponent("cc.Label").string = "" + e;
    }

    showState = function (e) {
        this.Ct[0].active = e;
        this.Ct[1].active = !e;
        this.Ct[4].active = false;
    }

    showFreeState = function (e) {
        this.Ct[0].active = !e;
        this.Ct[1].active = !e;
        this.Ct[4].active = e;
    }

    timeSound = function () {
        var e = Number(this.Ct[3].getComponent("cc.Label").string);
        var t = 0;
        if (e == 3) {
            t = 4;
        }
        if (e == 2) {
            t = 3;
        }
        if (e == 1) {
            t = 2;
        }
        if (e == 0) {
            t = 1;
        }
        if (e <= 3 && this.times != 1 && zp_GameData.GameData.gameStatus == 101) {
            this.times = 1;
            this.node.runAction(cc.repeat(cc.sequence(cc.callFunc(function () {
                audioMgr.playEffect(zp_GameConfig.AudioData.fq_countdown, false);
            }), cc.delayTime(1)), t));
        }
    }

    update = function (e) {
        var t = (Date.now() - this.startTime) / 1000;
        if (t > this.betTime) {
            this.Ct[2].getComponent("cc.Sprite").fillStart = 1;
            this.Ct[3].getComponent("cc.Label").string = "0";
            return;
        }
        this.Ct[2].getComponent("cc.Sprite").fillStart = -t / this.betTime;
        this.Ct[3].getComponent("cc.Label").string = "" + (this.betTime - Math.floor(t));
        this.timeSound();
    }
}