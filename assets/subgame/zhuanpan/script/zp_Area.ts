import { zp_GameConfig } from "./zp_GameConfig";
import { zp_GameData } from "./zp_GameData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class zp_Area extends cc.Component {
    // var r = require("./zp_GameData"),
    //     a = require("./zp_GameConfig"),



    @property(cc.Node)
    jettonNode: cc.Node = null;
    
    @property(cc.Label)
    car_bet: cc.Label = null;
    
    @property(cc.Label)
    my_bet: cc.Label = null;
    
    @property(cc.Node)
    car_bottom: cc.Node = null;
    
    @property(cc.Node)
    my_bottom: cc.Node = null;
    
    @property
    private _money: number = 0;
    
    @property
    private _myMoney: number = 0;
    
    @property(cc.SpriteAtlas)
    cm: cc.SpriteAtlas = null;
    
    @property(cc.Prefab)
    res: cc.Prefab = null;

    jettonRandomEndPos() {
        var e = (Math.random() - .5) * this.node.height * .3,
            t = (Math.random() - .5) * this.node.height * .5;
        return cc.v2(e, t)
    }

    // 用户添加筹码
    onUserAddJetton(user, betAmount, isSilent) {
        // 如果不是静默模式
        if (!isSilent) {
            // 如果用户是当前用户，播放低赌注音效，否则播放高赌注音效
            user == clientKernel.getMeUserItem().getChairID() ? audioMgr.playEffect(zp_GameConfig.AudioData.fq_betlow, false) : audioMgr.playEffect(zp_GameConfig.AudioData.fq_bethigh, false);
            // 获取筹码金额对应的索引
            let jettonIndex = zp_GameData.JettonMoney2Index[betAmount];
                // 获取筹码
            let jetton = this.retain_jetton(jettonIndex);
            // 将筹码添加到筹码节点
            jetton.parent = this.jettonNode;
            // 获取筹码的随机结束位置
            var endPos = this.jettonRandomEndPos();
            // 设置筹码的位置
            jetton.position = new cc.Vec3(endPos.x, endPos.y, 0);;
        }
    }

    clearAllJetton() {
        this.jettonNode.removeAllChildren(), this.allBetScene(0), this.allMyBetScene(0), this.car_bet.node.active = !1, this.my_bet.node.active = !1, this.my_bottom.active = !1, this.car_bottom.active = !1
    }

    allBetScene(e) {
        this._money = e;
        var t = this._money.toString();
        this.car_bet.string = t
    }

    allMyBetScene(e) {
        this._myMoney = e;
        zp_GameData.numberFormat(this._myMoney);
        this.my_bet.string = this._myMoney.toString()
    }

    allBetAddJetton(e) {
        this._money += e;
        zp_GameData.numberFormat(this._money);
        this.car_bet.string = this._myMoney.toString(), this.car_bet.node.active = !0, this.car_bottom.active = !0
    }

    allMyBetAddJetton(e) {
        this._myMoney += e;
        zp_GameData.numberFormat(this._myMoney);
        this.my_bet.string = this._myMoney.toString(), this.my_bet.node.active = !0, this.my_bottom.active = !0
    }

    playSelectEffectEt(e) {
        var t = this.node.children[0];
        t.active = !0, this.node.runAction(cc.sequence(cc.repeat(cc.sequence(cc.delayTime(.6), cc.callFunc(function () {
            t.active = !t.active
        })), 5), cc.callFunc(function () { })))
    }

    retain_jetton(e) {
        var t = cc.instantiate(this.res);
        return t.getComponent(cc.Sprite).spriteFrame = this.cm.getSpriteFrame("chip" + e), t
    }

}