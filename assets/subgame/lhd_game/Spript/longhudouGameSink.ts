import GameSinkBase from "../../../kernel/Core/GameSinkBase";
import { lhd_SubGameMSG } from "../GameData/lhd_SubGameMSG";
import { lhd_GameConfig } from "./lhd_GameConfig";
import { lhd_GameData } from "./lhd_GameData";
import lhd_UIGame from "./lhd_UIGame";

const { ccclass, property } = cc._decorator;

@ccclass
export default class longhudouGameSink extends GameSinkBase {
 
    gameSceneName = "lhd_game";
    gameScript = null;
    sceneData = null;
    userInfo = null;
    cardMsgI = null;
    findBanckCharid = 0;

    start  () {
        var e = this;
        audioMgr.loadAudioDir("longhudou/sound", function () {
            e.loadScene(e.gameSceneName)
        })
    }

    onSceneLoaded  () {
        audioMgr.playMusic(lhd_GameConfig.AudioData.bgm), this.gameScript = cc.find("Canvas").getComponentInChildren(lhd_UIGame)
    }

    // onEventSceneMessage  (e, t) {
    //     console.error("\u8fdb\u5165\u573a\u666f================", t), this.cardMsgI = t;
    //     var o = this.getAllUserInfo();
    //     this.sceneData = t;
    //     var n = this.sceneData.gameRecordQueue;
    //     lhd_GameData.GameData.userInfo = o, this.gameScript.getcardInfo(n), this.gameScript.getUserAll(0), t.bankerQueueInfo && t.bankerQueueInfo.length > 0 && (this.findBanckCharid = t.bankerQueueInfo[0].chairID, lhd_GameData.GameData.bankerVip = clientKernel.getTableUserItem(this.findBanckCharid).getVipLevel(), this.gameScript.showbanck(t.bankerQueueInfo)), this.getBetSumList(t), this.gameScript.clickTop6Info(), e == lhd_SubGameMSG.subGameMSG.GS_ADD_JETTON ? this.gameScript.theBetLoadgame(t) : e == lhd_SubGameMSG.subGameMSG.GS_GAME_RESULT && this.gameScript.loadBetStatus(t)
    // }

    onEventSceneMessage  (e, t) {
        console.error("进入场景================", t);
        this.cardMsgI = t;
        var o = this.getAllUserInfo();
        this.sceneData = t;
        var n = this.sceneData.gameRecordQueue;
        lhd_GameData.GameData.userInfo = o;
        this.gameScript.getcardInfo(n);
        this.gameScript.getUserAll(0);
        
        if (t.bankerQueueInfo && t.bankerQueueInfo.length > 0) {
            this.findBanckCharid = t.bankerQueueInfo[0].chairID;
            lhd_GameData.GameData.bankerVip = clientKernel.getTableUserItem(this.findBanckCharid).getVipLevel();
            this.gameScript.showbanck(t.bankerQueueInfo);
        }
        
        this.getBetSumList(t);
        this.gameScript.clickTop6Info();
        
        if (e == lhd_SubGameMSG.subGameMSG.GS_ADD_JETTON) {
            this.gameScript.theBetLoadgame(t);
        } else if (e == lhd_SubGameMSG.subGameMSG.GS_GAME_RESULT) {
            this.gameScript.loadBetStatus(t);
        }
    }

    onEventGameMessage  (e, t) {
        switch (console.log("游戏消息事件", e, t), e) {
            case lhd_SubGameMSG.subGameMSG.SUB_S_GAME_START:
                console.log("游戏开始", JSON.stringify(t)), this.gameScript.showbtn_ContinueTouch(0);
                var o = t;
                this.gameScript.getGameStatus(o), this.gameScript.cotateBetRemind(1), lhd_GameData.GameData.betThisRound = 0, lhd_GameData.GameData.betArray = [], this.gameScript.countDown_Start(t), this.onSubGameStart(t);
                var n = this.getAllUserInfo();
                lhd_GameData.GameData.userInfo = n, this.gameScript.updateTop6Info(), this.gameScript.clearAllJetton(), this.gameScript.refreshMyScore(), this.gameScript.user_jetton(), this.gameScript.jetton_active(1), this.gameScript.showAllUserInfos(1), this.gameScript.clickTop6Info();
                break;
            case lhd_SubGameMSG.subGameMSG.SUB_S_ADD_JETTON:
                console.log("玩家下注", JSON.stringify(t));
                this.userAddJetton(t);
                this.gameScript.refreshMyScore();
                this.gameScript.showGetBet();
                break;
            case lhd_SubGameMSG.subGameMSG.SUB_S_GAME_RESULT:
                // 初始化下注总额
                this.gameScript.InitializeBetSum();
                // 显示继续下注按钮
                this.gameScript.showbtn_ContinueTouch(1);
                // 停止下注提醒
                this.gameScript.cotateBetRemind(0);
                
                var i = t;
                var r = this.getAllUserInfo();
                
                // 更新用户信息
                lhd_GameData.GameData.userInfo = r;
                
                // 如果本轮有下注，将本轮的下注信息保存到上一轮的下注信息中
                if (lhd_GameData.GameData.betArray.length > 0) {
                    lhd_GameData.GameData.lastBet = lhd_GameData.GameData.betArray.slice(0);
                }
                
                // 更新所有用户的信息
                this.gameScript.getUserAll(2);
                // 显示卡片信息
                this.gameScript.showCard(i.cards);
                // 更新我的金币
                this.gameScript.updateMyMoney(i.result, t.gameRankInfo);
                // 更新庄家的金币
                this.gameScript.updateBanckMoney(i.bankerResult);
                // 停止下注活动
                this.gameScript.jetton_active(0);
                break;
            case lhd_SubGameMSG.subGameMSG.SUB_S_BANKER_QUEUE:
                var a = t;
                a && t.length > 0 && (this.findBanckCharid = a[0].chairID, lhd_GameData.GameData.bankerVip = clientKernel.getTableUserItem(this.findBanckCharid).getVipLevel()), this.gameScript.removeAllChildrens(), this.gameScript.showbanck(t), this.gameScript.getUserAll(0);
                break;
            case lhd_SubGameMSG.subGameMSG.SUB_S_SWITCH_BANKER:
                break;
            case lhd_SubGameMSG.subGameMSG.SUB_S_GAME_HINT:
                var c = t;
                this.gameScript.showVillagecotate(c.hintType, c.text)
        }
    }

    // 用户下注
    userAddJetton  (info) {
        var t = this;  // 当前对象
        var betInfo = info;  // 下注信息
        var jettonUserChairID = -1;  // 用户索引
        // 查找下注用户在用户信息中的索引
        for (var i = 0; i < lhd_GameData.GameData.userInfo.length; i++) {
            var infoInfo = lhd_GameData.GameData.userInfo[i];
            if (betInfo.chairID == infoInfo.chairID) {
                jettonUserChairID = i;
                break;
            }
        }
        // 判断是否是当前用户下注
        var isMy = false;
        if (clientKernel.getMeChairID() == betInfo.chairID) {
            isMy = true;
        }
        // 遍历下注区域和金额
        betInfo.betArray.forEach(function (e) {
            var i = e.areaType;  // 下注区域
            var betMoney = e.money;  // 下注金额
            // 如果是当前用户下注，更新下注信息
            if (isMy) {
                lhd_GameData.GameData.myBet[i] += betMoney;
                lhd_GameData.GameData.betThisRound += betMoney;
                t.gameScript.my_bet(betMoney, i);
                lhd_GameData.GameData.betArray.push({
                    money: betMoney,
                    areaType: i
                });
            }
            // 更新所有用户在该区域的下注总额
            lhd_GameData.GameData.playersBet[i] += betMoney;
            // 如果找到下注用户，显示所有用户的下注信息
            if (jettonUserChairID != -1 && clientKernel.getMeChairID() != betInfo.chairID) {
                console.error(jettonUserChairID + "号玩家" + i + "下注" + betMoney);
                t.gameScript.showAllPlayBet(jettonUserChairID, i, betMoney);
            } else if (clientKernel.getMeChairID() != betInfo.chairID) {
                // 如果不是当前用户下注，显示所有用户的下注信息
                t.gameScript.showAllsPlayBet(betMoney, i);
            }
        });
    }

    getBetSumList  (e) {
        for (var t = e, o = 0; o < t.config.betType2Money.length; o++) lhd_GameData.GameData.betType2Money[o] = t.config.betType2Money[o]
    }

    onEventUserEnter  (e) { }

    onEventUserLeave  (e) { }

    UserOnlineOffline  (e) { }

    // UserStatusChanged  (e) {
    //     console.error("\u73a9\u5bb6\u6e38\u620f\u72b6\u6001\u6539\u53d8chairID= " + e.chairID + " userStatus = " + e.userStatus)
    // }

    UserStatusChanged  (e) {
        console.error("玩家游戏状态改变 chairID=" + e.chairID + " userStatus=" + e.userStatus);
    }

    onSubGameStart  (e) {
        this.gameScript.onSubGameStart(e), lhd_GameData.GameData.myBet = [0, 0, 0], lhd_GameData.GameData.playersBet = [0, 0, 0], this.gameScript.showGetBet()
    }

    getAllUserInfo  () {
        lhd_GameData.GameData.myname = clientKernel.getMeUserItem().getNickname();
        lhd_GameData.GameData.mymoney = clientKernel.getMeUserItem().getUserScore();
        lhd_GameData.GameData.myVip = clientKernel.getMeUserItem().getVipLevel();

        let playerList = [];
        for (let index = 0; index < 100; index++) {
            let player = clientKernel.getTableUserItem(index);
            // 我们正在检查玩家是否存在，玩家是否不是当前用户，以及玩家是否不是庄家。
            // 这样做是为了确保我们只将有效的、非当前用户、非庄家的玩家添加到玩家列表中。
            //if (player && player.getChairID() != clientKernel.getMeChairID() && index != this.findBanckCharid) {
            if (player) {
                let vipLevel = player.getVipLevel();
                vipLevel = vipLevel > 10 ? 10 : vipLevel;
                playerList.push({
                    gameID: player.getGameID(),
                    nickname: player.getNickname(),
                    head: player.getHead(),
                    score: player.getUserScore(),
                    chairID: index,
                    betThisRound: 0,
                    userVip: vipLevel
                })
            }
        }
        return playerList.sort((player1, player2) => player2.score - player1.score);
    }

    getGameRcrd  () { }
}