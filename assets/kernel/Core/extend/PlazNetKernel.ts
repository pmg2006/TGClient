import { Singleton } from "./Singleton";
import { User } from "./User";
import NetUtil from "./NetUtil";
import * as ConstDefine from "./ConstDefine";
import { CONNECTION_CONFIG, EM_LOGINTYPE, msgRouter, Server_RES } from "./ConstDefine";
import { DATA_GAME_LIST, DATA_SITDOWN } from "./MsgDefine";
import { msgReceive } from "./ConstDefine";
import {
    CLUB_INFO,
    CommandDefine, GAME_DETAIL_PLAYER_INFO,
    GAME_RESULT,
    GAME_RESULT_PLAYER_INFO, IGameDetail, IModifyBaox, IModifyBaoxUser,
    IModifyClub, ITaxInfoData,
    TABLE_INFO
} from "../CommandDefine";
import { SGNetKernel } from "./SGNetKernel";
import { ERRORCODE } from "./errorCode";
import { i18nMgr } from "../../i18n/i18nMgr";
import { GameData } from "../../../main/script/GameData";
import Utils, { KWAI_EVENT_TYPES } from "./Utils";

export class PlazNetKernel extends Singleton {
    meLoginUser: User = null;//用户信息
    gamelistData: DATA_GAME_LIST; //游戏列表信息
    bReconnect: boolean = false;

    intervalTime: number = 180;//倒计时时间
    isInterval: boolean = false;//是否在倒计时

    firstNotice: boolean = true;//第一次进入弹窗

    constructor() {
        super();
        NetUtil.on("close", this.onclose, this);
        NetUtil.on("reconnect", this.reconnect, this);
        NetUtil.on("reconnectFail", this.reconnectFail, this);
        NetUtil.on(msgReceive.UserSitdown, this.onSitDwon, this);
        NetUtil.on(msgReceive.eRoute_Attr, this.onAttr, this);
        NetUtil.on(msgReceive.eRoute_Club, this.onClub, this);
        NetUtil.on(msgReceive.eRoute_OtherLogin, this.OtherLogin, this);
        NetUtil.on(msgReceive.eRoute_RechargeSuccess, this.OnRechargeSuccess, this);
        NetUtil.on("onAnnouncement", this.onAnnouncement, this);
        NetUtil.on(msgReceive.eRoute_Manghe, this.onMangHe, this);
        console.error("Hall initialize")//初始化大厅 ===== 
        this.meLoginUser = new User();
    }

    //倒计时
    countDown() {
        if (this.isInterval) return;
        this.isInterval = true;
        let timerCb = () => {
            this.intervalTime--;
            onfire.fire("countDown", this.intervalTime);
            if (this.intervalTime <= 0) {
                clearInterval(timer);
                this.isInterval = false;
                this.intervalTime = 180;
            }
        }
        onfire.fire("countDown", this.intervalTime);
        let timer = setInterval(timerCb, 1000);
    }

    //玩家属性变更
    onAttr(data) {
        console.log("=onAttr==data===", data)
        this.meLoginUser.setInfo(data);
        if ("score" in data) {
            KernelData.score = data.score;
        }
        if ("withdrawAbleScore" in data) {
            KernelData.withdrawAbleScore = data.withdrawAbleScore;
        }
        onfire.fire("S_USER_PROP_CHANGED", data);
    }

    // 其他地方登录了
    OtherLogin(data) {
        console.log("Received login from another location", data);

        // 断开连接
        this.disConnect(true);
        UIHelper.MessageBox(i18nMgr._getLabel("OtherLogin", []), () => {
            cc.director.loadScene("hotupdate")
        })
    }

    OnRechargeSuccess(data) {
        console.log("OnRechargeSuccess", data);
        let { payAmount, transactionId } = data;

        let url = CONNECTION_CONFIG.yanzhengAddr + ConstDefine.SUBMIT_LOGS;
        let msg = {
            userID: KernelData.userID,
            msg: "PaySuccess " + JSON.stringify(data),
        };
        Utils.httpRequest(url, 'POST', msg);

        try {
            //Utils.Instance.AdjustTraceRevenue(Utils.Instance.getAdjustEvent().PaySuccess, payAmount, transactionId);
            Utils.Instance.AdjustEvent(Utils.Instance.getAdjustEvent().PaySuccess, payAmount);
        } catch (e) {
            if (e instanceof TypeError) {
                console.error("TypeError encountered in AdjustEvent: ", e);
            } else {
                throw e;
            }
        }
        try {
            Utils.Instance.sendKwaiEvent(KWAI_EVENT_TYPES.EVENT_PURCHASE);
        } catch (e) {
            if (e instanceof TypeError) {
                console.error("TypeError encountered in sendKwaiEvent: ", e);
            } else {
                throw e;
            }
        }
        try {
            Utils.Instance.FBTrace("PaySuccess");
        } catch (e) {
            if (e instanceof TypeError) {
                console.error("TypeError encountered in FBTrace: ", e);
            } else {
                throw e;
            }
        }
    }

    //盲合
    onMangHe(data) {
        onfire.fire("S_USER_PROP_MANGHE", data);
    }

    //监听公告
    onAnnouncement(data) {
        onfire.fire("ON_ANNOUNCEMENT", data);
    }

    disConnect(clean: boolean) {
        NetUtil.disconnect(clean);
    }
    private reconnectFail(text = i18nMgr._getLabel("Connection timeout, connection disconnected", [])) {
        UIHelper.showWaitLayer(false);
        this.bReconnect = false;
        UIHelper.MessageBox(text, () => {
            cc.director.loadScene("hotupdate")
        })
    }
    //连接关闭
    onclose() {
        console.error("onclose ", cc.director.getScene().name)
        UIHelper.showWaitLayer(true, "Re Login...");//正在重连---
    }

    //重连成功
    reconnect() {
        console.error("Reconnect ", cc.director.getScene().name)
        this.bReconnect = true;
    }

    //如果不传就是默认的CONNECTION_CONFIG配置里(登录成功后，一系列获取房间列表 自动加入房间都默认弄了)
    Login(type: EM_LOGINTYPE, data: any, cb?: (data: Server_RES) => void, cfg?: ConstDefine.CONNEC_CONFIG) {
        NetUtil.init(cfg, () => {
            this.OnConnect(type, data, cb).catch((err) => {
                console.log("login err:", err);
            });
        });
    }

    //连接成功
    private async OnConnect(type: EM_LOGINTYPE, data: any, cb?) {
        console.log("Connect succeed", this.meLoginUser)//连接成功
        // if (this.meLoginUser && this.meLoginUser.userID) {
        //     let { userID, wxUnionID } = this.meLoginUser;
        //     let ret = await NetUtil.requestSync(ConstDefine.msgRouter.enter, {
        //         type: EM_LOGINTYPE.eLoginType_UseridUUid,
        //         extendField: {
        //             userID: userID,
        //             uuid: wxUnionID,
        //             channelType: data.channelType,
        //         }
        //     });
        //     if (ret.code == 0) {
        //         await this.OnloginSucess(ret.data);
        //         // todomy 不获取游戏列表
        //         await this.getGameListData();
        //         // if (ret.code) {
        //         //     if (cb) {
        //         //         cb(ret);
        //         //     }
        //         //     return;
        //         // }
        //         // if(this.bReconnect){
        //         //     //目前俱乐部需要
        //         //     onfire.fire("onReconnectLoginSucceed");
        //         // }
        //         // cb(ret);
        //         if (cb) {
        //             cb(ret);
        //         }
        //         if (this.bReconnect) {
        //             //目前俱乐部需要
        //             onfire.fire("onReconnectLoginSucceed");
        //         }
        //     } else {
        //         if (ret.code ==  ERRORCODE.SYS_NO_USER.code) {
        //             UIHelper.showTips(ERRORCODE.SYS_NO_USER.errStrPt);
        //             cc.sys.localStorage.removeItem("uuid");
        //             cc.sys.localStorage.removeItem("userID");
        //         } else {
        //             UIHelper.showTips(ret.errStr);
        //         }
        //         this.disConnect(true);
        //     }
        // } else {
        let ret = await NetUtil.requestSync(ConstDefine.msgRouter.enter, { type: type, extendField: data });
        if (ret.code == 0) {
            this.OnloginSucess(ret.data);
            // todomy 不获取游戏列表
            await this.getGameListData();
            // if (ret.code) {
            //     if (cb) {
            //         cb(ret);
            //     }
            //     return;
            // }
            // cb(ret);
            if (cb) {
                cb(ret);
            }
        } else {
            if (ret.code == ERRORCODE.SYS_NO_USER.code) {
                UIHelper.showTips(ERRORCODE.SYS_NO_USER.errStrPt);
                if (cc.sys.localStorage.getItem("uuid") == data.uuid) {
                    cc.sys.localStorage.removeItem("uuid");
                }
                if (cc.sys.localStorage.getItem("userID") == data.userID) {
                    cc.sys.localStorage.removeItem("userID");
                }
                if (cc.sys.localStorage.getItem("tourist_uuid") == data.uuid) {
                    cc.sys.localStorage.removeItem("tourist_uuid");
                }
                if (cc.sys.localStorage.getItem("tourist_userID") == data.userID) {
                    cc.sys.localStorage.removeItem("tourist_userID");
                }
            } else {
                UIHelper.showTips(ret.errStr);
            }
            this.disConnect(true);
        }
        //}

    }

    async getGameListData(): Promise<Server_RES> {
        let ret = await NetUtil.requestSync(ConstDefine.msgRouter.gameList, {});
        if (ret.code == 0) {
            this.gamelistData = ret.data;
            console.error("List of games ", this.gamelistData)//游戏列表
        }
        return ret;
    }

    //登录成功
    private async OnloginSucess(data): Promise<Server_RES> {
        this.meLoginUser.reset();
        console.log("=======setInfo====", data)
        this.meLoginUser.setInfo(data);
        if (!this.meLoginUser.moduleID) {
            SGNetKernel.instance().removeGameSink();
        }
        return { code: 0 };
    }

    //注册
    register(username: string, password: string, ticket: string, callback, connetConfig?) {
        NetUtil.init(connetConfig, this.onRegister.bind(this, username, password, ticket, callback));
    }
    //手机注册
    phoneRegister(account: string, password: string, ticket: string, callback, connetConfig?) {
        NetUtil.init(connetConfig, this.onPhoneRegister.bind(this, account, password, ticket, callback));
    }
    //邮箱注册
    emailRegister(account: string, password: string, code: string, callback, connetConfig?) {
        NetUtil.init(connetConfig, this.onEmailRegister.bind(this, account, password, code, callback));
    }
    //手机密码登录
    phoneLogin(type: number, account: string, password: string, callback, connetConfig?) {
        NetUtil.init(connetConfig, this.onPhoneLogin.bind(this, type, account, password, callback));
    }




    //email send code
    emailSendCode(c) {
        //TODO send getCode 
        // NetUtil.request(ConstDefine.msgRouter.getReferralReward,
        //     {
        //         count: count
        //     },
        //     (ret: Server_RES) => {
        //         callback && callback(this.fixRet(ret))
        //     }
        // );
    }

    //绑定推荐人
    bindReferrer(userId: number, callback) {
        NetUtil.request(ConstDefine.msgRouter.bindReferrer,
            {
                referrerUserId: userId
            },
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            }
        );
    }
    //获取推荐好友奖励
    getReferralReward(count: number, callback) {
        NetUtil.request(ConstDefine.msgRouter.getReferralReward,
            {
                count: count
            },
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            }
        );
    }
    // 转换好友推荐奖励
    convertReferralReward(type: number, callback) {
        NetUtil.request(ConstDefine.msgRouter.convertReferralReward,
            {
                type: type
            },
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            }
        );
    }
    //返现
    withdraw(data: any, callback) {
        NetUtil.request(ConstDefine.msgRouter.withdraw,
            {
                amount: data.amount,
                cardType: data.cardType,
                countryCode: data.countryCode || "BR",
                currencyCode: data.currencyCode || "BRL",
                email: data.email,
                cpf: data.cpf,
                phone: data.phone,
                remark: data.remark || "test",
                type: data.type || "PIX",
                userName: data.userName,
                walletId: data.walletId,
                bankAccount: data.bankAccount,
                bankCode: data.bankCode,
            },
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            }
        );
    }

    //获取取现记录
    getWithdrawOrder(status: string, page: number, count: number, callback) {
        NetUtil.request(ConstDefine.msgRouter.getWithdrawOrder,
            {
                status: status,
                page: page,
                count: count
            },
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            }
        );
    }

    //获取充值记录
    getMyPayOrder(status: string, page: number, count: number, callback) {
        NetUtil.request(ConstDefine.msgRouter.getMyPayOrder,
            {
                status: status,
                page: page,
                count: count
            },
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            }
        );
    }

    //获取分享奖励配置
    getReferralConfig(callback) {
        NetUtil.request(ConstDefine.msgRouter.getReferralConfig, {},
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            }
        );
    }

    //获取vip配置
    getVipConfig(callback) {
        NetUtil.request(ConstDefine.msgRouter.getVipConfig, {},
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            }
        );
    }


    //更新信息
    updateUserInfo(nickname: string, sex, callback) {
        NetUtil.request(ConstDefine.msgRouter.updateUserInfo,
            {
                nickname: nickname,
                head: "",    //先不传
                sex: sex
            },
            (ret: Server_RES) => {
                if (ret.code == 0) {
                    this.meLoginUser.reset();
                    this.meLoginUser.setInfo(ret.data);
                }
                callback && callback(this.fixRet(ret))
            }
        );
    }

    //修改性别
    changeSex(sex: number, callback) {
        NetUtil.request(ConstDefine.msgRouter.changeSex,
            {
                sex: sex
            },
            (ret: Server_RES) => {
                if (ret.code == 0) {
                    this.meLoginUser.reset();
                    this.meLoginUser.setInfo(ret.data);
                }
                callback && callback(this.fixRet(ret))
            }
        );
    }

    onRegister(username: string, password: string, ticket: string, callback) {
        NetUtil.request(
            ConstDefine.msgRouter.register,
            {
                username: username, // username
                password: password, // 32位md字符串
                ticket: ticket,
            },
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            }
        );
    }

    onPhoneRegister(username: string, password: string, ticket: string, callback) {
        NetUtil.request(
            ConstDefine.msgRouter.regMobile,
            {
                account: username, // username
                password: password, // 32位md字符串
                ticket: ticket,
                agentCode: GameData.Instance.agentCode,   // 渠道ID
                ip: GameData.Instance.ip,
            },
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            }
        );
    }

    onEmailRegister(username: string, password: string, ticket: string, callback) {
        NetUtil.request(
            ConstDefine.msgRouter.mailRegister,
            {
                account: username, // username
                password: password, // 32位md字符串
                ticket: ticket,
                agentCode: GameData.Instance.agentCode,   // 渠道ID
                ip: GameData.Instance.ip,
            },
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            }
        );
    }

    onPhoneLogin(type: number, account: string, password: string, callback) {
        NetUtil.request(
            ConstDefine.msgRouter.phoneLogin, {
            type: type,
            extendField: {
                account: account,
                password: password,
                agentCode: GameData.Instance.agentCode,   // 渠道ID
                ip: GameData.Instance.ip,
                deviceInfo: GameData.Instance.deviceInfo,
            }
        },
            (ret: Server_RES) => {
                this.meLoginUser.setInfo(ret.data);
                callback && callback(this.fixRet(ret))
            }
        );
    }

    //快速加入游戏(电玩类)
    isEnterGame: boolean = false;
    enterGame(moduleID: number, callback?: (data: Server_RES) => void, roomID?: number, tableID?: number) {
        console.error("请求加入游戏 -- ", moduleID);
        if (this.isEnterGame) return;
        this.isEnterGame = true;
        //return NetUtil.requestSync(msgRouter.fastSitDown, {moduleID, roomID});

        NetUtil.request(msgRouter.fastSitDown, { moduleID, roomID, tableID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
            this.isEnterGame = false;
        });
    }

    //快速加入游戏(电玩类)
    enterGameVip(moduleID: number, passWord: number, callback?: (data: Server_RES) => void, roomID?: number, tableID?: number) {
        console.error("请求加入游戏 -- ", moduleID);
        if (this.isEnterGame) return;
        this.isEnterGame = true;
        //return NetUtil.requestSync(msgRouter.fastSitDown, {moduleID, roomID});

        NetUtil.request(msgRouter.fastSitDownVip, { moduleID, passWord, roomID, tableID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
            this.isEnterGame = false;
        });
    }

    //创建房间
    async createNormalRoomSync(moduleEnName: string, config: any): Promise<Server_RES> {
        return NetUtil.requestSync(msgRouter.createRoom, { moduleEnName, config })
    }

    //加入房间
    async joinRoomSync(roomCode: number, chairID?: number): Promise<Server_RES> {
        return NetUtil.requestSync(msgRouter.joinRoom, { roomCode: roomCode, chairID: chairID })
    }

    //创建房间
    createNormalRoom(moduleEnName: string, config: any, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.createRoom, { moduleEnName, config }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        });
    }

    //加入房间
    joinRoom(roomCode: number, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.joinRoom, { roomCode: roomCode }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        });
    }

    //获取通用配置
    getCommonConfig(type: string, callback: (data: Server_RES) => void) {
        let sendData = { type: type };
        NetUtil.request(msgRouter.getCommonConfig, sendData, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }

    //任务列表
    getTaskList(type: string, callback: (data: Server_RES) => void) {
        let sendData = { type: type };
        NetUtil.request(msgRouter.getTaskList, {}, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }

    //获取上级
    getUpLevel(callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.getUpLevel, {}, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }

    //获取下级
    getUpLower(callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.getLowerLevel, {}, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }


    //积分扣减
    async deductOtherScores(cnt, callback) {
        let ret = await NetUtil.requestSync(ConstDefine.msgRouter.deductOtherScores, { cnt: cnt });
        callback && callback(this.fixRet(ret));
    }

    private onSitDwon(data: { data: DATA_SITDOWN }) {
        if (this.meLoginUser) {
            this.meLoginUser.onSitDwon(data.data);
        }
    }

    StandUp() {
        NetUtil.notify(msgRouter.StandUp, {})
    }

    //查找战绩
    getMyGameResult_new(clubID: number, page: number = 1, count: number = 20, callback?) {
        NetUtil.request(msgRouter.getBattle, { clubID, page, count }, (ret: Server_RES) => {
            if (ret.code) {
                return callback && callback(this.fixRet(ret));
            }
            this.formatGameResult(ret.data);
            callback && callback(ret.data)
        })
    }

    private formatGameResult(data: { page: number, rows: GAME_RESULT[], total_page: number }) {
        let resultArray = data.rows;
        if (resultArray) {
            for (let index = 0; index < resultArray.length; index++) {
                let obj = resultArray[index]
                if (!obj) continue;
                if (obj.json && typeof obj.json === "string") {
                    obj.json = JSON.parse(obj.json)
                }
                if (obj.players && typeof obj.players === "string") {
                    obj.players = JSON.parse(obj.players as any)
                }
                if (obj.tableSetting && typeof obj.tableSetting === "string") {
                    obj.tableSetting = JSON.parse(obj.tableSetting)
                }
                if (obj.gameDetail && typeof obj.gameDetail === "string") {
                    obj.gameDetail = JSON.parse(obj.gameDetail)
                }
                obj.gameDetail = this.translateGameDetail(obj.players, obj.gameDetail)
            }
        }
    }
    private playersArray2Map(players) {
        let map = {}
        for (let index = 0; index < players.length; index++) {
            const player: GAME_RESULT_PLAYER_INFO = players[index];
            map[player.userID] = player

        }
        return map
    }
    private translateGameDetail(players: GAME_RESULT_PLAYER_INFO[], gameDetailArray: IGameDetail[]) {
        let playersMap = this.playersArray2Map(players) //转换为userIDmap
        for (let ii = 0; ii < gameDetailArray.length; ii++) {
            const gameDetail = gameDetailArray[ii];
            let scoreArray = gameDetail.score
            gameDetail.players = []
            for (let chairID = 0; chairID < scoreArray.length; chairID++) {
                const scoreInfo = scoreArray[chairID];
                const [userID, score] = scoreInfo
                //@ts-ignore
                let playerInfo: GAME_DETAIL_PLAYER_INFO = Object.assign({}, playersMap[userID])
                playerInfo.chairID = chairID
                playerInfo.score = score
                gameDetail.players.push(playerInfo)
            }
        }

        return gameDetailArray
    }
    /**
     * @param {string} replayCode//回放码
     * @param {number} chairID //站在哪个位置观看
     * @param   callback
     */
    getReplayData(replayCode: string, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.getReplayData, { uuid: replayCode }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }

    //创建俱乐部
    createClub(clubName: string, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.createClub, { clubName }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }
    //解散俱乐部
    delClub(clubID: number, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.delClub, { clubID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }
    //加入俱乐部
    joinClub(clubCode: number, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.joinClub, { clubCode }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }
    //同意或拒绝
    agreeClubAction(clubID: number, agree: 0 | 1, userID: number, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.agreeClubAction, { clubID, agree, userID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }
    //申请离开俱乐部
    leaveClub(clubID: number, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.leaveClub, { clubID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }
    //获取俱乐部信息
    getMyClubInfo(callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.getMyClubInfo, {}, (ret: Server_RES) => {
            let { code, data } = ret;
            if (code == 0) {
                this.meLoginUser.refreshClub(data, true);
            }
            callback && callback(this.fixRet(ret));
        })
    }

    //俱乐部申请列表  info: CLUB_WAITING_INFO[]
    getClubWaiting(clubID: number, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.getClubWaiting, { clubID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }

    //俱乐部详情
    getClubDetail(clubID: number, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.getClubDetail, { clubID }, (ret: Server_RES) => {
            let { code, data } = ret;
            if (code == 0) {
                this.meLoginUser.clubDetail(data);
            }
            callback && callback(this.fixRet(ret));
        })
    }

    //创建包厢
    createBaox(clubID: number, moduleEnName: string, config: any, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.createBaox, { clubID, config, moduleEnName }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }

    //删除包厢
    delBaox(clubID: number, baoxID: number, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.delBaox, { clubID, baoxID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }
    //创建包厢房间
    createBaoxRoom(clubID: number, baoxID: number, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.createBaoxRoom, { clubID, baoxID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }

    //解散房間
    jiesanRoom(roomCode, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.jiesanRoom, { roomCode }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }
    //获取成员列表
    getClubPlayers(clubID: number, father, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.getClubPlayers, { clubID: clubID, father: father }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }

    //修改俱乐部
    modifyClub(clubID: number, data: IModifyClub, callback: (data: Server_RES) => void) {
        //@ts-ignore
        let sendData = Object.assign({ clubID }, data);
        NetUtil.request(msgRouter.modifyClub, sendData, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }

    //获取好友列表
    getLowerLevel(callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.getLowerLevel, {}, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }

    //领取上下级奖励
    getFatherReward(userID: number, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.getFatherReward, { userID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }

    //领取上下级奖励
    getClubFatherReward(clubID: number, userID: number, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.getClubFatherReward, { clubID: clubID, userID: userID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }

    //给下级设置抽成比列
    setSonRatio(clubID: number, userID: number, ratio: number, callback: (data: Server_RES) => void) {
        NetUtil.request(msgRouter.setSonRatio, { ratio, clubID: clubID, userID: userID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }

    //修改下级抽成比例
    modifyRatio(userID, ratio, callback) {
        NetUtil.request(msgRouter.modifyRation, { userID: userID, ratio: ratio }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        });
    }

    //获取上贡的金豆奖励
    getUpGoldBean(userID, callback) {
        NetUtil.request(msgRouter.getUpGoldBean, { userID: userID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        });
    }

    //获取上贡的金币奖励
    getUpScore(userID, callback) {
        NetUtil.request(msgRouter.getUpScore, { userID: userID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        });
    }

    //观看广告获取奖励
    advAward(callback) {
        NetUtil.request(msgRouter.advAward, {}, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        });
    }

    //抽奖
    async lottery(callback) {
        let ret = await NetUtil.requestSync(msgRouter.lottery, {});
        callback && callback(this.fixRet(ret));
    }

    //抽奖配置
    getLotteryCfg(callback) {
        NetUtil.request(msgRouter.getLotteryCfg, {}, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        });
    }

    //抽奖配置
    getInfo(callback) {
        NetUtil.request(msgRouter.getInfo, {}, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        });
    }

    getGoldBeanRank(last, callback) {
        NetUtil.request(msgRouter.getGoldBeanRank, { last: last }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        });
    }

    //获取广播公告
    getWebNotice(callback) {
        NetUtil.request(msgRouter.getWebNotice, {}, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        });
    }

    //获取公告
    getWebPublic(callback) {
        NetUtil.request(msgRouter.getWebPublic, {}, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        });
    }

    private onClub(data: any) {
        this.meLoginUser.onClub(data);
    }
    private fixRet(ret: Server_RES) {
        if (ret.code) {
            (<any>ret).info = ret.errStr;
        } else {
            (<any>ret).info = ret.data;
        }
        return ret;
    }

    //未实现接口
    //获取某俱乐部的战绩 所有战绩  返回callback GAME_RESULT[]
    getClubGameResult_new(clubID: number, page: number = 1, count: number = 20, callback?) {
        callback({ code: 1, info: "暂未实现" });
        return;
        // NetUtil.request(msgRouter.getClubBattle, {clubID, page, count}, (ret: Server_RES) => {
        //     if (ret.code) {
        //         return callback && callback(this.fixRet(ret));
        //     }
        //     this.formatGameResult(ret.data);
        //     callback && callback(ret.data)
        // })
    }
    /**
     * //TODO:俱乐部统计
     *
     * @param {number} clubID
     * @param {number} day   0=今天，-1=昨天 -2=前天
     * @param {*} [callback]
     */
    getClubSummary(clubID: number, day: number, callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }
    /**
     * //TODO:我在某天的俱乐部统计（俱乐部管理员才能请求）
     *
     * @param {number} clubID
     * @param {number} day   0=今天，-1=昨天 -2=前天
     * @param {*} [callback]
     */
    getMyDaySummary(clubID: number, day: number, callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }
    /**
     * 根据时间来统计俱乐部的数据
     *
     * @param {number} clubID
     * @param {string} startTime
     * @param {string} endTime
     * @param {*} callback
     * @memberof _NetHelp
     */
    getClubSummaryForTime(clubID: number, startTime: string, endTime: string, callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }


    /**
     * //TODO:查询每日签到  info: RewardInfo
     *
     * @param {*} callback
     */
    getRewardInfo(callback) {
        try {
            NetUtil.request(msgRouter.getSignNum, {}, (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            });
        } catch (error) {
            console.error("Error in getSignNum request: ", error);
        }
    }

    /**@description 排行榜列表 */
    getRankList(type: number, callback) {
        NetUtil.request(msgRouter.getRankList, { type: type }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }

    /**
     * //TODO: 分享奖励 成功则会有 "S_USER_PROP_CHANGED" 通知 对应属性已改变 如KernelData.diamond
     *
     * @param {*} callback
     */
    getShareReward(callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }


    /**
     * //TODO:查询每日分享 info: {todayReward:0|1}
     *
     * @param {*} callback
     */
    getShareRewardInfo(callback) {
        callback({ code: 1, info: "暂未实现" });
        return;

    }

    /**
   * //TODO: 获取充值赠送次数
   * @param callback 
   */
    getDailyRecharge(callback) {
        NetUtil.request(msgRouter.getDailyRecharge, {}, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }

    /**
     * //TODO: 获取商店信息
     * @param callback 
     */
    getShop(callback) {
        NetUtil.request(msgRouter.getShop, {}, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }

    enterThirdGame(gameCode, callback) {
        NetUtil.request(msgRouter.enterThirdGame, { gameCode: gameCode }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }

    enterThirdGame2(gameCode, callback) {
        NetUtil.request(msgRouter.enterThirdGame2, { gameCode: gameCode }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }

    /**
    * //获取充值/提现记录
    */
    getChargeRecord(type: string, callback) {
        NetUtil.request(msgRouter.getChargeRecord,
            {
                type: type,
            },
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            });
    }

    /**
     * //TODO: 购买商品
     * @param goodID 
     * @param buyTypeID 
     * @param payType 
     * @param type 
     * @param callback 
     */
    buyShop(goodID, buyTypeID, payType, type, callback) {
        NetUtil.request(msgRouter.buyShop,
            {
                goodID: goodID,
                id: buyTypeID,
                payType: payType,
                type: type,
                countryCode: 'BR',
                currencyCode: 'BRL',
                chargeType: '0101',
            },
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            });
    }

    /**
     * 游戏购买商品
     * @param goodID 
     * @param payType 
     * @param callback 
     */
    buyGameShop(id, payType, callback) {
        NetUtil.request(msgRouter.buyScore,
            {
                id: id,
                payType: payType
            },
            (ret: Server_RES) => {
                callback && callback(this.fixRet(ret))
            });
    }

    /**
     * 获取道具配置信息
     */
    getPropCfg(callback) {
        NetUtil.request(msgRouter.getPropCfg, {}, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }

    /**
     * 获取背包道具
     * @param callback 
     */
    getPack(callback) {
        NetUtil.request(msgRouter.getPack, {}, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }

    /**
     * 使用道具
     * @param callback 
     */
    useProp(itemID, cnt, callback) {
        NetUtil.request(msgRouter.useProp, { itemID: itemID, cnt: cnt }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }

    /**
     * 领取任务奖励
     * @param taskID 
     * @param callback 
     */
    getTaskReward(taskID: number, callback) {
        NetUtil.request(msgRouter.getTaskReward, { taskId: taskID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
    }

    /**
     * //TODO: 领取当天签到 成功则会有 "S_USER_PROP_CHANGED" 通知 对应属性已改变 如KernelData.diamond
     *
     * @param {*} callback
     */
    getReward(isAdv: number, callback) {
        NetUtil.request(msgRouter.signDay, { isAdv: isAdv }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }
    /**
     *  //TODO: 从保险箱取款
     *
     * @param {number} gold 取多少
     * @param {*} callback
     */

    drawMoney(gold: number, callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }

    /**
     * 存款到保险箱
     *
     * @param {number} gold 存多少
     * @param {*} callback
     */
    saveMoney(gold: number, callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }
    /**
     * 赠送
     *
     * @param {number} gameID 对方gameID
     * @param {number} gold 赠送多少
     * @param {*} callback
     */
    giveMoney(gameID: number, gold: number, callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }

    /**
     * 查询 gameID对应的昵称 info ：string
     *
     * @param {number} gameID
     * @param {*} callback
     */
    queryGameID(gameID: number, callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }

    /**
     * 查询自己银行记录
     *
     * @param {*} callback
     */
    queryBankRecord(callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }

    /**
     * 查询自己的贡献
     *
     * @param {*} callback
     */
    queryContribution(callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }

    /**
     * 查询自己的贡献（普通玩家）
     *
     * @param {*} callback
     */
    getContributionReward(callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }

    /**
     * 代理查询自己的汇总  info = {
            lastWeekPlayer: 0, lastWeekAgent: 0, lastWeekScore: 0, reward: 1,
            thisWeekPlayer: 0, thisWeekAgent: 0,
            todayPlayer: 0, todayAgent: 0,
            thisWeekScore: 0
        }
     *
     * @param {*} callback
     */
    getAgentDetail(callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }

    /**
     * 代理上周奖励
     *
     * @param {*} callback
     */
    getAgentWeekReward(callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }

    /**
     * 获取我的直属玩家列表  info:ISUB_PLAYER_INFO []
     *
     * @param {*} callback
     */
    getMyPlayers(callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }
    /**
     * 获取我的直属代理列表  info:ISUB_AGENT_INFO[]
     *
     * @param {*} callback
     */
    getMyAgents(callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }



    /**
     *获取手机验证码
     *
     * @param {*} phone 手机号
     * @param {*} callback
     */
    getPhoneCode(phone: number, callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }

    /**
     * TODO: 绑定手机
     *
     * @param {number} phone 手机号
     * @param {number} code 验证码
     * @param {*} callback  info: string
     */
    bindPhone(account: string, password: string, ticket: string, callback) {
        NetUtil.request(msgRouter.bindPhone, { account: account, password: password, ticket: ticket }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
        // callback({code :1,info:"暂未实现"});
        return;
    }
    /**
     * TODO: 绑定身份证
     *
     * @param {number} sfz 身份证号码
     * @param {number} sfzName 身份证名字
     * @param {*} callback  info: string
     */
    bindIDCard(sfz: string, sfzName: string, callback) {
        NetUtil.request(msgRouter.realNameAuthorize, { name: sfzName, idNum: sfz }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
        return;
    }

    //绑定邮箱
    /***username:用户名
     * password:密码
     * ticket:验证码
     */
    bindMail(email: string, password: string, ticket: string, callback) {
        NetUtil.request(msgRouter.bindMail, { email: email, password: password, ticket: ticket }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
        // callback({code :1,info:"暂未实现"});
        return;
    }

    /**
 * TODO:修改手机密码
 *
 * @param {number} password 密码
 * @param {number} code 验证码
 */
    modifyPhonePwd(password: string, code: string, callback) {
        NetUtil.request(msgRouter.modiflyPhonePWD, { password: password, code: code }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
        return;
    }

    /**
    * TODO:修改邮箱密码
    * @param {number} password 密码
    * @param {number} code 验证码
    * @param {IModifyBaoxUser} data  IModifyBaoxUser
    * @param {ServerCallBack} callback
    */
    modifyMailPWD(password: string, code: string, callback) {
        NetUtil.request(msgRouter.modiflyMailPWD, { password: password, code: code }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
        return;
    }

    /**
     *  TODO: 提交建议
     *
     * @param {number} text 内容
     * @param {*} callback  info: string
     */
    bugReport(text: string, callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }
    /**
     * 自己分享的二维码 info: base64png
     *
     */
    QRCode(callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }
    /**
     * TODO 激活码 info: string
     *
     */
    jihuoma(key, callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }
    /**
     * TODO: 根据uuid获取战绩详情
     *
     * @param {string} uuid
     * @param {*} [callback]
     */
    getGameDetail(warID: number, callback?) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }
    /**
     * //TODO:电玩城用的 坐下
     *
     * @param {string} moduleEnName
     */
    sitDown(moduleEnName: string) {
        UIHelper.showWaitLayer(false)
        UIHelper.showTips("暂未实现")
        return;
    }
    /**
     * //TODO:进入房间（金币场） 坐下
     *
     * @param {number} roomID
     */
    sitDownByRoomID(roomID: number) {
        UIHelper.showWaitLayer(false)
        UIHelper.showTips("暂未实现")
        return;
    }


    /**
     * //TODO:将某人踢除俱乐部
     *
     * @param {number} clubID //俱乐部ID
     * @param {number} userID   //玩家id
     * @param {ServerCallBack} callback
     */
    kickoutClubUser(clubID: number, userID: number, callback) {
        let sendData = { clubID: clubID, userID: userID };
        NetUtil.request(msgRouter.removeUser, sendData, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
        return
    }
    /**
     * //TODO:授予管理员
     *
     * @param {number} clubID //俱乐部ID
     * @param {number} userID   //玩家id
     * @param {ServerCallBack} callback
     */
    addClubAdmin(clubID: number, userID: number, callback) {
        let sendData = { clubID: clubID, userID: userID };
        NetUtil.request(msgRouter.addOrDelClubAdmin, sendData, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
        return;
    }

    /**
     * //TODO:禁止在俱乐部内游戏
     *
     * @param {number} clubID //俱乐部ID
     * @param {number} userID   //玩家id
     * @param {ServerCallBack} callback
     */
    limitUserEnter(clubID: number, userID: number, callback) {
        callback({ code: 1, info: "暂未实现" });
        return
    }
    /**
     * TODO:修改俱乐部玩家属性
     *
     * @param {number} clubID 俱乐部ID
     * @param {number} userID 玩家id
     * @param {IModifyBaoxUser} data  IModifyBaoxUser
     * @param {ServerCallBack} callback
     */
    modifyClubUser(clubID: number, userID: number, data: IModifyBaoxUser, callback) {
        callback({ code: 1, info: "暂未实现" });
        return;
    }

    /**
     * 修改俱乐部玩家积分
     * @param {number} clubID 俱乐部ID
     * @param {number} userID 玩家id
     * @param {number} score  分数
     * @param {ServerCallBack} callback
     */
    addOrDelClubScore(clubID: number, userID: number, score: number, callback) {
        let sendData = { clubID: clubID, userID: userID, score: score };
        NetUtil.request(msgRouter.addOrDelClubScore, sendData, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
        return;
    }

    /**
     * TODO:获取某个俱乐部的操作日志
     * @param {number} clubID 俱乐部ID
     * @param {ServerCallBack} callback  info: string[] //字符串数组
     */
    getClubOpLog(clubID: number, callback) {
        callback({ code: 1, info: "暂未实现" });
        return
    }
    /**
     * //TODO:修改包厢名字
     * @param {number} clubID  //俱乐部ID
     * @param {number} baoxID  //包厢ID
     * @param {string} baoxName   //包厢名称
     * @param {ServerCallBack} callback
     */
    modifyBaox(clubID: number, baoxID: number, baoxName: string, callback) {
        callback({ code: 1, info: "暂未实现" });
        return
    }


    /**
     * //TODO:修改包厢属性
     * @param {number} clubID  //俱乐部ID
     * @param {number} baoxID  //包厢ID
     * @param {string} data   //IModifyBaox 看里面的属性
     * @param {ServerCallBack} callback
     */
    modifyBaox_new(clubID: number, baoxID: number, data: IModifyBaox, callback) {
        callback({ code: 1, info: "暂未实现" });
        return
    }


    /**
     * //TODO:修改包厢税收
     * @param {number} clubID  //俱乐部ID
     * @param {number} baoxID  //包厢ID
     * @param {string} data   //ITaxInfoData 看里面的属性
     * @param {ServerCallBack} callback
     */
    modifyBaoxTax(clubID: number, baoxID: number, data: ITaxInfoData, callback) {
        callback({ code: 1, info: "暂未实现" });
        return
    }

    /**
     * TODO:监听俱乐部事件  （打开俱乐部UI的时候）
     */
    addClubListener(clubID: number) {
        console.error("未实现 ");
        return
    }

    /**
     * TODO:监听俱乐部事件  （俱乐部UI onDestroy 的时候）
     */
    removeClubListener() {
        console.error("未实现 ");
        return
    }

    /*
       绑定上级
    */
    clubBindFather(clubID: number, gameID: number, callback) {
        NetUtil.request(msgRouter.clubBindFather, { clubID: clubID, fatherID: gameID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
        return;
    }

    /*
        绑定上级
     */
    bindFather(gameID: number, callback) {
        NetUtil.request(msgRouter.bindFather, { fatherID: gameID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret));
        })
        return;
    }

    /**
    * 获取桌子
    *
    * @param {*} callback
    */
    getTables(moduleID: number, roomID: number, callback) {
        NetUtil.request(msgRouter.getTables, { moduleID, roomID }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }

    /**
     * 获取邮件信息
     */
    getMail(isSys: number, callback) {
        NetUtil.request(msgRouter.getMail, { isSys: isSys }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }


    /**
     * 读取邮件信息 对应读取邮件的ID
     */
    readMail(id: number, callback) {
        NetUtil.request(msgRouter.readMail, { id }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }

    /**
     * 读取邮件信息 对应读取邮件的ID
     */
    sendMail(gameID: number, title: string, content: string, reward: string, callback) {
        NetUtil.request(msgRouter.sendMail, { gameID: gameID, title: title, content: content, reward: reward }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }
    /**
     * 删除邮件信息对应删除邮件的ID
     */
    deleteMail(id: number, callback) {
        NetUtil.request(msgRouter.deleteMail, { id }, (ret: Server_RES) => {
            callback && callback(this.fixRet(ret))
        });
    }
}