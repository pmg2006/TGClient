import { ClientUserItem } from "./extend/ClientUserItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameSinkBase extends cc.Component {
    bindObj = [];
    gameSceneName="game";

    onLoad() {

        console.log("GameSinkBase onLoad")
        // 场景信息监听
        this.bindObj.push(onfire.on("onEventSceneMessage", this.onEventSceneMessage.bind(this)));
        // 游戏消息监听
        this.bindObj.push(onfire.on("onEventGameMessage", this.onEventGameMessage.bind(this)));
        this.bindObj.push(onfire.on("replay", this.replay.bind(this)));
        this.bindObj.push(onfire.on("onEventUserEnter", this.onEventUserEnter.bind(this)));
        this.bindObj.push(onfire.on("onEventUserLeave", this.onEventUserLeave.bind(this)));
        this.bindObj.push(onfire.on("UserOnlineOffline", this.UserOnlineOffline.bind(this)));
        this.bindObj.push(onfire.on("UserStatusChanged", this.UserStatusChanged.bind(this)));
        this.bindObj.push(onfire.on("onEventUserScore", this.onEventUserScore.bind(this)));
        this.bindObj.push(onfire.on("onCostTick", this.onCostTick.bind(this)));

    }

    onDestroy() {
        console.log("GameSinkBase onDestroy")
        for (let i = 0; i < this.bindObj.length; i++) {
            onfire.un(this.bindObj[i])
        }
    }
    
    onSceneLoaded() {

    }

    replay(replayData) {
        console.error("发现是回放", replayData)
    }


    loadScene(gameSceneName: string) {
        //预加载场景     
        console.log("LoginGame...", gameSceneName)//开始加载游戏
        UIHelper.showWaitLayer(true,"LoginGame...")
        cc.director.preloadScene(gameSceneName, () => {
            cc.director.loadScene(gameSceneName, () => {
                UIHelper.showWaitLayer(false)
                this.onSceneLoaded()
                clientKernel.onClientReady() //发送准备好的消息
            });
        });
    }
    onEventSceneMessage(gameStatus: number, data: any) { }
    onEventGameMessage(subCMD: number, data: any) { }
    onEventUserEnter(userItem: ClientUserItem) { }
    onEventUserLeave(userItem: ClientUserItem) { }
    UserOnlineOffline(userItem: ClientUserItem) { }
    UserStatusChanged(statusData) { }
    onEventUserScore(userItem: ClientUserItem) { }
    onCostTick(data) { }

}

