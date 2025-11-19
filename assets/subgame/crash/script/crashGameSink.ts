import GameSinkBase from "../../../kernel/Core/GameSinkBase";
import CrashScene from "./crashScene";

const { ccclass, property } = cc._decorator;

@ccclass
export default class dzpkGameSink extends GameSinkBase {
    public gameSceneName = "game_crash";

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    gameScript: CrashScene = null;


    start() {
        audioMgr.loadAudioDir("sound", function () {
            this.loadScene(this.gameSceneName)
        }.bind(this));
    }

    onSceneLoaded() {
        this.gameScript = cc.find("Canvas").getComponent(CrashScene);
    }

    onEventSceneMessage(gameStatus: number, data: any) {
        this.gameScript.onEventSceneMessage(gameStatus, data);
    }

    onEventGameMessage(subCMD: number, data: any) {
        this.gameScript.onEventGameMessage(subCMD, data);
    }

    onEventUserEnter(userItem: ClientUserItem) {
        this.gameScript.onEventUserEnter(userItem);
    }

    onEventUserLeave(userItem: ClientUserItem) {
        this.gameScript.onEventUserLeave(userItem);
    }

    UserOnlineOffline(userItem: ClientUserItem) {
        this.gameScript.UserOnlineOffline(userItem);
    }

    UserStatusChanged(statusData: any) {
        this.gameScript.UserStatusChanged(statusData);
    }

    onEventUserScore(userItem: ClientUserItem) {
        this.gameScript.onEventUserScore(userItem);
    }

    onCostTick(data){
        this.gameScript.onCostTick(data);
    }

    // update (dt) {}
}
