import BaseHotUpdate from "../../../kernel/components/BaseHotUpdate";
import GameConfig from "../../../kernel/Base/GameConfig";
import { GameData } from "../../script/GameData";
import { UIConf, uiManager } from "../../../core/UIManager";


const { ccclass, property } = cc._decorator;



if(GameData.Instance.bDebug) {
    console.log("当前是Debug环境");
} else {
    console.log("当前是Release环境");
    console.log = function(){}
    console.error = function(){}
    console.warn = function(){}
}

export enum UIID {
    Login
}

export let UICF: { [key: number]: UIConf } = {
    [UIID.Login]: { prefab: "hall/panel/panel_loginSign" },
}

@ccclass
export default class HallHotUpdate extends BaseHotUpdate {

    @property(cc.ProgressBar)
    updateProgress: cc.ProgressBar = null;

    @property(cc.Label)
    lblInfo: cc.Label = null;

    @property(cc.Label)
    lblBytes: cc.Label = null;

    @property(cc.Label)
    lblPercent: cc.Label = null;

    continueGame() {
        //cc.director.loadScene("login");
        if (cc.sys.isBrowser && !cc.sys.isMobile) {
            cc.director.loadScene("hall_h");
        } else {
            cc.director.loadScene("hall_cup");
        }
        //cc.director.loadScene("hall_cup");
        // let self = this;
        // let lastProgress = -1;
        // cc.director.preloadScene('hall', function (completedCount, totalCount, item) {
        //     let progress = (completedCount / totalCount).toFixed(2);
        //     let number = parseFloat(progress);
        //     lastProgress = Math.max(lastProgress, number);
        //     self.setDownProgress(lastProgress);
        //     if (number >= 1) {
        //         console.log("大厅加载完成");
        //     }
        // }, function (error) {
        //     if (error) {
        //         cc.error(error);
        //         return;
        //     }

        //     console.log('Loading hall success');

        //     if(cc.director.getScene().name !== "hall") {
        //         cc.director.loadScene("hall");
        //     }
        // });
    }

    setDownLoadFile(downFileCount, totalFileCount) {
        this.lblPercent.string = downFileCount + " / " + totalFileCount;
    }

    setDownProgress(progress: number) {
        if (this.updateProgress) {
            this.updateProgress.progress = progress;
        }
    }

    setTipsText(text) {
        this.lblInfo.string = text;
        console.log("更新日志:" + text);
    }

    updateFailed() {
        console.error("游戏更新失败");
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onLoad() {
        GameConfig.IS_DEBUG_B = GD.GameConfig.isDebug;

        // GameConfig.SHARE_URL_S = "https://www.mqyxh.cn/knAGKM";
        // GameConfig.SHARE_TITLE_S = "广东三张招收代理";
        // GameConfig.SHARE_CONENT_S = "不需要投资，只要你有人脉，轻松月入过万，期待您的加盟";

        if (GameConfig.IS_DEBUG_B && this.debugManifestUrl) {
            this.manifestUrl = this.debugManifestUrl;
        }

        this.android_version = '2.0.0';
        this.ios_version = '2.0.0';
        this.SHARE_DOWNLOAD_URL = GameConfig.SHARE_URL_S;
        console.log("")//开始检查游戏大版本
        //如何需要先检查大版本,需要调用此方法
        // super.checkGameVersion();
        super.startGameUpdate();

        uiManager.initUIConf(UICF);
    }


    // update (dt) {}
}
