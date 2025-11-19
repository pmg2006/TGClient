import {Singleton} from "./Singleton";
import {GameUserManager} from "./GameUserManager";
import {ClientUserItem} from "./ClientUserItem";
import NetUtil from "./NetUtil";
import {msgReceive, msgRouter} from "./ConstDefine";
import {DATA_GAME_MSG, DATA_SITDOWN} from "./MsgDefine";
import {PlazNetKernel} from "./PlazNetKernel";
import { gameCMD, gameConst } from ".././KernelDefine";
// var KernelDefine = require('KernelDefine');
// var gameCMD = KernelDefine.gameCMD;
// var gameConst = KernelDefine.gameConst;
export  class  SGNetKernel extends  Singleton{

    gameUserManager:GameUserManager = null;
    myUserItem: ClientUserItem = null;
    myUserID: number = null;
    clientReady: boolean = false; //客户端是否准备好，当成功触发onReady后， 就会重置为false， 防止重复触发
    tableSetting:any = null; //桌子信息
    dismissData:any = null;//解散信息
    passWord:any = null;//密碼
    gameStatus:any  = null;//游戏状态
    isReplay:boolean =  false;//是否回放
    replayData:any =  null;//回放数据
    constructor(){
        super();
        NetUtil.on(msgReceive.UserSitdown,this.onSitDwon,this);
        NetUtil.on(msgReceive.OnGame,this.OnGame,this);
        NetUtil.on(msgReceive.eRoute_Leave,this.onLeave,this);
        this.gameUserManager = new GameUserManager();
        this.gameUserManager.init(this);
    }
    onLeave(data: { goHall: boolean }) {
        UIHelper.showWaitLayer(false);
        if (!data.goHall) {
            return;
        }
        this.gotoHall();
    }
    reset () {
        this.clientReady = false
        this.gameUserManager.clearAllUserItem()
    }
    //用户坐下
    onSitDwon(data:{data:DATA_SITDOWN}){
        console.error("用户坐下成功 -- ",data.data);
        this.gotoSubgame2();
    }
    getTableUserData () {
        console.error("getTableUserData 这个不再使用,已更名为 getTableSetting")
        return this.getTableSetting()
    }
    //获取在场玩家数量
    getTableUserItemCount() {
        return this.gameUserManager.getTableUserItemCount();
    }
    gotoSubgame2() {
        UIHelper.showWaitLayer(true, "LoginGame...")
        this.reset()
        this.clientReady = false
        this.isReplay = false
        this.login() //登录子游戏，登录成功的话回调onLogonSuccess
    }
    //子游戏消息
    OnGame(data:DATA_GAME_MSG){
        let idMsgMain: number = data.mainCMD;
        let idMsgSub: number = data.subCMD;
        switch (idMsgMain) {

            case gameCMD.MDM_GR_LOGON:
                this.onSocketMainLogon(data["subCMD"], data["data"]);
                break;
            case gameCMD.MDM_GR_USER:
                this.onSocketMainUser(data["subCMD"], data["data"]);
                break;

            case gameCMD.MDM_GF_GAME:
                this.onSocketMainGame(data["subCMD"], data["data"]);
                break;

            case gameCMD.MDM_GF_FRAME:
                this.onSocketMainFrame(data["subCMD"], data["data"]);
                break;
        }
    }
    //发送子游戏消息
    NotifyGame(mainCMD:number,subCMD:number,data:any){
        if (this.isReplay) {
            console.error("回放不发送")
            return
        }
        NetUtil.notify(msgRouter.sendSGMsg, {
                mainCMD: mainCMD,
                subCMD: subCMD,
                data: data
            }
        );
    }
    sendSocketData(mainCMD, subCMD, data){
        if (this.isReplay) {
            console.error("回放不发送")
            return
        }
        NetUtil.notify(msgRouter.sendSGMsg, {
                mainCMD: mainCMD,
                subCMD: subCMD,
                data: data
            }
        );
    }
    //发送登录子游戏
    login(){
        this.NotifyGame(gameCMD.MDM_GR_LOGON,gameCMD.SUB_GR_LOGON_ACCOUNTS,{});
    }

    //主命令
    onSocketMainLogon(subCMD, data){
        switch (subCMD) {
            //登录成功
            case gameCMD.SUB_GR_LOGON_SUCCESS:
                //登录成功就获取自己
                const { userID, gameConfig, passWord, userInfo, tableSetting, dismissData } = data
                this.myUserID = userID
                this.tableSetting = tableSetting
                this.passWord = passWord;
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
    /**
     * 用户进入
     * @param data
     * @returns {boolean}
     */
    onUserEnter(data:ClientUserItem[]) {
        var infoArray = data;
        console.log("用户进入 onUserEnter", infoArray)

        for (var i = 0; i < infoArray.length; ++i) {
            //创建玩家
            // console.log(infoArray[i])
            this.gameUserManager.createNewUserItem(infoArray[i]);
        }
    }
    /**
     * 用户命令函数
     * @param subCMD
     * @param data
     * @returns {boolean}
     */
    private  onSocketMainUser(subCMD, data) {
        // console.log("onSocketMainUser", subCMD, data)
        switch (subCMD) {
            case gameCMD.SUB_GR_USER_ENTER:
                this.onUserEnter(data);
                return true;
            case gameCMD.SUB_GR_USER_STATUS:
                this.onSubUserStatus(data);
                return true;
            case gameCMD.SUB_GR_USER_SCORE:
                this.onSubUserScore(data);
            case gameCMD.SUB_GR_USER_ONLINE: // 用户上线/掉线
                this.onSubUserOnline(data);
                return true;
            default:
                return true;
        }
    }
    /**
     * 用户状态
     * @param data 数据
     * @returns {boolean}
     */
    onSubUserStatus (data) {
        var userID = data["userID"];
        var tableID = data["tableID"];
        var chairID = data["chairID"];
        var userStatus = data["userStatus"];

        console.log("onSubUserStatus 0", data)
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
             onfire.fire("UserStatusChanged", data);
        }

        return true;
    }

    /**
     * 玩家删除
     * @param userItem
     * @returns {boolean}
     */
    onUserItemDelete (userItem) {
        if (userItem == null) {
            return false;
        }

        cc.log("onEventUserLeave", userItem);
        onfire.fire("onEventUserLeave", userItem);
    }
    //登录成功
    onLogonSuccess() {
        if (GameSink != null && cc.director.getScene().name == GameSink.gameSceneName) {
            console.log("发现在子游戏内 重新加载子游戏", GameSink.gameSceneName)
            GameSink.loadScene(GameSink.gameSceneName)
            return
        } else {
            console.log("登录成功，开始进入子游戏")
            this.createGameSink(PlazNetKernel.instance().meLoginUser.moduleEnName) //第一次进入房间
        }
    }
    createGameSink(moduleEnName) {
        console.log("添加游戏钩子", moduleEnName);
        let subgameSinkName = moduleEnName + "GameSink";
        var subgameNode = new cc.Node("GameSink");
        cc.find("forever").addChild(subgameNode);
        let subgameScript = subgameNode.addComponent(subgameSinkName); //动态添加一个脚本
        window["GameSink"] = subgameScript ////游戏钩子 设置
    }
    /**
     * 分数更新
     * @param userItem
     * @param scoreInfo
     * @returns {boolean}
     */
    onUserItemUpdateScore (userItem, scoreInfo) {
        if (userItem == null) {
            return false;
        }
        cc.log("onEventUserScore",userItem,scoreInfo, userItem.nickname, userItem.userID);
        onfire.fire("onEventUserScore", userItem);
    }
    /**
     * 用户分数变更
     * @param data
     */
    onSubUserScore (data) {
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
    onSubUserOnline(data) {
        var chairID = data["chairID"];
        var online = data["online"];

        var userItem = this.getTableUserItem(chairID);
        if (userItem == null) return true;

        userItem.online = online;
        console.log(`玩家${userItem.nickname} online:${online}`)
        onfire.fire("UserOnlineOffline", data);

    }
    /**
     * 获取座位玩家
     * @param chairID
     * @returns {*}
     */
    getTableUserItem(chairID):ClientUserItem {
        return this.gameUserManager.getTableUserItem(chairID);
    }

    /**
     * 状态更新
     * @param userItem
     * @param statusInfo
     * @returns {boolean}
     */
    onUserItemUpdateStatus (userItem, statusInfo) {
        // cc.log("onEventUserStatus", userItem.nickname, userItem.userID);
        onfire.fire("onEventUserStatus", userItem);
    }

    /**
     * 玩家激活
     * @param userItem
     * @returns {boolean}
     */
    onUserItemActive (userItem) {
        //cc.log("onEventUserEnter", userItem.nickname, userItem.userID);
        if (this.clientReady) {
            onfire.fire("onEventUserEnter", userItem);
        }
    }

    /**
     * 框架命令函数
     * @param subCMD
     * @param data
     * @returns {boolean}
     */
    onSocketMainFrame (subCMD, data) {
        switch (subCMD) {
            case gameCMD.SUB_GF_GAME_SCENE:
                this.clientReady = true;
                console.log("onEventSceneMessage", this.gameStatus, data);
                onfire.fire("onEventSceneMessage", this.gameStatus, data);
                return true;

            case gameCMD.SUB_GF_GAME_STATUS:
                this.gameStatus = data["gameStatus"];
                onfire.fire("onUpdateGameStatusFromServer", this.gameStatus);
                return true;

            case gameCMD.SUB_GF_ROOM_INFO:
                // if (data.tableSetting) {
                //     this.tableUserData = data.tableSetting
                // }
                // if (data.dismissData) {
                //     this.dismissData = data.dismissData
                //     onfire.fire("onDismissStart", data.dismissData);

                // }
                // console.log("onGotRoomInfo房间信息：", data)
                // onfire.fire("onGotRoomInfo", subCMD, data);
                return true;


            case gameCMD.SUB_GF_USER_CHAT:
                onfire.fire("onNewChatMsg", data);
                return true;

            case gameCMD.SUB_GF_DISMISS_START: //解散开始
                // UIHelper.showWaitLayer(false) //这里可能正在退出 加一个这个不再遮罩
                onfire.fire("onDismissStart", data);
                return true;
            case gameCMD.SUB_GF_DISMISS_AGREE: //用户同意解散
                onfire.fire("onUserAgreeDismiss", data);
                return true;
            case gameCMD.SUB_GF_DISMISS_END: //结束解散
                onfire.fire("onDismissEnd", data);
                return true;

            case gameCMD.SUB_GF_CMD_DIALOG: //对话框通知命令
                onfire.fire("onDialogCommand", data);
                return true;

            case gameCMD.SUB_GF_USE_ITEM: //使用道具
                onfire.fire("onUseItem", data);
                return true;
            case gameCMD.SUB_GF_COST_TICK: //扣除门票
                onfire.fire("onCostTick", data);
                return true;
            case gameCMD.SUB_GF_SEAT_CHANG: //座位更改
                this.onTableSeatChanged(data)

                return true;
            case gameCMD.SUB_GF_TIPS: //提示消息
                UIHelper.showTips(data.msg);

                return true;
            default:
                console.log("onEventFrameMessage", subCMD, data);
                onfire.fire("onEventFrameMessage", subCMD, data);
                return true;
        }
    }

    //位置变更
    onTableSeatChanged (data) {
        let { newChair } = data || [];
        if (newChair && newChair.length > 0) {
            let oldChairID = PlazNetKernel.instance().meLoginUser.chairID //老座位
            this.gameUserManager.resetChiar(newChair)
            this.myUserItem = this.gameUserManager.getUserByUserID(this.myUserID);
            PlazNetKernel.instance().meLoginUser.chairID = this.myUserItem.chairID
            data.oldChairID = oldChairID
            onfire.fire("onTableSeatChanged", data); //    data {newChair: [3,2,0,1] ,oldChairID:2 } 3号跑到0座位  2跑到1号座位
        }

    }

    /**
     * 游戏命令函数
     * @param subCMD
     * @param data
     */
    onSocketMainGame(subCMD, data) {

        console.log("onEventGameMessage", subCMD, data);
        if (this.clientReady) {
            onfire.fire("onEventGameMessage", subCMD, data);
        }
    }
    /**
     * 发送准备
     * @returns {boolean}
     */
    sendUserReady () {
        this.NotifyGame( gameCMD.MDM_GF_FRAME,gameCMD.SUB_GF_USER_READY,{})
        return true;
    }
    sendGameMsg(cmd:number,data:any){
        this.NotifyGame(gameCMD.MDM_GF_GAME,cmd,data);
    }
    getTableSetting() {
        return this.tableSetting
    }

    //解散游戏
    dismissGame(){
        PlazNetKernel.instance().StandUp()
    }
    gotoHall() {
        console.error("Go hall hotupdate hall_cup");//前往大厅
        cc.audioEngine.stopAll();
        this.removeGameSink()
        cc.sys.garbageCollect()
        UIHelper.showWaitLayer(true, "Back hall ")//返回大厅
        cc.director.preloadScene("hall_cup", () => {
            UIHelper.showWaitLayer(false)
            if(cc.director.getScene().name !== "hall_cup") {
                cc.director.loadScene("hall_cup");
            }
        }) 
        /*  cc.director.preloadScene("hall_cup", () => {
            UIHelper.showWaitLayer(false)
            if(cc.director.getScene().name !== "hall_cup") {
                cc.director.loadScene("hall_cup");
            }
        })  */
    }
    removeGameSink() {
        console.log("Delete Game");//删除游戏钩子
        this.reset();
        if(GameSink && GameSink.node){
            GameSink.node.destroy() //删除钩子
        }
        window["GameSink"] = null ////游戏钩子 设置
    }
    /**
     * 获取是否旁观玩家
     * @param chairID 椅子号，如果不传，默认是KernelData.chairID
     */
    getIsWatcher(chairID) {
        let id = chairID || PlazNetKernel.instance().meLoginUser.chairID;
        return id == 0xFFFF;
    }
    onClientReady() {
        if(!this.checkIsReplay()){
            this.onReady();
        }
    }
    onReady() {
        //获取场景游戏信息
        this.NotifyGame(gameCMD.MDM_GF_FRAME,gameCMD.SUB_GF_GAME_OPTION,{})
    }
    getDismissData(){

    }
    getMeChairID(){
        return this.myUserItem.getChairID();
    }
    getMeUserItem() {
        return this.myUserItem;
    }
    //item_id, item_num,gameID
    //使用道具
    use_item(data){
        data = data || {};
        this.NotifyGame(gameCMD.MDM_GF_FRAME, gameCMD.SUB_GF_USE_ITEM, data);
    }
    //聊天
    chat (text) {
        this.NotifyGame( gameCMD.MDM_GF_FRAME,gameCMD.SUB_GF_USER_CHAT,{text})
        // this.sendGameMsg(gameCMD.SUB_GF_USER_CHAT, {text});
    }
    checkIsReplay () {
        if (this.isReplay) {
            //回放直接触发
            console.log("直接触发", this.tableSetting)
            onfire.fire("replay", this.replayData);
            return true;
        }
        return false;
    }
    isReplayGame () {
        return this.isReplay
    }
    initReplayData  (userInfo, tableSetting, cmdRecords, chairID) {
        if (userInfo && userInfo.length > 0) {
            this.isReplay = true
            this.replayData = { Record: cmdRecords }

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
    //回放
    replay (replayCode, chairID = 0) {
        UIHelper.showWaitLayer(true, "正在加载回放数据")
        PlazNetKernel.instance().getReplayData(replayCode, (retData) => {
            let { code, data ,errStr} = retData;
            if (code == 0) {
                let dbRecord = data;
                console.error("成功 开始回放", replayCode)
                this.replayWithData(dbRecord,chairID)
            }
            else {
                UIHelper.showTips(errStr)
                UIHelper.showWaitLayer(false)
            }

        })
    }
    replayWithData (dbRecord, chairID = 0) {
        let { moduleEnName } = dbRecord
        let players =  dbRecord.players
        let tableSetting = dbRecord.tableSetting
        let cmdRecords = dbRecord.json
        if(typeof  players === "string"){
            players = dbRecord.players
        }
        if(typeof  tableSetting === "string"){
            tableSetting = dbRecord.tableSetting
        }
        if(typeof  cmdRecords === "string"){
            cmdRecords = dbRecord.json
        }
        this.do_replay(moduleEnName, players, tableSetting, cmdRecords, chairID)
    }
    do_replay (moduleEnName, players, tableSetting, cmdRecords, chairID = 0) {
        if (moduleEnName) {
            this.isReplay = true
            this.reset();
            PlazNetKernel.instance().meLoginUser.moduleEnName = moduleEnName;
            this.initReplayData(players, tableSetting, cmdRecords, chairID)
        }
    }
}