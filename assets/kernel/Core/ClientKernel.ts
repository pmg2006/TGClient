import { gameCMD, gameConst } from "./KernelDefine";
import { KernelData } from "./KernelData";

import {GameUserManager} from "./extend/GameUserManager";

declare let window: any

export class ClientKernel {

    gameUserManager = null
    private gameStatus = null
    private myUserItem = null
    private myUserID = null
    private clientReady = false //客户端是否准备好，当成功触发onReady后， 就会重置为false， 防止重复触发
    private tableSetting = null //桌子信息
    private dismissData = null //解散信息
    private _gotoHall = true
    private isReplay = false
    private replayData = null
    private lastRecenectTime = 0 //上次手动重连时间
    private gameConfig = null


    constructor() {
        this.gameUserManager = new GameUserManager();
        this.gameUserManager.init(this);
        onfire.on("gamemsg", this.onEventMessage.bind(this))
    }

    reset() {
        this.clientReady = false
        this.gameUserManager.clearAllUserItem()
    }

    gotoSubgame2(moduleEnName) {
        UIHelper.showWaitLayer(true, "LoginGame...")
        this.reset()
        KernelData.moduleEnName = moduleEnName
        this.isReplay = false
        this.clientReady = false
        this.sendLogonMsg() //登录子游戏，登录成功的话回调onLogonSuccess
    }

    sendLogonMsg() {
        if (KernelData.roomID) {
            this.clientReady = false
            this.webSocketSend({ mainCMD: gameCMD.MDM_GR_LOGON, subCMD: gameCMD.SUB_GR_LOGON_ACCOUNTS })
            return
        }
        else {
            console.error("sendLogonMsg GD。roomid不存在！")
        }
    }

    //登录成功
    onLogonSuccess() {
        if (GameSink != null && cc.director.getScene().name == GameSink.gameSceneName) {
            console.log("发现在子游戏内 重新加载子游戏", GameSink.gameSceneName)
            GameSink.loadScene(GameSink.gameSceneName)
            return
        }
        else {
            console.log("登录成功，开始进入子游戏")
            this.createGameSink(KernelData.moduleEnName) //第一次进入房间
        }

    }


    getUserMgr() {
        return this.gameUserManager
    }

    getTableUserData() {
        console.error("getTableUserData 这个不再使用,已更名为 getTableSetting")
        return this.getTableSetting()
    }

    getTableSetting() {
        return this.tableSetting
    }


    getDismissData() {
        return this.dismissData
    }

    private webSocketSend(data) {
        if (this.isReplay) {
            return
        }
        var roomID = KernelData.roomID
        data.roomID = roomID
        NetHelp.sendGameMessage(data)
    }



    /**
    * 消息事件
    * @param data     * @returns {boolean}
    */
    private onEventMessage(data) {

        switch (data["mainCMD"]) {

            case gameCMD.MDM_GR_LOGON:
                this.onSocketMainLogon(data["subCMD"], data["data"]);
                break;
            case gameCMD.MDM_GR_USER:
                this.onSocketMainUser(data["subCMD"], data["data"]);
                return true;

            case gameCMD.MDM_GF_GAME:
                this.onSocketMainGame(data["subCMD"], data["data"]);
                return true;

            case gameCMD.MDM_GF_FRAME:
                this.onSocketMainFrame(data["subCMD"], data["data"]);
                return true;
        }
    }

    /**
    * 登录处理函数
    * @param subCMD
    * @param data
    * @returns {boolean}
    */
    private onSocketMainLogon(subCMD, data) {
        switch (subCMD) {
            //登录成功
            case gameCMD.SUB_GR_LOGON_SUCCESS:
                //登录成功就获取自己
                const { userID, gameConfig, userInfo, tableSetting, dismissData } = data
                this.myUserID = userID
                this.gameConfig = gameConfig
                this.tableSetting = tableSetting
                this.dismissData = dismissData //解散消息
                this.reset() //清空
                this.onUserEnter(userInfo)   //初始化桌子                       
                this.myUserItem = this.gameUserManager.getUserByUserID(this.myUserID);
                KernelData.userID = userID
                KernelData.chairID = this.myUserItem.chairID
                KernelData.tableID = this.myUserItem.tableID
                this.onLogonSuccess()
                console.log("登录成功,当前房间人数：", userInfo.length, JSON.stringify({ userID, gameConfig, tableSetting, dismissData }))
                return true;

            default:
                return true;
        }
    }


    getRoomInfo() {
        console.error("getRoomInfo这个不再使用,请使用 let tableSetting = clientKernel.getTableSetting()来获取桌子配置 你对应的消息监听也记得去掉")
    }

    onClientReady() {
        this.onReady();
        this.checkIsReplay()
    }

    onReady() {
        //获取场景游戏信息
        this.webSocketSend({
            mainCMD: gameCMD.MDM_GF_FRAME,
            subCMD: gameCMD.SUB_GF_GAME_OPTION
        });

    }




    chat(text) {
        this.webSocketSend({
            mainCMD: gameCMD.MDM_GF_FRAME,
            subCMD: gameCMD.SUB_GF_USER_CHAT,
            data: { text }
        });
    }
    //item_id, item_num,gameID
    use_item(data) {
        data = data || {}
        this.webSocketSend({
            mainCMD: gameCMD.MDM_GF_FRAME,
            subCMD: gameCMD.SUB_GF_USE_ITEM,
            data
        });
    }


    //解散游戏 
    dismissGame(gotoHall = true) {
        this._gotoHall = gotoHall
        console.log("Exit the game")//退出游戏
        UIHelper.showWaitLayer(true, "Exit the game")//正在退出游戏
        NetHelp.userStandUp() //发送站起消息 
    }

    //手动重连 
    reconnect() {

        let now = Date.now()
        if (now > this.lastRecenectTime + 5 * 1000) {
            this.lastRecenectTime = now
            UIHelper.showWaitLayer(true, "正在手动重连")
            NetHelp.loginByUserID()
        }
        else {
            UIHelper.showTips("请求重连太频繁,请稍后再试")
        }

    }

    gotoHall() {
        console.error("Go hall hotupdate");//前往大厅
        cc.audioEngine.stopAll();
        this.removeGameSink()
        cc.sys.garbageCollect()
        UIHelper.showWaitLayer(true,  "Back hall ")//返回大厅
        cc.director.preloadScene("hall_cup", () => {
            UIHelper.showWaitLayer(false)
            cc.director.loadScene("hall_cup");
        })

    }


    private createGameSink(moduleEnName) {
        console.log("Add Game", moduleEnName);//添加游戏钩子
        let subgameSinkName = moduleEnName + "GameSink"
        var subgameNode = new cc.Node("GameSink");
        cc.find("forever").addChild(subgameNode)
        var subgameScript = subgameNode.addComponent(subgameSinkName); //动态添加一个脚本        
        window.GameSink = subgameScript ////游戏钩子 设置
    }
    private removeGameSink() {
        console.log("Delete Game");//删除游戏钩子
        this.clientReady = false;//先不触发任何东西 不然有可能会进
        GameSink.node.destroy() //删除钩子 
        window.GameSink = null ////游戏钩子 设置
    }


    /**
    * 用户命令函数
    * @param subCMD
    * @param data
    * @returns {boolean}
    */
    private onSocketMainUser(subCMD, data) {
        //console.log("onSocketMainUser", subCMD, data)
        switch (subCMD) {
            case gameCMD.SUB_GR_USER_ENTER:
                this.onUserEnter(data);
                return true;
            case gameCMD.SUB_GR_USER_STATUS:
                this.onSubUserStatus(data);
                return true;
            case gameCMD.SUB_GR_USER_SCORE:
                this.onSubUserScore(data);
            case gameCMD.SUB_GR_USER_ONLINE: // 用户上线/掉线:
                this.onSubUserOnline(data);
            default:
                return true;
        }
    }

    /**
    * 游戏命令函数
    * @param subCMD
    * @param data
    */
    private onSocketMainGame(subCMD, data) {

        console.log("onEventGameMessage", subCMD, data);
        this.onfire_fire("onEventGameMessage", subCMD, data);

    }

    /**
    * 框架命令函数
    * @param subCMD
    * @param data
    * @returns {boolean}
    */
    private onSocketMainFrame(subCMD, data) {
        switch (subCMD) {
            case gameCMD.SUB_GF_GAME_SCENE:
                this.clientReady = true
                console.log("onEventSceneMessage", this.gameStatus, data);
                this.onfire_fire("onEventSceneMessage", this.gameStatus, data);
                return true;

            case gameCMD.SUB_GF_GAME_STATUS:
                this.gameStatus = data["gameStatus"];
                this.onfire_fire("onUpdateGameStatusFromServer", this.gameStatus);
                return true;

            case gameCMD.SUB_GF_ROOM_INFO:
                // if (data.tableSetting) {
                //     this.tableUserData = data.tableSetting
                // }
                // if (data.dismissData) {
                //     this.dismissData = data.dismissData
                //     this.onfire_fire("onDismissStart", data.dismissData);

                // }
                // console.log("onGotRoomInfo房间信息：", data)
                // this.onfire_fire("onGotRoomInfo", subCMD, data);
                return true;


            case gameCMD.SUB_GF_USER_CHAT:
                this.onfire_fire("onNewChatMsg", data);
                return true;

            case gameCMD.SUB_GF_DISMISS_START: //解散开始 
                UIHelper.showWaitLayer(false) //这里可能正在退出 加一个这个不再遮罩
                this.onfire_fire("onDismissStart", data);
                return true;
            case gameCMD.SUB_GF_DISMISS_AGREE: //用户同意解散 
                this.onfire_fire("onUserAgreeDismiss", data);
                return true;
            case gameCMD.SUB_GF_DISMISS_END: //结束解散 
                this.onfire_fire("onDismissEnd", data);
                return true;

            case gameCMD.SUB_GF_CMD_DIALOG: //对话框通知命令 
                // this.onfire_fire("onDialogCommand", data);
                onfire.fire("onDialogCommand", data);
                return true;

            case gameCMD.SUB_GF_USE_ITEM: //使用道具 
                this.onfire_fire("onUseItem", data);
                return true;
            case gameCMD.SUB_GF_SEAT_CHANG: //座位更改
                this.onTableSeatChanged(data)

                return true;
            default:
                console.log("onEventFrameMessage", subCMD, data);
                this.onfire_fire("onEventFrameMessage", subCMD, data);
                return true;
        }
    }

    /**
    * 发送消息
    * @param mainCMD
    * @param subCMD
    * @param data
    */
    sendSocketData(mainCMD, subCMD, data) {

        var msg = { data, mainCMD, subCMD }

        this.webSocketSend(msg);
    }

    sendGameMsg(subCMD, data) {
        var msg = { mainCMD: gameCMD.MDM_GF_GAME, subCMD, data }
        this.webSocketSend(msg);
    }

    /**
    * 用户状态
    * @param data 数据
    * @returns {boolean}
    */
    private onSubUserStatus(data) {
        var userID = data["userID"];
        var tableID = data["tableID"];
        var chairID = data["chairID"];
        var userStatus = data["userStatus"];

        //console.log("onSubUserStatus 0", data)
        var userItem = this.gameUserManager.getUserByUserID(userID);
        if (userItem == null) return true;

        if (userStatus <= gameConst.US_FREE) {
            this.gameUserManager.deleteUserItem(userItem);
        } else {
            this.gameUserManager.updateUserItemStatus(userItem, {
                tableID: tableID,
                chairID: chairID,
                userStatus: userStatus
            });
            this.onfire_fire("UserStatusChanged", data);
        }

        //console.log("UserStatusChanged", data)


        return true;
    }
    /**
    * 用户分数变更
    * @param data
    */
    private onSubUserScore(data) {
        var userID = data["userID"];
        var score = data["score"];

        var userItem = this.gameUserManager.getUserByUserID(userID);
        if (userItem == null) return true;

        this.gameUserManager.updateUserItemScore(userItem, score);
    }

    /**
    * 用户上线、下线
    * @param data
    */
    private onSubUserOnline(data) {
        var chairID = data["chairID"];
        var online = data["online"];

        var userItem = this.getTableUserItem(chairID);
        if (userItem == null) return true;

        userItem.online = online;
        console.log(`玩家${userItem.nickname} online:${online}`)
        this.onfire_fire("UserOnlineOffline", data);

    }



    /**
    * 用户进入
    * @param data
    * @returns {boolean}
    */
    private onUserEnter(data) {
        var infoArray = data;
        console.log("用户进入 onUserEnter", infoArray)


        for (var i = 0; i < infoArray.length; ++i) {
            //创建玩家
            // console.log(infoArray[i])
            this.gameUserManager.createNewUserItem(infoArray[i]);
        }
    }

    /**
    * 切换视图椅子
    * @param chairID
    */
    switchViewChairID(chairID, chairCount = 4) {

        var viewChairID = Math.floor((chairID + chairCount * 3 / 2 - this.myUserItem.getChairID()) % chairCount);
        return viewChairID;
    }


    /**
    * 获取自己椅子ID
    * @returns {*}
    */
    getMeChairID() {
        return this.myUserItem.getChairID();
    }

    /**
    * 获取自己
    * @returns {null}
    */
    getMeUserItem() {
        return this.myUserItem;
    }

    /**
    * 获取座位玩家
    * @param chairID
    * @returns {*}
    */
    getTableUserItem(chairID) {
        return this.gameUserManager.getTableUserItem(chairID);
    }

    //获取在场玩家数量
    getTableUserItemCount() {
        return this.gameUserManager.getTableUserItemCount();
    }



    /**
    * 通过UserID获取用户
    * @param userID
    * @returns {*}
    */
    getUserByUserID(userID) {

        return this.gameUserManager.getUserByUserID(userID);
    }

    /**
    * 通过游戏ID获取用户
    */
    getUserByGameID(gameID) {

        return this.gameUserManager.getUserByGameID(gameID);
    }

    /**
    * 发送准备
    * @returns {boolean}
    */
    sendUserReady() {
        this.webSocketSend({
            mainCMD: gameCMD.MDM_GF_FRAME,
            subCMD: gameCMD.SUB_GF_USER_READY
        });
        return true;
    }


    /**
    *用户信息变化处理
    */



    /**
    * 玩家激活
    * @param userItem
    * @returns {boolean}
    */
    private onUserItemActive(userItem) {
        //cc.log("onEventUserEnter", userItem.nickname, userItem.userID);

        this.onfire_fire("onEventUserEnter", userItem);


    }

    /**
    * 玩家删除
    * @param userItem
    * @returns {boolean}
    */
    private onUserItemDelete(userItem) {
        if (userItem == null) {
            return false;
        }

        cc.log("onUserItem Delete");
        cc.log("onEventUserLeave", userItem);
        this.onfire_fire("onEventUserLeave", userItem);
    }

    /**
    * 分数更新
    * @param userItem
    * @param scoreInfo
    * @returns {boolean}
    */
    private onUserItemUpdateScore(userItem, scoreInfo) {
        if (userItem == null) {
            return false;
        }
        cc.log("onEventUserScore",userItem,scoreInfo, userItem.nickname, userItem.userID);
        this.onfire_fire("onEventUserScore", userItem);

    }

    /**
    * 状态更新
    * @param userItem
    * @param statusInfo
    * @returns {boolean}
    */
    private onUserItemUpdateStatus(userItem, statusInfo) {
        // cc.log("onEventUserStatus", userItem.nickname, userItem.userID);
        this.onfire_fire("onEventUserStatus", userItem);
    }

    /**
    * 自己进入
    * @param userItem
    * @returns {boolean}
    */
    private onEventSelfEnter(userItem) {
        cc.log("onEventSelfEnter", userItem.nickname, userItem.userID);
        this.onfire_fire("onEventSelfEnter", userItem);
    }

    /**
    * 获取游戏配置
    * @returns {null}
    */
    getGameConfig() {
        return this.gameConfig;
    }


    replay(replayCode, chairID = 0) {
        UIHelper.showWaitLayer(true, "正在加载回放数据")
        let localReplayData = this.getLocalReplayData()
        //本地有缓存 就不用请求网路
        if (localReplayData[replayCode]) {
            console.error("本地有数据 开始回放", replayCode)
            this.replayWithData(replayCode, localReplayData[replayCode], chairID)
        }
        else {
            NetHelp.getReplayData(replayCode, (retData) => {
                let { code, info } = JSON.parse(retData)
                if (code == 0) {
                    let dbRecord = info
                    console.error("成功 开始回放", replayCode)
                    this.saveReplay(replayCode, dbRecord)
                    this.replayWithData(replayCode, dbRecord, chairID)
                }
                else {
                    UIHelper.showTips(info)
                    UIHelper.showWaitLayer(false)
                }

            })

        }



    }
    //查看本地是否有该录像
    private getLocalReplayData() {
        let localReplayData = cc.sys.localStorage.getItem("replay")
        if (localReplayData) {
            return JSON.parse(localReplayData)
        }
        return {}
    }

    private saveReplay(replayCode: string, data) {
        let localReplayData = this.getLocalReplayData()
        let objKeys = Object.keys(localReplayData)
        //超过10条删除
        if (objKeys.length > 6) {
            delete localReplayData[objKeys[0]]
        }
        localReplayData[replayCode] = data

        cc.sys.localStorage.setItem("replay", JSON.stringify(localReplayData))

    }

    private replayWithData(replayCode, dbRecord, chairID = 0) {
        let { moduleEnName } = dbRecord
        let players = JSON.parse(dbRecord.players)
        let tableSetting = JSON.parse(dbRecord.tableSetting)
        let cmdRecords = JSON.parse(dbRecord.json)

        this.do_replay(moduleEnName, players, tableSetting, replayCode, cmdRecords, chairID)
    }

    private do_replay(moduleEnName, players, tableSetting, replayCode, cmdRecords, chairID = 0) {
        if (moduleEnName) {
            this.isReplay = true
            this.reset()
            KernelData.moduleEnName = moduleEnName
            this.initReplayData(players, tableSetting, replayCode, cmdRecords, chairID)
        }
    }

    isReplayGame() {
        return this.isReplay
    }

    private initReplayData(userInfo, tableSetting, replayCode, cmdRecords, chairID) {
        if (userInfo && userInfo.length > 0) {
            this.isReplay = true
            this.replayData = { replayCode, Record: cmdRecords }

            let replayChairID = chairID
            console.log('------------- replayChairID', replayChairID);

            let playerInfo = userInfo[0]
            for (var i = 0; i < userInfo.length; i++) {
                let info = userInfo[i]
                if (!info.userID) { //userID可能不存在 就用gameID
                    info.userID = info.gameID
                }
                if (replayChairID == info.chairID) {
                    playerInfo = info
                    break
                }

            }
            let userID = playerInfo.userID
            this.onSocketMainLogon(gameCMD.SUB_GR_LOGON_SUCCESS, { userID, userInfo, tableSetting }) //登录成功 开始跳转游戏
            return
        }
    }

    private checkIsReplay() {
        if (this.isReplay) {
            //回放直接触发
            console.log("直接触发", this.tableSetting)
            // this.onfire_fire("onGotRoomInfo", 1, { tableSetting: this.tableSetting });
            this.clientReady = true //回放直接是准备好不需要再发消息

            //延迟触发
            setTimeout(() => {
                this.onfire_fire("replay", this.replayData);
            }, 0.5);

        }

    }

    private onTableSeatChanged(data) {
        const { newChair = [] } = data || {}
        if (newChair && newChair.length > 0) {
            let oldChairID = KernelData.chairID //老座位
            this.gameUserManager.resetChiar(newChair)
            this.myUserItem = this.gameUserManager.getUserByUserID(this.myUserID);
            KernelData.chairID = this.myUserItem.chairID
            data.oldChairID = oldChairID
            this.onfire_fire("onTableSeatChanged", data); //    data {newChair: [3,2,0,1] ,oldChairID:2 } 3号跑到0座位  2跑到1号座位
        }

    }
    /**
    * 获取是否旁观玩家
    * @param chairID 椅子号，如果不传，默认是KernelData.chairID
    */
    getIsWatcher(chairID) {
        let id = chairID || KernelData.chairID;
        return id == 0xFFFF;
    }


    private onfire_fire(...args) {
        if (this.clientReady) {
            onfire.fireSync(...args)
        }
    }


}