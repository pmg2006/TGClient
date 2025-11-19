import { i18nMgr } from "../i18n/i18nMgr";
import { CommandDefine, TABLE_INFO, CLUB_INFO } from "./CommandDefine";

import { KernelData } from "./KernelData";

const { ccclass, property } = cc._decorator;


@ccclass
export default class SocketHandler {
    bindObj = []
    connecorTimer = null

    //是否正在重练
    isOnReconnent = false;

    constructor() {
        //重连相关
        this.bindObj.push(onfire.on("onReconnect", this.onReconnect.bind(this)));
        this.bindObj.push(onfire.on("onConnect", this.onConnect.bind(this)));
        this.bindObj.push(onfire.on("onDisconnect", this.onDisconnect.bind(this)));
        this.bindObj.push(onfire.on("onConnectSucceed", this.onConnectSucceed.bind(this)));
    }

    //重练后的消息回调，不论是否有callback都会触发
    onConnectSucceed() {
        console.log("onConnectSucceed");
        //如果是重练的，转发一个重练成功的消息
        if (this.isOnReconnent) {
            console.log("onDisconnectSucceed");
            onfire.fire("onDisconnectSucceed")
        }
    }

    //重练失败,断开连接
    onDisconnect() {
        this.isOnReconnent = false;
    }


    onMsg(submsg, data) {
        this.onCommand(submsg, data)
    };

    onCommand(submsg, returnData, reqData?) {
        let cmd_str = CommandDefine[submsg]
        if (KernelData.socketLog) {
            console.error("收到消息", cmd_str, returnData)
        }
        switch (submsg) {
            case CommandDefine.C_LOGIN:
                this.C_LOGIN(returnData)
                break
            case CommandDefine.C_LOGIN_BY_USER_ID:
                this.C_LOGIN_BY_USER_ID(returnData)
                break

            case CommandDefine.S_USER_KICK_OUT:
                this.S_USER_KICK_OUT(returnData)
                break
            case CommandDefine.S_USER_SITDOWN:
                this.S_USER_SITDOWN(returnData)
                break
            case CommandDefine.S_USER_STANDUP:
                this.S_USER_STANDUP(returnData)
                break
            case CommandDefine.S_CLUB_CHANGED://俱乐部变更通知
                this.S_CLUB_CHANGED(returnData)
                break
            case CommandDefine.S_CLUB_BAOX_CHANGED://包厢变更通知
                this.S_CLUB_BAOX_CHANGED(returnData)
                break

            case CommandDefine.C_GAME_SERVER_MSG: //子游戏消息
                this.onSubgameMsg(returnData)
                break

            case CommandDefine.C_CLUB_DETAIL: //俱乐部详情
                this.C_CLUB_DETAIL(returnData, reqData)
                break

            // case CommandDefine.C_CLUB_DEL: //俱乐部创建
            //     this.C_CLUB_DEL(returnData)
            //     break

            // case CommandDefine.C_BOX_CREATE: //创建包厢{clubID,config}
            //     this.C_BOX_CREATE(returnData, reqData)
            //     break
            // case CommandDefine.C_BOX_DEL: //删除包厢{clubID,baoxID}
            //     this.C_BOX_DEL(returnData, reqData)
            //     break
            // case CommandDefine.C_BOX_MODIFY: //
            //     this.C_BOX_MODIFY(returnData, reqData)
            //     break

            case CommandDefine.C_CLUB_MY: //我的俱乐部
                this.C_CLUB_MY(returnData)
                break
            case CommandDefine.S_CLUB_TABLE_CHANGED: //俱乐部桌子发生变化
                this.onClubTableChanged(returnData)
                break
            case CommandDefine.S_USER_PROP_CHANGED: //玩家属性变化
                this.onUserPropChanged(returnData)
                break

            case CommandDefine.C_BIND_PHONE: //我的俱乐部
                this.C_BIND_PHONE(returnData, reqData)
                break

            case CommandDefine.S_BROADCAST: //广播
                this.S_BROADCAST(returnData)
                break
            default:
                break;
        }

        onfire.fire(cmd_str, returnData, reqData)
    };

    onReconnect(reconnect_count) {
        if (!this.connecorTimer) {
            this.connecorTimer = setTimeout(() => {
                this.isOnReconnent = false;
                this.doDisconnect(i18nMgr._getLabel("Connection timeout, connection disconnected", []))
            }, 30 * 1000)
        }
        this.isOnReconnent = true;
        UIHelper.showWaitLayer(true, `Reconnecting(${reconnect_count})`)
    }

    onConnect() {
        this.connecorTimer && clearTimeout(this.connecorTimer) //
        this.connecorTimer = null
        NetHelp.loginByUserID()
        UIHelper.showWaitLayer(false)
    }

    private doDisconnect(text) {
        UIHelper.showWaitLayer(false)
        NetHelp.disconnect()
        UIHelper.MessageBox(text, () => {
            cc.director.loadScene("login")
        })
    }


    private S_USER_KICK_OUT(data) {

        this.doDisconnect(data.reason)

    }

    private C_LOGIN_BY_USER_ID(data) {
        let { code, info } = data;
        if (KernelData.socketLog)
            console.error("登录返回", code, info)
        if (code == 0) {
            const { roomID, moduleEnName } = info
            KernelData.roomID = roomID
            if (KernelData.roomID) {
                if (moduleEnName) {
                    KernelData.moduleEnName = moduleEnName
                }

                clientKernel.sendLogonMsg() //登录
            }
            UIHelper.showWaitLayer(false)

            //如果是重练的，转发一个重练成功的消息
            if (this.isOnReconnent) {
                this.isOnReconnent = false;
                onfire.fire("onReconnectLoginSucceed")
            }
        } else {
            this.doDisconnect("登录已过期 请重新登录")
        }
    }


    private C_LOGIN(data) {
        let { code, info } = data;
        if (KernelData.socketLog)
            console.error("登录返回", code, info)
        if (code == 0) {
            const { account, nickname, uuid, score, head, bankScore, password, roomID, gameID, userID, diamond, openid, phone } = info
            KernelData.userID = userID
            KernelData.gameID = gameID
            KernelData.nickname = nickname
            KernelData.password = password
            KernelData.uuid = uuid
            KernelData.score = score
            KernelData.bankScore = bankScore || 0
            KernelData.head = head
            KernelData.diamond = diamond
            KernelData.phone = phone

            if (roomID) {
                KernelData.chairID = info.chairID;
                KernelData.tableID = info.tableID;
                KernelData.roomID = info.roomID;
                KernelData.moduleEnName = info.moduleEnName;
            }
            if (openid) {
                KernelData.openid = openid
                cc.sys.localStorage.setItem("openid", openid);
            }
            cc.sys.localStorage.setItem("account", account);
            cc.sys.localStorage.setItem("password", password);

        }

    }

    private S_USER_SITDOWN(data) {
        cc.log("onUserSitdown", JSON.stringify(data));
        let { moduleEnName, roomID } = data

        KernelData.roomID = roomID;
        clientKernel.gotoSubgame2(moduleEnName)


    }

    private S_USER_STANDUP(retData) {
        UIHelper.showWaitLayer(false)
        let { code, info } = retData
        if (code == 0) {
            let round = info.round || 0
            if (KernelData.socketLog)
                console.error("onUserStandUp, round:", round)

            if (info && info.chairID && info.chairID == 0xFFFF) { //旁观的人 直接去大厅
                console.log("旁观的人 直接去大厅");
                return clientKernel.gotoHall();//去大厅
            }

            //@ts-ignore
            if (clientKernel.getIsWatcher() || (!cc.isResulting && round == 0)) { //游戏未开始 直接去大厅
                console.log("游戏未开始 直接去大厅");
                clientKernel.gotoHall();//去大厅
            }
        }
    }

    private S_CLUB_BAOX_CHANGED(retData) {
        let { clubID, baoxID, data } = retData
        let club: CLUB_INFO = KernelData.clubData[clubID]
        if (club) {
            let baoxInfoArray = club.baoxInfoArray
            for (let index = 0; index < baoxInfoArray.length; index++) {
                const baoxInfo = baoxInfoArray[index];
                if (baoxInfo.baoxID == baoxID) {
                    baoxInfoArray.splice(index, 1) //删掉
                    break
                }
            }
            if (data) {
                baoxInfoArray.push(data)
            }
        }

    }
    private S_CLUB_CHANGED(retData) {
        let { clubID, data } = retData
        //删除
        if (data == null) {
            delete KernelData.clubData[clubID]
        }
        else {
            let oldData = KernelData.clubData[clubID] || {}
            //@ts-ignore
            let club = Object.assign(oldData, data) //修正
            KernelData.clubData[clubID] = club
            if (!club.tableMap) club.tableMap = {};
            if (!club.baoxInfoArray) club.baoxInfoArray = [];

        }

    }




    onSubgameMsg(retData) {
        onfire.fire("gamemsg", retData)
    }


    private C_CLUB_MY(retData) {
        let { code, info } = retData
        if (code == 0) {
            KernelData.clubData = {}
            this.refreshClub(info)
        }
    }


    private C_CLUB_DETAIL(returnData, reqData) {
        const { code, info } = returnData
        if (code == 0) // 成功
        {
            const { clubID } = reqData
            const { baoxInfoArray, tableInfoArray, notice, enableTime, } = info
            for (let index = 0; index < tableInfoArray.length; index++) {
                const tableInfo = tableInfoArray[index];
                this.onClubTableChanged(tableInfo)
            }

            let club: CLUB_INFO = KernelData.clubData[clubID]
            if (club) {
                club.baoxInfoArray = baoxInfoArray
                club.notice = notice
                club.enableTime = enableTime

                if (!club.tableMap) club.tableMap = {};
                if (!club.baoxInfoArray) club.baoxInfoArray = [];
            }

        }

    }


    private refreshClub(clubArray: CLUB_INFO[]) {
        for (let index = 0; index < clubArray.length; index++) {
            const club = clubArray[index];
            club.baoxInfoArray = []
            club.tableMap = {}
            KernelData.clubData[club.clubID] = club
        }

    }

    private refreshBaox(clubID: number, baoxArray) {
        let club: CLUB_INFO = KernelData.clubData[clubID]
        if (club) {
            club.baoxInfoArray = baoxArray
        }
    }

    private C_CLUB_CREATE(data) {
        const { code, info } = data
        if (code == 0) // 创建成功
        {
            this.refreshClub([info])
        }
    }
    private C_CLUB_DEL(data) {
        const { code, info } = data
        if (code == 0) // 创建成功
        {
            this.refreshClub([info])
        }
    }


    private C_BOX_CREATE(retData, reqData) {
        const { code, info } = retData
        if (code == 0) // 创建成功
        {
            let { clubID } = reqData
            this.refreshBaox(clubID, info)
        }
    }

    private C_BOX_DEL(retData, reqData) {
        const { code, info } = retData
        if (code == 0) {
            let { clubID } = reqData
            this.refreshBaox(clubID, info)
        }
    }

    private C_BOX_MODIFY(retData, reqData) {
        const { code, info } = retData
        if (code == 0) // 创建成功
        {
            let { clubID } = reqData
            this.refreshBaox(clubID, info)
        }
    }



    private C_CLUB_LEAVE(data) {
        const { code, info } = data
        if (code == 0) // 成功
        {
            const { clubID } = info
            delete KernelData.clubData[clubID]
        }
    }

    private onClubTableChanged(tableInfo: TABLE_INFO) {
        const { players, tableSetting = {} } = tableInfo
        if (players && players.length > 0) {
            let { clubID, roomCode = 0, round = 0 } = tableSetting
            if (roomCode) {
                tableInfo.round = round  //设置局数
                KernelData.tables[roomCode] = tableInfo
                if (clubID) {
                    let club: CLUB_INFO = KernelData.clubData[clubID]
                    if (club) {
                        club.tableMap[roomCode] = tableInfo
                    }
                }
            } else {
                console.error("房号错误！")
            }

        } else { //删除桌子
            let { clubID, roomCode } = tableSetting
            if (roomCode) {
                if (clubID) { //俱乐部桌子
                    let club: CLUB_INFO = KernelData.clubData[clubID]
                    if (club && club.tableMap[roomCode]) {
                        delete club.tableMap[roomCode]
                    }
                }
                delete KernelData.tables[roomCode]
            } else {
                console.error("房号错误！")
            }


        }
    }

    /**
     *用户状态发生变化 
     *
     * @param {*} changeKv  {diamond:2,score:10000}
     */
    private onUserPropChanged(changeKv: any) {
        let kv = changeKv || {}
        for (const k in kv) {
            if (KernelData[k] != null) {
                KernelData[k] = kv[k]
            }
        }
    }

    private C_BIND_PHONE(retData, reqData) {
        let { code } = retData
        if (code == 0) {
            const { phone } = reqData
            KernelData.phone = phone
        }
    }
    /**
     * 广播
     *
     * @param {*} retData
     */
    private S_BROADCAST(retData) {
        let { text } = retData
        console.log("收到广播消息", text)
    }



}
