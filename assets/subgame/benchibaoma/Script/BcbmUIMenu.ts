import { BcbmGameConfig } from "./BcbmGameConfig";
import { BcbmSubGameMSG } from "./BcbmSubGameMSG";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BcbmUIMenu extends cc.Component {
    // var r = require("./BcbmGameConfig"),
    //     a = require("./BcbmSubGameMSG"),

    @property([cc.Node])
    setup: cc.Node[] = [];

    @property(cc.Node)
    setrule: cc.Node = null;

    @property(cc.Node)
    histroy: cc.Node = null;

    @property(cc.Label)
    mygold: cc.Label = null;

    @property(cc.Prefab)
    histroyp: cc.Prefab = null;

    @property(cc.Node)
    histroyframe: cc.Node = null;

    @property(cc.Label)
    peoplenum: cc.Label = null;

    @property(cc.Node)
    mypanel: cc.Node = null;

    @property(cc.Node)
    beginicon: cc.Node = null;

    @property(cc.Node)
    overicon: cc.Node = null;

    @property(cc.Node)
    bottompour: cc.Node = null;

    @property(cc.Node)
    winlosepanel: cc.Node = null;

    @property(cc.Node)
    peoplepanel: cc.Node = null;

    @property(cc.Prefab)
    otherp: cc.Prefab = null;

    @property(cc.Label)
    bankername: cc.Label = null;

    @property(cc.Node)
    mybankerpanel: cc.Node = null;

    // start = function () {
    //     console.log(), GameTools.addBtnOnClick(this.node, this.onBtnClick, this), 1 == audioMgr.getMusicVolume() ? (this.setup[2].children[2].children[0].active = !0, this.setup[2].children[2].children[1].active = !1) : (this.setup[2].children[2].children[0].active = !1, this.setup[2].children[2].children[1].active = !0), 1 == audioMgr.getEffectsVolume() ? (this.setup[2].children[3].children[0].active = !0, this.setup[2].children[3].children[1].active = !1) : (this.setup[2].children[3].children[0].active = !1, this.setup[2].children[3].children[1].active = !0), this.mypanel.getChildByName("winScore").active = !1, this.mypanel.getChildByName("loseScore").active = !1
    // }

    start = function () {
        console.log();
        GameTools.addBtnOnClick(this.node, this.onBtnClick, this);
        if (audioMgr.getMusicVolume() === 1) {
            this.setup[2].children[2].children[0].active = true;
            this.setup[2].children[2].children[1].active = false;
        } else {
            this.setup[2].children[2].children[0].active = false;
            this.setup[2].children[2].children[1].active = true;
        }
        if (audioMgr.getEffectsVolume() === 1) {
            this.setup[2].children[3].children[0].active = true;
            this.setup[2].children[3].children[1].active = false;
        } else {
            this.setup[2].children[3].children[0].active = false;
            this.setup[2].children[3].children[1].active = true;
        }
        this.mypanel.getChildByName("winScore").active = false;
        this.mypanel.getChildByName("loseScore").active = false;
    }

    // onBtnClick = function (e) {
    //     var t = e.getCurrentTarget().name;
    //     switch (t) {
    //         case "btn_setting":
    //             audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn), this.setup[0].active = !1, this.setup[1].active = !0, this.setup[2].runAction(cc.moveTo(.3, 540, 100));
    //             break;
    //         case "btn_setting_up":
    //             audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn), this.setup[0].active = !0, this.setup[1].active = !1, this.setup[2].runAction(cc.moveTo(.3, 540, 600));
    //             break;
    //         case "btn_rule":
    //             audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn), this.setrule.active = !0;
    //             break;
    //         case "rule_panel_block":
    //         case "btn_rule_close":
    //             audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn), e.currentTarget.parent.active = !1;
    //             break;
    //         case "btn_exit":
    //             clientKernel.dismissGame();
    //             break;
    //         case "btn_music":
    //             audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn), e.currentTarget.children[0].active = !e.currentTarget.children[0].active, e.currentTarget.children[1].active = !e.currentTarget.children[0].active, 1 == e.currentTarget.children[0].active ? audioMgr.setMusicVolume(1) : audioMgr.setMusicVolume(0), console.log("55555555555555555", audioMgr.getMusicVolume());
    //             break;
    //         case "btn_sound":
    //             audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn), e.currentTarget.children[0].active = !e.currentTarget.children[0].active, e.currentTarget.children[1].active = !e.currentTarget.children[0].active, 1 == e.currentTarget.children[0].active ? audioMgr.setEffectsVolume(1) : audioMgr.setEffectsVolume(0);
    //             break;
    //         case "one_thousand":
    //             console.log("\u4e00\u5343"), cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum = 0, cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum = 1;
    //             break;
    //         case "ten_thousand":
    //             console.log("\u4e00\u4e07"), cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum = 1, cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum = 5;
    //             break;
    //         case "one_hundred_thousand":
    //             console.log("\u5341\u4e07"), cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum = 2, cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum = 20;
    //             break;
    //         case "million":
    //             console.log("\u767e\u4e07"), cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum = 3, cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum = 50;
    //             break;
    //         case "five_million":
    //             console.log("\u4e94\u767e\u4e07"), cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum = 4, cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum = 100;
    //             break;
    //         case "ten_million":
    //             console.log("\u5343\u4e07"), cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum = 5, cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum = 500;
    //             break;
    //         case "goon":
    //             console.log("\u7eed\u6295");
    //             var o = cc.find("Canvas").getComponent("BcbmAllcanvas").lastChipList;
    //             if (0 == o.length) return;
    //             for (var n = 0; n < o.length; n++) clientKernel.sendGameMsg(BcbmSubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
    //                 areaType: o[n].areaType,
    //                 money: o[n].money
    //             }]);
    //             break;
    //         case "btn_people":
    //             audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn), this.peoplepanel.runAction(cc.moveTo(.5, 135, 0)), this.onOtherPanel();
    //             break;
    //         case "btn_close":
    //             audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn), this.peoplepanel.runAction(cc.moveTo(.5, -400, 0))
    //     }
    //     console.log("UIMenu \u70b9\u51fb\u6309\u94ae", t)
    // } 

    onBtnClick = function (e) {
        var t = e.getCurrentTarget().name;
        switch (t) {
            case "btn_setting":
                audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn);
                this.setup[0].active = false;
                this.setup[1].active = true;
                this.setup[2].runAction(cc.moveTo(0.3, 540, 100));
                break;
            case "btn_setting_up":
                audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn);
                this.setup[0].active = true;
                this.setup[1].active = false;
                this.setup[2].runAction(cc.moveTo(0.3, 540, 600));
                break;
            case "btn_rule":
                audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn);
                this.setrule.active = true;
                break;
            case "rule_panel_block":
            case "btn_rule_close":
                audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn);
                e.currentTarget.parent.active = false;
                break;
            case "btn_exit":
                clientKernel.dismissGame();
                break;
            case "btn_music":
                audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn);
                e.currentTarget.children[0].active = !e.currentTarget.children[0].active;
                e.currentTarget.children[1].active = !e.currentTarget.children[0].active;
                audioMgr.setMusicVolume(e.currentTarget.children[0].active ? 1 : 0);
                console.log("UIMenu 点击按钮", '点击按钮', t);
                break;
            case "btn_sound":
                audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn);
                e.currentTarget.children[0].active = !e.currentTarget.children[0].active;
                e.currentTarget.children[1].active = !e.currentTarget.children[0].active;
                audioMgr.setEffectsVolume(e.currentTarget.children[0].active ? 1 : 0);
                break;
            case "one_thousand":
                console.log("一千");
                cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum = 0;
                cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum = 1;
                break;
            case "ten_thousand":
                console.log("一万");
                cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum = 1;
                cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum = 5;
                break;
            case "one_hundred_thousand":
                console.log("十万");
                cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum = 2;
                cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum = 20;
                break;
            case "million":
                console.log("百万");
                cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum = 3;
                cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum = 50;
                break;
            case "five_million":
                console.log("五百万");
                cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum = 4;
                cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum = 100;
                break;
            case "ten_million":
                console.log("千万");
                cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum = 5;
                cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum = 500;
                break;
            case "goon":
                console.log("续投");
                var o = cc.find("Canvas").getComponent("BcbmAllcanvas").lastChipList;
                if (o.length === 0) return;
                for (var n = 0; n < o.length; n++) {
                    clientKernel.sendGameMsg(BcbmSubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
                        areaType: o[n].areaType,
                        money: o[n].money
                    }]);
                }
                break;
            case "btn_people":
                audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn);
                this.peoplepanel.runAction(cc.moveTo(0.5, 135, 0));
                this.onOtherPanel();
                break;
            case "btn_close":
                audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn);
                this.peoplepanel.runAction(cc.moveTo(0.5, -400, 0));
        }
        console.log("UIMenu 点击按钮", '点击按钮', t);
    }
    
    update = function (e) { }
    
    // onhistroy = function (e) {
    //     for (var t = 0; t < e.length; t++) this.histroy = cc.instantiate(this.histroyp), this.histroyframe.addChild(this.histroy), this.histroy.y = 0, this.histroy.getComponent("Bcbmhistroyicon").setH(e[t]);
    //     this.histroyframe.parent.getComponent(cc.ScrollView).scrollToRight(.2)
    // }

    onhistroy = function (e) {
        for (var t = 0; t < e.length; t++) {
            this.histroy = cc.instantiate(this.histroyp);
            this.histroyframe.addChild(this.histroy);
            this.histroy.y = 0;
            this.histroy.getComponent("Bcbmhistroyicon").setH(e[t]);
        }
        this.histroyframe.parent.getComponent(cc.ScrollView).scrollToRight(.2);
    }
    
    onDestroyOneHistroy = function (e) {
        var t = 0;
        switch (this.histroyframe.children.length > 24 && this.histroyframe.children[0].destroy(), e.slotIndex >= 8 && (e.slotIndex = e.slotIndex % 8), e.slotIndex) {
            case 0:
                t = 5, cc.find("Canvas").getComponent("BcbmAllcanvas").eightresult = 5;
                break;
            case 1:
                t = 1, cc.find("Canvas").getComponent("BcbmAllcanvas").eightresult = 1;
                break;
            case 2:
                t = 6, cc.find("Canvas").getComponent("BcbmAllcanvas").eightresult = 6;
                break;
            case 3:
                t = 2, cc.find("Canvas").getComponent("BcbmAllcanvas").eightresult = 2;
                break;
            case 4:
                t = 7, cc.find("Canvas").getComponent("BcbmAllcanvas").eightresult = 7;
                break;
            case 5:
                t = 3, cc.find("Canvas").getComponent("BcbmAllcanvas").eightresult = 3;
                break;
            case 6:
                t = 4, cc.find("Canvas").getComponent("BcbmAllcanvas").eightresult = 4;
                break;
            case 7:
                t = 0, cc.find("Canvas").getComponent("BcbmAllcanvas").eightresult = 0
        }
        for (var o = 0; o < 8; o++) this.winlosepanel.children[6].children[o].active = o == t;
        this.scheduleOnce(function () {
            this.onAddOneHistroy(t)
        }, 10)
    }
    
    // onAddOneHistroy = function (e) {
    //     this.histroy = cc.instantiate(this.histroyp), this.histroyframe.addChild(this.histroy), this.histroy.y = 0, this.histroy.getComponent("Bcbmhistroyicon").setH(e), this.histroy.children[0].active = !0, this.histroyframe.parent.getComponent(cc.ScrollView).scrollToRight(.2), this.scheduleOnce(function () {
    //         this.histroy.children[0].active = !1
    //     }, 5)
    // }

    onAddOneHistroy = function (e) {
        this.histroy = cc.instantiate(this.histroyp);
        this.histroyframe.addChild(this.histroy);
        this.histroy.y = 0;
        this.histroy.getComponent("Bcbmhistroyicon").setH(e);
        this.histroy.children[0].active = true;
        this.histroyframe.parent.getComponent(cc.ScrollView).scrollToRight(.2);
        this.scheduleOnce(function () {
            this.histroy.children[0].active = false;
        }, 5);
    }
    
    // onGetMyPanel = function () {
    //     this.mypanel.children[0].children[0].getComponent(cc.Label).string = clientKernel.getMeUserItem().getUserScore().toFixed(2).toString(), GameTools.loadWxHead(this.mypanel.getChildByName("head_mask").getComponentInChildren(cc.Sprite), clientKernel.getMeUserItem().head)
    // }

    // onGetMyPanel = function () {
    //     this.mypanel.children[0].children[0].getComponent(cc.Label).string = clientKernel.getMeUserItem().getUserScore().toFixed(2).toString();
    //     GameTools.loadWxHead(this.mypanel.getChildByName("head_mask").getComponentInChildren(cc.Sprite), clientKernel.getMeUserItem().head);
    // }

    onGetMyPanel = function () {
        this.mypanel.children[0].children[0].getComponent(cc.Label).string = clientKernel.getMeUserItem().getUserScore().toFixed(2).toString();
        GameTools.loadWxHead(this.mypanel.getChildByName("head_mask").getComponentInChildren(cc.Sprite), clientKernel.getMeUserItem().head);
    }
    
    // onLottory = function (e) {
    //     if (clientKernel.getMeUserItem().getChairID() == e.chairID) {
    //         var t = Number(this.mypanel.children[0].children[0].getComponent(cc.Label).string) - e.betArray[0].money.toFixed(2);
    //         this.mypanel.children[0].children[0].getComponent(cc.Label).string = t.toString(), clientKernel.getMeUserItem().score = t
    //     }
    // }

    onLottory = function (e) {
        if (clientKernel.getMeUserItem().getChairID() == e.chairID) {
            var t = Number(this.mypanel.children[0].children[0].getComponent(cc.Label).string) - e.betArray[0].money.toFixed(2);
            this.mypanel.children[0].children[0].getComponent(cc.Label).string = t.toString();
            clientKernel.getMeUserItem().score = t;
        }
    }
    
    // onBeginIcon = function () {
    //     this.beginicon.active = !0, this.beginicon.getComponent(cc.Animation).play(), this.scheduleOnce(function () {
    //         this.beginicon.active = !1
    //     }, 2)
    // }

    onBeginIcon = function () {
        this.beginicon.active = true;
        this.beginicon.getComponent(cc.Animation).play();
        this.scheduleOnce(function () {
            this.beginicon.active = false;
        }, 2);
    }
    
    // onOverIcon = function () {
    //     this.overicon.active = !0, this.overicon.getComponent(cc.Animation).play(), this.scheduleOnce(function () {
    //         this.overicon.active = !1
    //     }, 2)
    // }

    onOverIcon = function () {
        this.overicon.active = true;
        this.overicon.getComponent(cc.Animation).play();
        this.scheduleOnce(function () {
            this.overicon.active = false;
        }, 2);
    }
    
    onMyGlod = function () { }
    
    // onLastSettle = function (e) {
    //     var t = this;
    //     0 != e.result && this.scheduleOnce(function () {
    //         var o = null;
    //         e.result > 0 ? (o = t.mypanel.getChildByName("winScore"), audioMgr.playEffect(BcbmGameConfig.AudioData.win)) : o = t.mypanel.getChildByName("loseScore");
    //         var n = o.getComponent(cc.Label);
    //         o.active = !0, n.node.y = 90;
    //         var i = KernelData.score;
    //         e.result > 0 ? (i += e.result, n.string = "+" + e.result) : n.string = "" + e.result, cc.Tween.stopAllByTarget(n.node), cc.tween(n.node).to(.2, {
    //             position: cc.v3(n.node.x, -100)
    //         }).delay(1).call(function () {
    //             o.active = !1, t.mypanel.children[0].children[0].getComponent(cc.Label).string = i.toFixed(2)
    //         }).start()
    //     }, 9), this.scheduleOnce(function () {
    //         this.onSettleAccount(e), this.onWinLose()
    //     }, 10)
    // }

    onLastSettle = function (e) {
        var t = this;
        if (e.result !== 0) {
            this.scheduleOnce(function () {
                var o = null;
                if (e.result > 0) {
                    o = t.mypanel.getChildByName("winScore");
                    audioMgr.playEffect(BcbmGameConfig.AudioData.win);
                } else {
                    o = t.mypanel.getChildByName("loseScore");
                }
                var n = o.getComponent(cc.Label);
                o.active = true;
                n.node.y = 90;
                var i = KernelData.score;
                if (e.result > 0) {
                    i += e.result;
                    n.string = "+" + e.result;
                } else {
                    n.string = "" + e.result;
                }
                cc.Tween.stopAllByTarget(n.node);
                cc.tween(n.node)
                    .to(.2, { position: cc.v3(n.node.x, -100) })
                    .delay(1)
                    .call(function () {
                        o.active = false;
                        t.mypanel.children[0].children[0].getComponent(cc.Label).string = i.toFixed(2);
                    })
                    .start();
            }, 9);
            this.scheduleOnce(function () {
                this.onSettleAccount(e);
                this.onWinLose();
            }, 10);
        }
    }
    
    onWinLose = function () {
        this.winlosepanel.runAction(cc.moveTo(1, 0, 0)), this.scheduleOnce(function () {
            this.onBackPanel()
        }, 4), this.scheduleOnce(function () {
            this.winlosepanel.setPosition(1500, 0)
        }, 5)
    }
    
    onBackPanel = function () {
        this.winlosepanel.runAction(cc.moveTo(1, -1500, 0))
    }
    
    // onSettleAccount = function (e) {
    //     e.result > 0 ? (this.winlosepanel.children[0].children[0].children[2].active = !1, this.winlosepanel.children[0].children[0].children[1].active = !0, this.winlosepanel.children[0].children[0].children[1].getComponent(cc.Label).string = "+" + e.result) : (this.winlosepanel.children[0].children[0].children[2].active = !0, this.winlosepanel.children[0].children[0].children[1].active = !1, this.winlosepanel.children[0].children[0].children[2].getComponent(cc.Label).string = e.result), e.bankerResult >= 0 ? (this.winlosepanel.children[0].children[1].children[2].active = !1, this.winlosepanel.children[0].children[1].children[1].active = !0, this.winlosepanel.children[0].children[1].children[1].getComponent(cc.Label).string = "+" + e.bankerResult) : (this.winlosepanel.children[0].children[1].children[2].active = !0, this.winlosepanel.children[0].children[1].children[1].active = !1, this.winlosepanel.children[0].children[1].children[2].getComponent(cc.Label).string = e.bankerResult);
    //     for (var t = 0; t < 5; t++) e.gameRankInfo[t].money >= 0 ? (this.winlosepanel.children[0].children[t + 2].children[1].active = !0, this.winlosepanel.children[0].children[t + 2].children[2].active = !1, this.winlosepanel.children[0].children[t + 2].children[1].getComponent(cc.Label).string = "+" + e.gameRankInfo[t].money) : (this.winlosepanel.children[0].children[t + 2].children[1].active = !1, this.winlosepanel.children[0].children[t + 2].children[2].active = !0, this.winlosepanel.children[0].children[t + 2].children[2].getComponent(cc.Label).string = e.gameRankInfo[t].money), this.winlosepanel.children[0].children[0].children[0].getComponent(cc.Label).string = clientKernel.getMeUserItem().getNickname(), this.winlosepanel.children[0].children[t + 2].children[0].getComponent(cc.Label).string = e.gameRankInfo[t].nickname
    // }

    onSettleAccount = function (e) {
        if (e.result > 0) {
            this.winlosepanel.children[0].children[0].children[2].active = false;
            this.winlosepanel.children[0].children[0].children[1].active = true;
            this.winlosepanel.children[0].children[0].children[1].getComponent(cc.Label).string = "+" + e.result;
        } else {
            this.winlosepanel.children[0].children[0].children[2].active = true;
            this.winlosepanel.children[0].children[0].children[1].active = false;
            this.winlosepanel.children[0].children[0].children[2].getComponent(cc.Label).string = e.result;
        }
        if (e.bankerResult >= 0) {
            this.winlosepanel.children[0].children[1].children[2].active = false;
            this.winlosepanel.children[0].children[1].children[1].active = true;
            this.winlosepanel.children[0].children[1].children[1].getComponent(cc.Label).string = "+" + e.bankerResult;
        } else {
            this.winlosepanel.children[0].children[1].children[2].active = true;
            this.winlosepanel.children[0].children[1].children[1].active = false;
            this.winlosepanel.children[0].children[1].children[2].getComponent(cc.Label).string = e.bankerResult;
        }
        for (var t = 0; t < 5; t++) {
            if (e.gameRankInfo[t].money >= 0) {
                this.winlosepanel.children[0].children[t + 2].children[1].active = true;
                this.winlosepanel.children[0].children[t + 2].children[2].active = false;
                this.winlosepanel.children[0].children[t + 2].children[1].getComponent(cc.Label).string = "+" + e.gameRankInfo[t].money;
            } else {
                this.winlosepanel.children[0].children[t + 2].children[1].active = false;
                this.winlosepanel.children[0].children[t + 2].children[2].active = true;
                this.winlosepanel.children[0].children[t + 2].children[2].getComponent(cc.Label).string = e.gameRankInfo[t].money;
            }
            this.winlosepanel.children[0].children[0].children[0].getComponent(cc.Label).string = clientKernel.getMeUserItem().getNickname();
            this.winlosepanel.children[0].children[t + 2].children[0].getComponent(cc.Label).string = e.gameRankInfo[t].nickname;
        }
    }
    
    onBankerName = function (e) {
        if (e.bankerQueueInfo.length > 0) {
            this.bankername.string = e.bankerQueueInfo[0].nickname;
        }
    }
    
    onBankerName2 = function (e) {
        this.bankername.string = e[0].nickname
    }
    
    // onOtherPanel = function () {
    //     this.peoplepanel.children[1].children[0].destroyAllChildren();
    //     for (var e = 1, t = 0; t < e; t++) null != clientKernel.getTableUserItem(t) ? (e++, this.other = cc.instantiate(this.otherp), this.peoplepanel.children[1].children[0].addChild(this.other), this.other.children[1].getComponent(cc.Label).string = clientKernel.getTableUserItem(t).getNickname(), this.other.children[2].children[0].getComponent(cc.Label).string = clientKernel.getTableUserItem(t).getUserScore().toString()) : null == clientKernel.getTableUserItem(t) && e--
    // }

    onOtherPanel = function () {
        this.peoplepanel.children[1].children[0].destroyAllChildren();
        for (var e = 1, t = 0; t < e; t++) {
            if (null != clientKernel.getTableUserItem(t)) {
                e++;
                this.other = cc.instantiate(this.otherp);
                this.peoplepanel.children[1].children[0].addChild(this.other);
                this.other.children[1].getComponent(cc.Label).string = clientKernel.getTableUserItem(t).getNickname();
                this.other.children[2].children[0].getComponent(cc.Label).string = clientKernel.getTableUserItem(t).getUserScore().toString();
            } else if (null == clientKernel.getTableUserItem(t)) {
                e--;
            }
        }
    }
    
    onAddOther = function () { }
    
    // onMyBankerPanel = function (e) {
    //     this.mypanel.children[2].children[1].getComponent(cc.Label).string == e.bankerQueueInfo[0].nickname ? this.mybankerpanel.active = !0 : this.mybankerpanel.active = !1
    // }

    onMyBankerPanel = function (e) {
        if (this.mypanel.children[2].children[1].getComponent(cc.Label).string == e.bankerQueueInfo[0].nickname) {
            this.mybankerpanel.active = true;
        } else {
            this.mybankerpanel.active = false;
        }
    }
    
    // onEventUserScore = function (e) {
    //     e.chairID == KernelData.chairID && (this.mypanel.children[0].children[0].getComponent(cc.Label).string = e.score.toFixed(2))
    // }

    onEventUserScore = function (e) {
        if (e.chairID == KernelData.chairID) {
            this.mypanel.children[0].children[0].getComponent(cc.Label).string = e.score.toFixed(2);
        }
    }
}