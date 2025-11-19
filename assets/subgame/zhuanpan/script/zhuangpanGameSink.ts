import GameSinkBase from "../../../kernel/Core/GameSinkBase";
import zp_UIGame from "./zp_UIGame";

const { ccclass } = cc._decorator;

@ccclass
export default class ZhuangpanGameSink extends GameSinkBase {
    soundRoot: string = "zhuanpan";
    gameSceneName: string = "zhuanpan_game";
    gameScript: any = null;

    start() {
        audioMgr.loadAudioDir(this.soundRoot, () => {
            this.loadScene(this.gameSceneName);
        });
    }

    onSceneLoaded() {
        this.gameScript = cc.find("Canvas").getComponentInChildren(zp_UIGame);
    }

    onEventSceneMessage(gameStatus: number, data: any) {
        if (!this.gameScript) {
            this.gameScript = cc.find("Canvas").getComponentInChildren(zp_UIGame);
        }
        this.gameScript.onEventSceneMessage(gameStatus, data);
    }

    onEventGameMessage(subCMD: number, data: any) {
        this.gameScript.onEventGameMessage(subCMD, data);
    }
}
