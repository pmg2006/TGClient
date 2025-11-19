import { zp_GameConfig } from "./zp_GameConfig";
import { zp_GameData } from "./zp_GameData";
import { zp_SubGameMSG } from "./zp_SubGameMSG";

const { ccclass, property } = cc._decorator;

@ccclass
export default class zp_UserInfo extends cc.Component {
    // var r = require("../Spript/zp_GameData"),
    //     a = require("../kernel/GameTools"),
    //     c = require("../Spript/zp_GameConfig"),
    //     s = require("../GameData/zp_SubGameMSG"),

    @property(cc.Label)
    nickname: cc.Label = null;

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Label)
    moneyLabel: cc.Label = null;

    @property(cc.Label)
    winScoreLabel: cc.Label = null;

    @property(cc.Label)
    lvLabel: cc.Label = null;

    @property([cc.Button])
    jettonBtnArray: cc.Button[] = [];

    @property(cc.Button)
    xyBtn: cc.Button = null;

    @property(cc.Button)
    rxyBtn: cc.Button = null;

    private bindObj: any[] = [];
    private _tolM: number = 0;
    private winScorePosY: number = 0;

    start = function () {
        this.bindObj = [
            onfire.on("userInfo_startBet", this.onStartBet.bind(this)),
            onfire.on("userInfo_gameResult", this.disableAllJettons.bind(this)),
            onfire.on("setUserInfoMoney", this.setUserInfoMoney.bind(this))
        ];

        for (let i = 0; i < 5; i++) {
            GameTools.addBtnOnClick(this.jettonBtnArray[i].node, this.onBtnClick, this);
        }

        GameTools.addBtnOnClick(this.xyBtn.node, this.onBtnClick, this);

        this._tolM = 0;
        this.winScorePosY = this.winScoreLabel.node.y;
        this.winScoreLabel.node.active = false;
    }

    onDestroy = function () {
        GameTools.destroyOnFire(this.bindObj)
    }

    onBtnClick = function (e) {
        var t = e.getCurrentTarget();
        if (t.getComponent("cc.Button").interactable) switch (t.name) {
            case "jetton-hui-0":
                this.onClickJetton(e, 0);
                break;
            case "jetton-hui-1":
                this.onClickJetton(e, 1);
                break;
            case "jetton-hui-2":
                this.onClickJetton(e, 2);
                break;
            case "jetton-hui-3":
                this.onClickJetton(e, 3);
                break;
            case "jetton-hui-4":
                this.onClickJetton(e, 4);
                break;
            case "jetton-hui-5":
                this.onClickJetton(e, 5);
                break;
            case "btn-continue-hui":
                this.onClickXYBtn(e, 0)
        }
    }

    init = function (e) {
        this.nickname.string = e.getNickname() || "";
        zp_GameData.GameData.userScore = e.score;
        console.log("====data===", e);
        if (this.head) {
            GameTools.loadWxHead(this.head, e.head);
        }
        var formattedScore = zp_GameData.numberFormat(zp_GameData.GameData.userScore);
        this.moneyLabel.string = formattedScore.value + formattedScore.unit
    }

    del = function (e) {
        this._tolM += e, zp_GameData.GameData.userScore -= this._tolM;
        var t = zp_GameData.numberFormat(zp_GameData.GameData.userScore);
        this.moneyLabel.string = t.value + t.unit
    }

    disableAllJettons = function () {
        for (let i = 0; i < 5; i++) {
            const btn = this.jettonBtnArray[i];
            btn.interactable = false;
            btn.node.runAction(cc.tintTo(0, 128, 128, 128));
            btn.node.children[0].active = false;
        }
        this.xyBtn.interactable = false;
        this.xyBtn.node.runAction(cc.tintTo(0, 128, 128, 128));
        this.rxyBtn.interactable = false;
        this.rxyBtn.node.runAction(cc.tintTo(0, 128, 128, 128));
    }

    onStartBet = function (e) {
        console.log(" - zp_userInfo onStartBet - ");
        this.updateBetStatus(null), this._tolM = 0
    }

    updateBetStatus = function (e) {
        var t = clientKernel.getMeUserItem();
        zp_GameData.GameData.userScore = t.getUserScore();
        e = null == e ? zp_GameData.GameData.userScore : e;
        for (var o = 0; o < this.jettonBtnArray.length; ++o) {
            var n;
            (n = this.jettonBtnArray[o]).node.y = -320, e < zp_GameData.ChipList[o] ? (n.interactable = !1, n.node.runAction(cc.tintTo(0, 128, 128, 128))) : (n.interactable = !0, n.node.runAction(cc.tintTo(0, 255, 255, 255)))
        }
        for (zp_GameData.GameData.selectIndex < 0 && (zp_GameData.GameData.selectIndex = 0); zp_GameData.GameData.selectIndex >= 0 && e < zp_GameData.ChipList[zp_GameData.GameData.selectIndex] && (zp_GameData.GameData.selectIndex--, !(zp_GameData.GameData.selectIndex < 0)););
        zp_GameData.GameData.selectIndex >= 0 && ((n = this.jettonBtnArray[zp_GameData.GameData.selectIndex]).node.y = -300, n.node.children[0].active = !0);
        zp_GameData.GameData.lastAreaBetArray.length <= 0 || zp_GameData.GameData.userScore <= 0 ? (this.xyBtn.interactable = !1, this.xyBtn.node.runAction(cc.tintTo(0, 128, 128, 128)), this.rxyBtn.interactable = !1, this.rxyBtn.node.runAction(cc.tintTo(0, 128, 128, 128))) : (this.xyBtn.interactable = !0, this.xyBtn.node.runAction(cc.tintTo(0, 255, 255, 255)), this.rxyBtn.interactable = !0, this.rxyBtn.node.runAction(cc.tintTo(0, 255, 255, 255)));
        for (o = 0; o < 5; ++o) zp_GameData.GameData.getJettonPos[o] = this.node.convertToWorldSpaceAR(this.jettonBtnArray[o].node.position)
    }

    onClickJetton = function (e, t) {
        for (var o = 0; o < this.jettonBtnArray.length; ++o) o == t ? (this.jettonBtnArray[o].node.y = -300, this.jettonBtnArray[o].node.children[0].active = !0) : (this.jettonBtnArray[o].node.y = -320, this.jettonBtnArray[o].node.children[0].active = !1);
        zp_GameData.GameData.selectIndex = t, audioMgr.playEffect(zp_GameConfig.AudioData.fq_jetton, !1)
    }

    onClickXYBtn = function (e, t) {
        if (101 != zp_GameData.GameData.gameStatus) return !1;
        if (zp_GameData.GameData.lastAreaBetArray.length > 0)
            for (var o = 0; o < zp_GameData.GameData.lastAreaBetArray.length; o++) clientKernel.sendGameMsg(zp_SubGameMSG.subGameMSG.SUB_C_ADD_JETTION, [zp_GameData.GameData.lastAreaBetArray[o]]);
        audioMgr.playEffect(zp_GameConfig.AudioData.fq_jetton, !1)
    }

    canJetton = function () {
        return !(zp_GameData.GameData.userScore > 0)
    }

    jettonEnd = function () {
        this.xyBtn.interactable = !1, this.xyBtn.node.runAction(cc.tintTo(0, 128, 128, 128)), this.rxyBtn.interactable = !1, this.rxyBtn.node.runAction(cc.tintTo(0, 128, 128, 128))
    }

    setUserInfoMoney = function (e) {
        var t = zp_GameData.numberFormat(e);
        this.moneyLabel.string = t.value + t.unit
    }

    showEndScore = function (e) {
        if (e <= 0) return;

        const o = zp_GameData.numberFormat(e);
        const n = "+" + o.value + o.unit;

        this.winScoreLabel.node.active = true;
        this.winScoreLabel.node.y = this.winScorePosY;
        this.winScoreLabel.string = n;

        cc.Tween.stopAllByTarget(this.winScoreLabel.node);
        audioMgr.playEffect(zp_GameConfig.AudioData.fq_sound_win, false);

        cc.tween(this.winScoreLabel.node)
            .to(0.2, { position: cc.v3(this.winScoreLabel.node.x, this.winScorePosY - 50) })
            .delay(1)
            .call(() => {
                this.winScoreLabel.node.active = false;
            })
            .start();
    }

    formatScore = function (e) {
        if (e === undefined) return "Nan";

        let t = Math.abs(e).toString().match(/^\d+(?:\.\d{0,2})?/) + "";
        if (e < 0) {
            t = "-" + t;
        }

        return t;
    }
}