import zp_BetTime from "./zp_BetTime";
import { zp_GameConfig } from "./zp_GameConfig";
import { zp_GameData } from "./zp_GameData";
import zp_Jetton from "./zp_Jetton";
import zp_PlayerList from "./zp_PlayerList";
import zp_ResultList from "./zp_ResultList";
import { zp_SubGameMSG } from "./zp_SubGameMSG";
import zp_UserInfo from "./zp_UserInfo";
import zp_Zhuanpan from "./zp_Zhuanpan";

const { ccclass, property } = cc._decorator;

@ccclass
export default class zp_UIGame extends cc.Component {
    // var r = require("../shop/zp_Zhuanpan"),
    //     a = require("../shop/zp_Jetton"),
    //     c = require("../shop/zp_UserInfo"),
    //     s = require("./zp_BetTime"),
    //     l = require("./zp_GameData"),
    //     p = require("./zp_GameConfig"),
    //     u = require("../GameData/zp_SubGameMSG"),
    //     h = require("../shop/zp_PlayerList"),
    //     d = require("../shop/zp_ResultList"),
//i([_(r.default)], t.prototype, "zhuanPan", void 0), i([_(a.default)], t.prototype, "jetton", void 0), i([_(c.default)], t.prototype, "userInfo", void 0), i([_(s.default)], t.prototype, "betTime", void 0), i([_(cc.Node)], t.prototype, "startBetNode", void 0), i([_(cc.Node)], t.prototype, "stopBetNode", void 0), i([_], t.prototype, "_gameRecordQueue", void 0), i([_], t.prototype, "_lastGameResult", void 0), t = i([g], t)

    @property(zp_Zhuanpan)
    zhuanPan: zp_Zhuanpan = null;

    @property(zp_Jetton)
    jetton: zp_Jetton = null;

    @property(zp_UserInfo)
    userInfo: zp_UserInfo = null;

    @property(zp_BetTime)
    betTime: zp_BetTime = null;

    @property(cc.Node)
    startBetNode: cc.Node = null;

    @property(cc.Node)
    stopBetNode: cc.Node = null;

    @property(zp_ResultList)
    private _resultList: zp_ResultList = null;

    @property(zp_PlayerList)
    private _playerList: zp_PlayerList = null;

    private _gameRecordQueue: any[] = null;
    private _lastGameResult: any = null;
    private bindObj: any[] = [];

    start() {
        zp_GameData.GameData.lastAreaBetArray = [], zp_GameData.GameData.lastMyAreaBetArray = [], zp_GameData.GameData.lastMyAreaBetArray.push({
            lastAreaBetArray: zp_GameData.GameData.lastAreaBetArray,
            allJettonMoney: zp_GameData.GameData.allJettonMoney
        });
        var e = clientKernel.getMeUserItem();
        this.userInfo.init(e), this._gameRecordQueue = [], GameTools.addBtnOnClick(this.node, this.onBtnClick, this), audioMgr.playMusic(zp_GameConfig.AudioData.fq_bg), this.bindEvent(), this.startBetNode.active = !1, this.stopBetNode.active = !1, this._playerList = cc.find("Canvas").getComponentInChildren(zp_PlayerList), this._resultList = cc.find("Canvas").getComponentInChildren(zp_ResultList)
    }

    onBtnClick(e) {
        var t = e.getCurrentTarget().name;
        switch (audioMgr.playEffect(zp_GameConfig.AudioData.fq_button, !1), t) {
            case "btn_player_list":
                this._playerList.node.active = !0, this._playerList.initAllPlayerInfo();
                break;
            case "btn_result_list":
                this._resultList.node.active = !0, this._resultList.initAllResultInfo(this._gameRecordQueue)
        }
    }

    bindEvent() {
        this.bindObj = []
    }

    onDestroy() {
        GameTools.destroyOnFire(this.bindObj)
    }

    onEventSceneMessage(e, t) {
        this.onGameClear();
        var o = clientKernel.getMeUserItem();
        zp_GameData.GameData.userScore = o.getUserScore(), onfire.fire("setUserInfoMoney", zp_GameData.GameData.userScore), this._gameRecordQueue = t.diceCaseRecord;
        for (var n = 0, i = 0; i < t.myBetArray.length; i++) t.myBetArray[i] > 0 && (n += t.myBetArray[i], t.areaBetArray[i] -= t.myBetArray[i]);
        switch (this.jetton.myBetScene(n), this.jetton.myBetScene(t.meAllWin), this.reverseArea(t.myBetArray, !0), this.reverseArea(t.areaBetArray, !1), e) {
            case zp_SubGameMSG.subGameMSG.GS_ADD_JETTON:
                zp_GameData.GameData.gameStatus = 101, audioMgr.playEffect(zp_GameConfig.AudioData.fq_startBet, !1), this.betTime.showState(!0), this.betTime.showTime(t.statusLeftTime), onfire.fire("userInfo_startBet", t);
                break;
            case zp_SubGameMSG.subGameMSG.GS_GAME_RESULT:
                zp_GameData.GameData.gameStatus = 102, audioMgr.playEffect(zp_GameConfig.AudioData.fq_endWager, !1), this.betTime.showState(!1), this.betTime.showTime(t.statusLeftTime), this.zhuanPan.showResultBall(this._gameRecordQueue[this._gameRecordQueue.length - 1]), onfire.fire("userInfo_gameResult")
        }
    }

    onEventGameMessage(event, data) {
        console.log("Game message event:", event, data);

        switch (event) {
            case zp_SubGameMSG.subGameMSG.SUB_S_ADD_JETTION:
                this.onUserAddJetton(data);
                break;
            case zp_SubGameMSG.subGameMSG.SUB_S_GAME_RESULT:
                zp_GameData.GameData.gameStatus = 102;
                audioMgr.playEffect(zp_GameConfig.AudioData.fq_endWager, !1);
                this.onGameResult(data);
                break;
            case zp_SubGameMSG.subGameMSG.SUB_S_GAME_START:
                zp_GameData.GameData.gameStatus = 101;
                audioMgr.playEffect(zp_GameConfig.AudioData.fq_startBet, !1);
                this.onGameStart(data);
                break;
            case zp_SubGameMSG.subGameMSG.SUB_S_GAME_FREE:
                console.log("Free game status:", JSON.stringify(data));
                zp_GameData.GameData.gameStatus = 106;
                this.onGameFree(data);
                break;
            case zp_SubGameMSG.subGameMSG.SUB_S_GAME_TIP:
                if (data.text === "您的投注金额不足") {
                    zp_GameData.GameData.lastAreaBetArray = [];
                    UIHelper.showTips(data.text)
                }
                break;
        }
    }

    onGameClear() {
        this.jetton.clearAllJetton(), this.jetton.clearMyAllJetton(), zp_GameData.GameData.lastAreaBetArray = [], zp_GameData.GameData.lastMyAreaBetArray = [], zp_GameData.GameData.lastMyAreaBetArray.push({
            lastAreaBetArray: zp_GameData.GameData.lastAreaBetArray,
            allJettonMoney: zp_GameData.GameData.allJettonMoney
        })
    }

    onGameFree(e) {
        this.betTime.showFreeState(!0), this.betTime.showTime(e.leftTime);
        var t = clientKernel.getMeUserItem();
        this.userInfo.init(t)
    }

    onGameStart(e) {
        var t = this;
        this.startBetNode.active = !0;
        var o = this.startBetNode.getComponentInChildren(cc.Animation);
        o.play(), o.on("finished", function (e) {
            t.startBetNode.active = !1
        });
        this.betTime.showState(!0), this.betTime.showTime(e.addJettonTime), onfire.fire("userInfo_startBet", e), this.jetton.clearAllJetton(), this.jetton.clearMyAllJetton();
        var n = clientKernel.getMeUserItem();
        this.userInfo.init(n)
    }

    onGameResult(e) {
        var t = this;
        this.stopBetNode.active = !0;
        var o = this.stopBetNode.getComponentInChildren(cc.Animation);
        o.play(), o.on("finished", function (e) {
            t.stopBetNode.active = !1
        });
        this.betTime.showState(!1), this.betTime.showTime(e.resultTime), this._lastGameResult = e, this.zhuanPan.init(e, this.onFinishAround.bind(this)), onfire.fire("userInfo_gameResult"), zp_GameData.GameData.lastMyAreaBetArray.push({
            lastAreaBetArray: zp_GameData.GameData.lastAreaBetArray,
            allJettonMoney: zp_GameData.GameData.allJettonMoney
        }), zp_GameData.GameData.lastMyAreaBetArray.splice(0, 1)
    }

    onFinishAround(e) {
        for (var t = 0; t < e.winArea.length; t++) this.jetton.areaArray[e.winArea[t]].playSelectEffectEt(1);
        for (var o = clientKernel.getMeUserItem(), n = 0; n < e.gameResultRecord.length; n++)
            if (e.gameResultRecord[n].chairID == o.getChairID()) {
                this.userInfo.showEndScore(e.gameResultRecord[n].win);
                break
            } this._gameRecordQueue = e.diceCaseRecord
    }

    // onUserAddJetton(e) {
    //     var t = clientKernel.getMeUserItem(),
    //         o = e.chairID,
    //         n = 0,
    //         i = e.betArray[0].areaType,
    //         r = e.betArray[0].money,
    //         a = e.betArray[0].jettonIndex;
    //     o == t.getChairID() && (this.jetton.allMyBetAddJetton(i, r, n), this.userInfo.init(t), this.userInfo.del(r), zp_GameData.GameData.lastAreaBetArray.push([i, a]), zp_GameData.GameData.lastAreaBetArray.length > 10 && zp_GameData.GameData.lastAreaBetArray.splice(0, zp_GameData.GameData.lastAreaBetArray.length - 10)), this.jetton.areaArray[i].onUserAddJetton(o, r, !1), n += r, this.jetton.allBetAddJetton(i, r, n)
    // }

    onUserAddJetton(event) {
        const { chairID, betArray } = event;
        const { areaType, money, jettonIndex } = betArray[0];
        const meUserItem = clientKernel.getMeUserItem();
        const betAmount = money;
        const areaIndex = areaType;
        const chairId = chairID;
      
        if (chairId === meUserItem.getChairID()) {
          this.jetton.allMyBetAddJetton(areaIndex, betAmount, 0);
          this.userInfo.init(meUserItem);
          this.userInfo.del(betAmount);
          zp_GameData.GameData.lastAreaBetArray.push([areaIndex, jettonIndex]);
          zp_GameData.GameData.lastAreaBetArray.splice(0, zp_GameData.GameData.lastAreaBetArray.length - 10);
        }
      
        this.jetton.areaArray[areaIndex].onUserAddJetton(chairId, betAmount, false);
        this.jetton.allBetAddJetton(areaIndex, betAmount, betAmount);
      }

    reverseArea(e, t) {
        for (var o = clientKernel.getMeUserItem(), n = [0, 0, 0, 0, 0], i = 0, r = 0, a = 0; a < e.length; ++a) {
            if (n = [0, 0, 0, 0, 0], (i = e[a]) > 0)
                for (var c = n.length - 1; c >= 0; c--)(r = Math.floor(i / zp_GameData.ChipList[c])) > 0 && (n[c] = r), i -= r * zp_GameData.ChipList[c];
            for (var s = 0; s < n.length; ++s)
                if (!(n[s] <= 0))
                    for (var p = 1; p <= n[s]; ++p) {
                        var u = {
                            chairID: t ? o.getChairID() : o.getChairID() + 1,
                            betArray: [{
                                areaType: a,
                                jettonIndex: s,
                                money: zp_GameData.ChipList[s]
                            }]
                        };
                        this.onUserAddJetton(u)
                    }
        }
    }
}