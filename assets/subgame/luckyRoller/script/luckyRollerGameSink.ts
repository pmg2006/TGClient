import GameSinkBase from "../../../kernel/Core/GameSinkBase";
import UIGame from "./lr_Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class lrGameSink extends GameSinkBase {
    soundRoot = "lr_LuckyRoller";
    gameSceneName = "lr_LuckyRoller";

    gameScript: UIGame = null

    start() {
        audioMgr.loadAudioDir(this.soundRoot, () => {
            this.loadScene(this.gameSceneName);
        })
    }

    onSceneLoaded() {
        this.gameScript = cc.find("Canvas").getComponent(UIGame);
    }

    onEventSceneMessage(gameStatus: number, data: any) {
        if (!this.gameScript) {
            this.gameScript = cc.find("Canvas").getComponent(UIGame)
        }
        this.gameScript.onEventSceneMessage(gameStatus, data);
    }

    onEventGameMessage(subCMD: number, data: any) {
        if (!this.gameScript) {
            this.gameScript = cc.find("Canvas").getComponent(UIGame)
        }
        this.gameScript.onEventGameMessage(subCMD, data);
    }
}
