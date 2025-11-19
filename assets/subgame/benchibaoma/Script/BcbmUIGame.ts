import { BcbmGameConfig } from "./BcbmGameConfig";
import { BcbmSubGameMSG } from "./BcbmSubGameMSG";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BcbmUIGame extends cc.Component {

    gold = null;

    @property([cc.Label])
    textl: cc.Label[]  = [];
    textc = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    @property([cc.Label])
    myChipLabList: cc.Label[]  = [];

    myChipScoreList = [0, 0, 0, 0, 0, 0, 0, 0];
    times = 0;
    beginnum = 15;
    drawnum = 16;
    num = 0;
    rotate = 0;
    savenum = 0;
    sixnum = 0;
    twosixnum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    sixbecome = [1, 10, 50, 100, 500, 1000];
    curMyChip = 0;

    @property([cc.Prefab])
    goldp: cc.Prefab[] = [];

    @property(cc.Node)
    eightpos: cc.Node = null;

    @property(cc.Node)
    thirtytwo: cc.Node = null;

    @property(cc.Node)
    eighttable: cc.Node = null;

    @property([cc.Label])
    begintime: cc.Label[] = [];

    @property([cc.Node])
    clock: cc.Node[] = [];

    @property(cc.Node)
    banker: cc.Node = null;

    @property(cc.Label)
    myChipLab: cc.Label = null;

    @property(cc.Label)
    wiScoreLab: cc.Label = null;

    @property([cc.Node])
    threetime: cc.Node[] = [];

    @property(cc.Node)
    btn_down: cc.Node = null;

    @property(cc.Node)
    hold: cc.Node = null;

    //          t.goldp = [], t.gold = null, t.eightpos = null, t.thirtytwo = null, t.eighttable = null, t.begintime = [], t.clock = [], t.textl = [], t.textc = [0, 0, 0, 0, 0, 0, 0, 0, 0], t.myChipLabList = [], t.myChipScoreList = [0, 0, 0, 0, 0, 0, 0, 0], t.banker = null, t.myChipLab = null, t.wiScoreLab = null, t.times = 0, t.beginnum = 15, t.drawnum = 16, t.num = 0, t.rotate = 0, t.savenum = 0, t.sixnum = 0, t.twosixnum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t.sixbecome = [1, 10, 50, 100, 500, 1e3], t.threetime = [], t.btn_down = null, t.hold = null, t.curMyChip = 0, t

    start  () {
        this.myChipLab.string = "0";
        this.wiScoreLab.string = "0";
    }

    onFirstTime (config) {
        if (config.areaBetArray.length > 0) {
            for (var t = 0; t < 8; t++) {
                this.textc[t] = config.areaBetArray[t];
                this.textl[t].string = this.textc[t].toString();
                this.textc[8] += config.areaBetArray[t];
            }
        } else {
            console.error("'areaBetArray' is empty. This may cause a bug.");
        }
        this.banker.children[3].children[0].getComponent(cc.Label).string = this.textc[8].toString()
    }

    onLoad  () {
        GameTools.addBtnOnClick(this.node, this.onBtnClick, this);
        GameTools.addBtnOnClick(this.node, this.onBtnClick2, this)
    }

    update  () { }
    
    onDestroy  () { }
    
    onSubGameStart  (e) {
        console.log("game start")
    }

    onBtnClick2  (e) {
        switch (e.currentTarget.name) {
            case "btn_becomebankerup":
                clientKernel.getMeUserItem().getUserScore() > 5e3 ? (clientKernel.sendGameMsg(BcbmSubGameMSG.subGameMSG.SUB_C_APPLY_BANKER, clientKernel.getMeUserItem().getChairID()), this.btn_down.active = !0) : console.log("\u6e38\u620f\u91d1\u5e01\u4e0d\u8db3\uff0c\u8bf7\u5145\u503c\u540e\u518d\u7533\u8bf7\u4e0a\u5e84");
                break;
            case "btn_becomebankerdown":
                clientKernel.sendGameMsg(BcbmSubGameMSG.subGameMSG.SUB_C_CANCEL_BANKER, clientKernel.getMeUserItem().getChairID()), this.btn_down.active = !1
        }
    }

    checkScore  () {
        var e = cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum;
        return clientKernel.getMeUserItem().getUserScore() < e ? (UIHelper.showTips("\u5206\u6570\u4e0d\u8db3!"), 0) : e
    }

    onBtnClick  (e) {
        switch (e.currentTarget.name) {
            case "btn_table1":
                if (!this.checkScore()) return;
                this.onSixGold(cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum, 0), this.gold.runAction(cc.moveTo(1, this.onMathPositionX(0), this.onMathPositionY(0))), clientKernel.sendGameMsg(BcbmSubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
                    areaType: 0,
                    money: cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum
                }]);
                break;
            case "btn_table2":
                if (!this.checkScore()) return;
                this.onSixGold(cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum, 1), this.gold.runAction(cc.moveTo(1, this.onMathPositionX(1), this.onMathPositionY(1))), clientKernel.sendGameMsg(BcbmSubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
                    areaType: 1,
                    money: cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum
                }]);
                break;
            case "btn_table3":
                if (!this.checkScore()) return;
                this.onSixGold(cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum, 2), this.gold.runAction(cc.moveTo(1, this.onMathPositionX(2), this.onMathPositionY(2))), clientKernel.sendGameMsg(BcbmSubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
                    areaType: 2,
                    money: cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum
                }]);
                break;
            case "btn_table4":
                if (!this.checkScore()) return;
                this.onSixGold(cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum, 3), this.gold.runAction(cc.moveTo(1, Math.random() * (this.eighttable.children[3].children[0].getContentSize().width / 4) + this.eighttable.children[3].children[0].position.x, Math.random() * (this.eighttable.children[3].children[0].getContentSize().height / 3) + this.eighttable.children[3].children[0].position.y + 50)), clientKernel.sendGameMsg(BcbmSubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
                    areaType: 3,
                    money: cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum
                }]);
                break;
            case "btn_table5":
                if (!this.checkScore()) return;
                this.onSixGold(cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum, 4), this.gold.runAction(cc.moveTo(1, this.onMathPositionX(4), this.onMathPositionY(4))), clientKernel.sendGameMsg(BcbmSubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
                    areaType: 4,
                    money: cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum
                }]);
                break;
            case "btn_table6":
                if (!this.checkScore()) return;
                this.onSixGold(cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum, 5), this.gold.runAction(cc.moveTo(1, this.onMathPositionX(5), this.onMathPositionY(5))), clientKernel.sendGameMsg(BcbmSubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
                    areaType: 5,
                    money: cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum
                }]);
                break;
            case "btn_table7":
                if (!this.checkScore()) return;
                this.onSixGold(cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum, 6), this.gold.runAction(cc.moveTo(1, this.onMathPositionX(6), this.onMathPositionY(6))), clientKernel.sendGameMsg(BcbmSubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
                    areaType: 6,
                    money: cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum
                }]);
                break;
            case "btn_table8":
                if (!this.checkScore()) return;
                this.onSixGold(cc.find("Canvas").getComponent("BcbmAllcanvas").choosenum, 7), this.gold.runAction(cc.moveTo(1, this.onMathPositionX(7), this.onMathPositionY(7))), clientKernel.sendGameMsg(BcbmSubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
                    areaType: 7,
                    money: cc.find("Canvas").getComponent("BcbmAllcanvas").eightchoosenum
                }])
        }
    }

    onSixGold  (e, t) {
        this.gold = cc.instantiate(this.goldp[e]), this.gold.zIndex = e, this.eightpos.children[t].addChild(this.gold), this.gold.setPosition(-900, -200);
        var o = this.eightpos.children[8].children[0].position,
            n = this.eightpos.children[8].convertToWorldSpace(o),
            i = this.gold.parent.convertToNodeSpace(n);
        this.gold.setPosition(i)
    }

    onMathPositionX  (e) {
        return Math.random() * (this.eighttable.children[e].children[0].getContentSize().width / 3) + this.eighttable.children[e].children[0].position.x
    }

    onMathPositionY  (e) {
        return Math.random() * (this.eighttable.children[e].children[0].getContentSize().height / 2) + this.eighttable.children[e].children[0].position.y
    }

    onCountDown1  () {
        this.schedule(function () {
            (this.beginnum--, this.beginnum < 10 ? this.begintime[0].string = "0" + this.beginnum.toString() : this.begintime[0].string = this.beginnum.toString(), 0 == this.beginnum && this.scheduleOnce(function () {
                this.clock[0].active = !1, this.clock[1].active = !0
            }, 1), 3 == this.beginnum) && (audioMgr.playEffect(BcbmGameConfig.AudioData.clock), this.threetime[2].active = !0, this.threetime[2].getComponent(cc.Animation).play(), this.scheduleOnce(function () {
                this.threetime[2].active = !1
            }, 1));
            2 == this.beginnum && (audioMgr.playEffect(BcbmGameConfig.AudioData.clock), this.threetime[1].active = !0, this.threetime[1].getComponent(cc.Animation).play(), this.scheduleOnce(function () {
                this.threetime[1].active = !1
            }, 1));
            1 == this.beginnum && (audioMgr.playEffect(BcbmGameConfig.AudioData.clock), this.threetime[0].active = !0, this.threetime[0].getComponent(cc.Animation).play(), this.scheduleOnce(function () {
                this.threetime[0].active = !1
            }, 1))
        }, 1, this.beginnum, 0)
    }

    onCountDown2  (e) {
        this.schedule(function () {
            this.drawnum < 10 ? this.begintime[1].string = "0" + this.drawnum.toString() : this.begintime[1].string = this.drawnum.toString(), this.drawnum--
        }, 1, this.drawnum, 0), this.schedule(function () {
            this.num > 31 && (this.thirtytwo.children[31].children[0].active = !1, this.num = 0), this.num > 0 && (this.thirtytwo.children[this.num - 1].children[0].active = !1), this.thirtytwo.children[this.num].children[0].active = !0, this.num++, audioMgr.playEffect(BcbmGameConfig.AudioData.btnturn)
        }, .05, e.slotIndex + 32 + (32 - this.savenum), 0), this.scheduleOnce(function () {
            this.updateWinScore(e.meAllWin)
        }, 15), this.scheduleOnce(function () {
            this.onAllocation();
            var t = Number(this.banker.children[1].getComponent(cc.Label).string);
            t += e.bankerResult, this.banker.children[1].getComponent(cc.Label).string = t.toString()
        }, 7)
    }

    onOnceAgain  () {
        this.beginnum = 15, this.drawnum = 16, this.begintime[0].string = this.beginnum.toString(), this.begintime[1].string = this.drawnum.toString(), this.clock[0].active = !0, this.clock[1].active = !1
    }

    resetChip  () {
        this.savenum = this.num;
        for (var e = 0; e < 8; e++) this.textl[e].string = "0", this.textc[e] = 0, this.eightpos.children[e].destroyAllChildren();
        for (e = 0; e < 8; e++) this.myChipLabList[e].string = "0", this.myChipScoreList[e] = 0;
        this.textc[8] = 0, this.banker.children[3].children[0].getComponent(cc.Label).string = this.textc[8].toString(), this.myChipLab.string = "0", this.curMyChip = 0
    }

    onAllBottomPour  (e) {
        switch (e.betArray[0].money) {
            case 100:
                this.sixnum = 0;
                break;
            case 500:
                this.sixnum = 1;
                break;
            case 2e3:
                this.sixnum = 2;
                break;
            case 5e3:
                this.sixnum = 3;
                break;
            case 1e4:
                this.sixnum = 4;
                break;
            case 5e4:
                this.sixnum = 5
        }
        this.onSixBecomeGold(this.sixnum, e.betArray[0].areaType), clientKernel.getMeUserItem().getChairID() != e.chairID ? this.onEightPanel(e.betArray[0].areaType) : (this.updateChipScore(e.betArray[0].money), cc.find("Canvas").getComponent("BcbmAllcanvas").curChipList.push({
            areaType: e.betArray[0].areaType,
            money: e.betArray[0].money
        }))
    }

    onEightPanel  (e) {
        3 == e ? this.gold.runAction(cc.moveTo(1, Math.random() * (this.eighttable.children[7].children[0].getContentSize().width / 4) + this.eighttable.children[7].children[0].position.x, Math.random() * (this.eighttable.children[7].children[0].getContentSize().height / 3) + this.eighttable.children[7].children[0].position.y + 50)) : this.gold.runAction(cc.moveTo(1, this.onMathPositionX(e), this.onMathPositionY(e)))
    }

    onSixBecomeGold  (e, t) {
        audioMgr.playEffect(BcbmGameConfig.AudioData.getglod), this.gold = cc.instantiate(this.goldp[e]), this.gold.zIndex = e, this.eightpos.children[t].addChild(this.gold), this.gold.setPosition(-900, 200);
        var o = this.eightpos.children[8].children[1].position,
            n = this.eightpos.children[8].convertToWorldSpace(o),
            i = this.gold.parent.convertToNodeSpace(n);
        this.gold.setPosition(i)
    }

    onBankerList  (e) {
        this.banker.children[0].getComponent(cc.Label).string = e[0].nickname, this.banker.children[1].getComponent(cc.Label).string = e[0].bondMoney, this.banker.children[4].children[0].getComponent(cc.Label).string = e.length
    }

    onSwitch  (e) {
        this.banker.children[0].getComponent(cc.Label).string = e.bankerQueueInfo[0].nickname, this.banker.children[1].getComponent(cc.Label).string = e.bankerQueueInfo[0].bondMoney, this.banker.children[4].children[0].getComponent(cc.Label).string = e.bankerQueueInfo.length
    }


    onFirst  (e) {
        var t = e.bankerQueueInfo[0];
        if (e && t) {
            if (t.nickname) {
                this.banker.children[0].getComponent(cc.Label).string = t.nickname;
            } else {
                this.banker.children[0].getComponent(cc.Label).string = "无人上庄";
            }
            this.banker.children[1].getComponent(cc.Label).string = t.bondMoney;
        } else {
            console.error("onFirst: data is null or 索引超出");
        }
        this.banker.children[4].children[0].getComponent(cc.Label).string = e.bankerQueueInfo.length.toString();
    }


    onStatistics  (e) {
        for (var t = 0; t < 8; t++) {
            if (e.betArray[0].areaType === t) {
                this.textc[t] += e.betArray[0].money;
                this.textl[t].string = this.textc[t].toString();
                if (e.chairID === KernelData.chairID) {
                    this.myChipScoreList[t] += e.betArray[0].money;
                    this.myChipLabList[t].string = this.myChipScoreList[t].toString();
                }
            }
        }
        this.textc[8] += e.betArray[0].money;
        this.banker.children[3].children[0].getComponent(cc.Label).string = this.textc[8].toString();
    }

    onAllocation  () {
        for (var e = !1, t = 0; t < 8; t++)
            if (t != cc.find("Canvas").getComponent("BcbmAllcanvas").eightresult) {
                for (var o = 0; o < this.eightpos.children[t].children.length; o++) {
                    var n = this.eightpos.children[8].children[2].position,
                        i = this.eightpos.children[8].convertToWorldSpace(n),
                        r = this.eightpos.children[t].children[o].parent.convertToNodeSpace(i);
                    this.eightpos.children[t].children[o].runAction(cc.moveTo(1, r.x, r.y))
                }
                e = !0
            } e && audioMgr.playEffect(BcbmGameConfig.AudioData.getglod), this.scheduleOnce(function () {
                for (var e = !1, t = 0; t < 8; t++)
                    if (t != cc.find("Canvas").getComponent("BcbmAllcanvas").eightresult) {
                        for (var o = 0; o < this.eightpos.children[t].children.length; o++) {
                            var n = this.eightpos.children[8].children[cc.find("Canvas").getComponent("BcbmAllcanvas").eightresult + 3].position,
                                i = this.eightpos.children[8].convertToWorldSpace(n),
                                r = this.eightpos.children[t].children[o].parent.convertToNodeSpace(i);
                            this.eightpos.children[t].children[o].runAction(cc.moveTo(1, r.x, r.y))
                        }
                        e = !0
                    } e && audioMgr.playEffect(BcbmGameConfig.AudioData.getglod)
            }, 1), this.scheduleOnce(function () {
                for (var e = 0; e < 8; e++)
                    for (var t = 0; t < this.eightpos.children[e].children.length; t++) {
                        var o = this.eightpos.children[8].children[1].position,
                            n = this.eightpos.children[8].convertToWorldSpace(o),
                            i = this.eightpos.children[e].children[t].parent.convertToNodeSpace(n);
                        this.eightpos.children[e].children[t].runAction(cc.moveTo(1, i.x, i.y))
                    }
                audioMgr.playEffect(BcbmGameConfig.AudioData.getglod)
            }, 2)
    }

    onRevampTime  (e) {
        e.statusStartTime = Math.floor(e.statusStartTime / 1e3), 101 == e.gameStatus ? (this.clock[0].active = !0, this.clock[1].active = !1, this.beginnum = e.statusStartTime, this.onCountDown1()) : 102 == e.gameStatus && (this.clock[0].active = !1, this.clock[1].active = !0, this.drawnum = 15 - e.statusStartTime, this.schedule(function () {
            this.drawnum--, this.begintime[1].string = this.drawnum.toString(), this.drawnum < 10 && (this.begintime[1].string = "0" + this.drawnum.toString())
        }, 1, e.statusStartTime, 0))
    }

    updateChipScore  (e) {
        this.curMyChip += e, this.myChipLab.string = "" + this.curMyChip
    }

    updateWinScore  (e) {
        this.wiScoreLab.string = "" + e
    }

    onbegin () {
        this.schedule(function () {
            this.beginnum < 10 ? this.begintime[0].string = "0" + this.beginnum.toString() : this.begintime[0].string = this.beginnum.toString(), this.beginnum--, -1 == this.beginnum && (this.scheduleOnce(function () {
                this.clock[0].active = !1, this.clock[1].active = !0
            }, 1), this.onDrawWin())
        }, 1, 16, 0)
    }

    onDrawWin  () {
        this.schedule(function () {
            this.drawnum < 10 ? this.begintime[1].string = "0" + this.drawnum.toString() : this.begintime[1].string = this.drawnum.toString(), this.drawnum--, -1 == this.drawnum && (this.scheduleOnce(function () {
                this.onOnceAgain()
            }, 1), this.beginnum = 16, this.onSubGameStart())
        }, 1, 16, 0), this.rotate = 10 * Math.random() + 40, this.schedule(function () {
            this.num > 31 && (this.thirtytwo.children[31].children[0].active = !1, this.num = 0), this.num > 0 && (this.thirtytwo.children[this.num - 1].children[0].active = !1), this.thirtytwo.children[this.num].children[0].active = !0, this.num++
        }, .2, this.rotate, 1)
    }
}