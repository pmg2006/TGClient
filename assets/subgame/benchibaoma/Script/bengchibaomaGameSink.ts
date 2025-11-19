import GameSinkBase from "../../../kernel/Core/GameSinkBase";
import { BcbmGameConfig } from "./BcbmGameConfig";
import { BcbmSubGameMSG } from "./BcbmSubGameMSG";
import BcbmUIGame from "./BcbmUIGame";
import BcbmUIMenu from "./BcbmUIMenu";

const { ccclass } = cc._decorator;

@ccclass
export default class bengchibaomaGameSink extends GameSinkBase {
    // var r = require("./BcbmGameConfig"),
    //     a = require("./BcbmSubGameMSG"),
    //     c = require("./BcbmUIGame"),
    //     s = require("./BcbmUIMenu"),
    //     l = require("./GameSinkBase"),
    soundRoot = "benchibaoma";
    gameSceneName = "bcbm_game";
    gameScript = null;
    menuScript = null;

    // start = function () {
    //     var e = this;
    //     audioMgr.loadAudioDir(this.soundRoot, function () {
    //         e.loadScene(e.gameSceneName)
    //     })
    // }

    start = function () {
        var self = this;
        audioMgr.loadAudioDir(this.soundRoot, function () {
            self.loadScene(self.gameSceneName);
        });
    }

    // loadScene = function (e) {
    //     var t = this;
    //     console.log("LoginGame...", e), UIHelper.showWaitLayer(!0, "LoginGame..."), cc.director.preloadScene(e, function () {
    //         cc.director.loadScene(e, function () {
    //             UIHelper.showWaitLayer(!1), t.onSceneLoaded()
    //         })
    //     })
    // }

    loadScene = function (sceneName) {
        var self = this;
        console.log("LoginGame...", sceneName);
        UIHelper.showWaitLayer(true, "LoginGame...");

        cc.director.preloadScene(sceneName, function () {
            cc.director.loadScene(sceneName, function () {
                UIHelper.showWaitLayer(false);
                self.onSceneLoaded();
            });
        });
    }

    // onSceneLoaded = function () {
    //     var e = this;
    //     GD.GameTool.createPrefab(BcbmGameConfig.UIData.roominfo.url, function (e) {
    //         e.zIndex = BcbmGameConfig.UIData.roominfo.zIndex, e.parent = cc.find("Canvas")
    //     });
    //     var t = 0;
    //     GD.GameTool.createPrefab(BcbmGameConfig.UIData.menu.url, function (o) {
    //         o.zIndex = BcbmGameConfig.UIData.menu.zIndex, o.parent = cc.find("Canvas"), e.menuScript = o.getComponent(BcbmUIMenu), ++t >= 2 && clientKernel.onClientReady()
    //     }), GD.GameTool.createPrefab(BcbmGameConfig.UIData.game.url, function (o) {
    //         o.zIndex = BcbmGameConfig.UIData.game.zIndex, o.parent = cc.find("Canvas"), e.gameScript = o.getComponent(BcbmUIGame), ++t >= 2 && clientKernel.onClientReady()
    //     })
    // }

    onSceneLoaded = function () {
        var e = this;
        GD.GameTool.createPrefab(BcbmGameConfig.UIData.roominfo.url, function (roomInfoPrefab) {
            roomInfoPrefab.zIndex = BcbmGameConfig.UIData.roominfo.zIndex;
            roomInfoPrefab.parent = cc.find("Canvas");
        });

        var t = 0;
        GD.GameTool.createPrefab(BcbmGameConfig.UIData.menu.url, function (menuPrefab) {
            menuPrefab.zIndex = BcbmGameConfig.UIData.menu.zIndex;
            menuPrefab.parent = cc.find("Canvas");
            e.menuScript = menuPrefab.getComponent(BcbmUIMenu);
            ++t >= 2 && clientKernel.onClientReady();
        });

        GD.GameTool.createPrefab(BcbmGameConfig.UIData.game.url, function (gamePrefab) {
            gamePrefab.zIndex = BcbmGameConfig.UIData.game.zIndex;
            gamePrefab.parent = cc.find("Canvas");
            e.gameScript = gamePrefab.getComponent(BcbmUIGame);
            ++t >= 2 && clientKernel.onClientReady();
        });
    }

    // onEventSceneMessage = function (e, t) {
    //     this.gameScript.resetChip(), this.menuScript.onhistroy(t.gameRecordQueue), this.menuScript.onGetMyPanel(), this.gameScript.onFirst(t), this.gameScript.onFirstTime(t), this.menuScript.onBankerName(t), this.gameScript.onRevampTime(t), this.gameScript.updateChipScore(t.meAllBet), this.gameScript.updateWinScore(t.meAllWin)
    // }

    onEventSceneMessage = function (e, t) {
        this.gameScript.resetChip();
        this.menuScript.onhistroy(t.gameRecordQueue);
        this.menuScript.onGetMyPanel();
        this.gameScript.onFirst(t);
        this.gameScript.onFirstTime(t);
        this.menuScript.onBankerName(t);
        this.gameScript.onRevampTime(t);
        this.gameScript.updateChipScore(t.meAllBet);
        this.gameScript.updateWinScore(t.meAllWin);
    }

    // onEventGameMessage = function (e, t) {
    //     switch (console.log("\u6e38\u620f\u6d88\u606f\u4e8b\u4ef6", e, t), e) {
    //         case BcbmSubGameMSG.subGameMSG.SUB_S_GAME_START:
    //             this.gameScript.resetChip(), this.gameScript.hold.active = !1, console.log("\u6e38\u620f\u5f00\u59cb", JSON.stringify(t)), this.onSubGameStart(t), this.menuScript.onBeginIcon(), this.menuScript.bottompour.active = !1;
    //             break;
    //         case BcbmSubGameMSG.subGameMSG.SUB_S_GAME_RESULT:
    //             console.log("\u6e38\u620f\u5f00\u5956"), audioMgr.playEffect(BcbmGameConfig.AudioData.endBet), this.gameScript.onCountDown2(t), this.menuScript.onDestroyOneHistroy(t), this.menuScript.onOverIcon(), this.menuScript.onLastSettle(t), this.menuScript.bottompour.active = !0, this.menuScript.onMyGlod(), cc.find("Canvas").getComponent("BcbmAllcanvas").reset();
    //             break;
    //         case BcbmSubGameMSG.subGameMSG.SUB_S_GAME_HINT:
    //             console.log("\u8bf7\u7b49\u5f85\u4e0b\u4e00\u5c40\u5f00\u59cb");
    //             break;
    //         case BcbmSubGameMSG.subGameMSG.SUB_S_START_BET:
    //             console.log("\u5f00\u59cb\u4e0b\u6ce8"), audioMgr.playEffect(BcbmGameConfig.AudioData.startBet), this.gameScript.onOnceAgain(), this.gameScript.onCountDown1();
    //             break;
    //         case BcbmSubGameMSG.subGameMSG.SUB_S_BANKEY_FREE:
    //             console.log("\u5e84\u5bb6\u9003\u8dd1");
    //             break;
    //         case BcbmSubGameMSG.subGameMSG.SUB_S_ADD_JETTON:
    //             this.gameScript.onAllBottomPour(t), this.gameScript.onStatistics(t), this.menuScript.onLottory(t);
    //             break;
    //         case BcbmSubGameMSG.subGameMSG.SUB_S_GAME_HINT:
    //             console.log("\u6e38\u620f\u63d0\u793a", t.text);
    //             break;
    //         case BcbmSubGameMSG.subGameMSG.SUB_S_BANKER_QUEUE:
    //             this.gameScript.onBankerList(t), this.menuScript.onBankerName2(t);
    //             break;
    //         case BcbmSubGameMSG.subGameMSG.SUB_S_SWITCH_BANKER:
    //             this.gameScript.onSwitch(t), this.menuScript.onMyBankerPanel(t), console.log("7777777777777777777777777777777777777777777777777", t)
    //     }
    // }

    onEventGameMessage = function (e, t) {
        switch (console.log("游戏消息事件", e, t), e) {
            case BcbmSubGameMSG.subGameMSG.SUB_S_GAME_START:
                this.gameScript.resetChip();
                this.gameScript.hold.active = false;
                console.log("游戏开始", JSON.stringify(t));
                this.onSubGameStart(t);
                this.menuScript.onBeginIcon();
                this.menuScript.bottompour.active = false;
                break;
            case BcbmSubGameMSG.subGameMSG.SUB_S_GAME_RESULT:
                console.log("游戏开奖");
                audioMgr.playEffect(BcbmGameConfig.AudioData.endBet);
                this.gameScript.onCountDown2(t);
                this.menuScript.onDestroyOneHistroy(t);
                this.menuScript.onOverIcon();
                this.menuScript.onLastSettle(t);
                this.menuScript.bottompour.active = true;
                this.menuScript.onMyGlod();
                cc.find("Canvas").getComponent("BcbmAllcanvas").reset();
                break;
            case BcbmSubGameMSG.subGameMSG.SUB_S_GAME_HINT:
                console.log("请等待下一局开始");
                break;
            case BcbmSubGameMSG.subGameMSG.SUB_S_START_BET:
                console.log("开始下注");
                audioMgr.playEffect(BcbmGameConfig.AudioData.startBet);
                this.gameScript.onOnceAgain();
                this.gameScript.onCountDown1();
                break;
            case BcbmSubGameMSG.subGameMSG.SUB_S_BANKEY_FREE:
                console.log("庄家逃跑");
                break;
            case BcbmSubGameMSG.subGameMSG.SUB_S_ADD_JETTON:
                this.gameScript.onAllBottomPour(t);
                this.gameScript.onStatistics(t);
                this.menuScript.onLottory(t);
                break;
            case BcbmSubGameMSG.subGameMSG.SUB_S_GAME_HINT:
                console.log("游戏提示", t.text);
                break;
            case BcbmSubGameMSG.subGameMSG.SUB_S_BANKER_QUEUE:
                this.gameScript.onBankerList(t);
                this.menuScript.onBankerName2(t);
                break;
            case BcbmSubGameMSG.subGameMSG.SUB_S_SWITCH_BANKER:
                this.gameScript.onSwitch(t);
                this.menuScript.onMyBankerPanel(t);
                console.log("7777777777777777777777777777777777777777777777777", t);
                break;
        }
    }

    // onEventUserEnter = function (e) {
    //     var t = Number(this.menuScript.peoplenum);
    //     t++, this.menuScript.peoplenum.string = t.toString(), console.log("999999999999999999999999999999999999999999999999999")
    // }

    onEventUserEnter = function (e) {
        if (this.menuScript) {
            var t = parseInt(this.menuScript.peoplenum.string);
            t++;
            this.menuScript.peoplenum.string = t.toString();
            console.log("999999999999999999999999999999999999999999999999999");
        }
    }

    // onEventUserLeave = function (e) {
    //     var t = Number(this.menuScript.peoplenum);
    //     t++, this.menuScript.peoplenum.string = t.toString(), console.log("9999999999999999999999999999999999999999999999999998888888888888888888888888888")
    // }

    onEventUserLeave = function (e) {
        if (this.menuScript) {
            var t = parseInt(this.menuScript.peoplenum.string);
            t++;
            this.menuScript.peoplenum.string = t.toString();
            console.log("9999999999999999999999999999999999999999999999999998888888888888888888888888888");
        }
    }

    UserOnlineOffline = function (e) { }
    
    UserStatusChanged = function (e) {
        e.userStatus
    }

    onEventUserScore = function (e) {
        if (this.menuScript) {
            this.menuScript.onEventUserScore(e)
        }
    }

    onSubGameStart = function (e) {
        this.gameScript.onSubGameStart(e);
        console.log("data: StartGameData", e)
    }
}