//大厅登录的玩家数据
import {DATA_SITDOWN} from "./MsgDefine";
import {BAOX_INFO, CLUB_INFO, TABLE_INFO} from "../CommandDefine";
//俱乐部命令
export  enum  EM_CLUB_CMD{
    eClubCmd_AddApply = "addApply",//添加申请列表
    eClubCmd_Dismiss = "delete",//删除解散俱乐部
    eClubCmd_AddClub = "addClub",//推送加入的俱乐部
    eClubCmd_BoxChange = "boxChange",//包厢信息更
    eClubCmd_TableChange = "tableChange",//桌子信息更改
    eClubCmd_TableClose = "tableClose",//桌子删除
    eClubCmd_ClubInfoChange = "clubChange",//俱乐部变更
}

export  enum EM_COMMOM_CFG {
    Sign="Sign",//"每日签到",//{fields:["score"],awards:[[3, 6, 10, 15, 20, 25, 30]],awardsVip:[[3, 6, 10, 15, 20, 25, 30]]} fields奖励字段,awards1-7天对应奖励数值
    Adv="Adv",//广告奖励{advNum:50,fields:["score"],awards:[3],,awardsVip:[3]} advNum可光看次数 fields奖励字段,awards 对应奖励数值
    RankGoleBean="RankGoleBean",//金豆排行榜奖励[{from:1,to,10,fields:["score"],awards:[3]}]
    RankScore="RankScore",//金币排行榜奖励[{from:1,to,10,fields:["score"],awards:[3]}]
    SubGameCalc="SubGameCalc",//"结算分成", {fields：["score"],awards:[0.1]} fields分成字段  awards奖励比例
    BindFatherCnt="BindFatherCnt",// 上级绑定链长度 2 默认三层
    BindFaterReward="BindFaterReward",// 绑定上级奖励 {field:"score",one:10,two:2} field奖励字段 one 1级推荐奖励数量 two 2级推荐奖励数量
    TrxCfg="TrxCfg", //"trx服务配置"   {url:string,noticeUrl:string}
    RechargeScore= "RechargeScore",//金币充值配置{id:{cnt,cny}}
    LotteryCnt = "LotteryCnt", //每天转盘可使用次数
    BscCfg = "BscCfg"
}

export  class User {
    userID:number;
    gameID:number;
    nickname:string;
    diamond:number;
    score:number;
    online:number;
    head:string;
    sex:number;
    isAndroid:boolean;//是否机器人
    regDate:Date;
    lastLoginDate:Date;
    lastOutLineDate:Date;
    wxOpenid:string;//微信openID(企业转账需要)
    wxUnionID:string;//个人唯一标识码

    isWather:boolean;//是否旁观
    chairID:number;
    status:number;
    sitStatus:number;
    moduleID:number;
    roomID:number;
    tableID:number;
    serverID:string;
    roomCode:number;
    moduleEnName:string;
	inviteeRewards:{};
    invitees:any[]
    realWin:number;
    referralAmount:number;
    withdrawalAmount:number;
    depositAmount:number;
    mail:string;
    mobile:string;
    clubData = {}; //俱乐部数据{[clubID:number]:CLUB_INFO}
    tables = {}; //自己相关联的桌子数据{[房间号]]:{tableSetting,players}}
    constructor(info?) {
        this.reset();
        if(!info) return;
        for (let attr in info) {
            this[attr] = info[attr];
        }
    }

    reset() {
        // this.clubData = {};
        this.tables = {};
        this.isWather = null;//是否旁观
        this.chairID = null;
        this.status = null;
        this.sitStatus = null;
        this.moduleID = null;
        this.roomID = null;
        this.tableID = null;
        this.serverID = null;
        this.roomCode = null;
        this.moduleEnName = null;
    }
    setInfo(info){
        for (let attr in info) {
            this[attr] = info[attr];
        }
    }
    onSitDwon(data: DATA_SITDOWN) {
        for (let attr in data) {
            this[attr] = data[attr];
        }
    }


    refreshClub(clubArray: CLUB_INFO[],clear =false) {
        if(clear){
            this.clubData = {};
        }
        for (let index = 0; index < clubArray.length; index++) {
            const club = clubArray[index];
            club.baoxInfoArray = [];
            club.tableMap = {};
            this.clubData[club.clubID] = club
        }
    }
    clubDetail(data:{ baoxInfoArray, tableInfoArray, notice, enableTime,clubID }){
        this.tables = {};
        const { baoxInfoArray, tableInfoArray = {}, notice, enableTime,clubID } = data
        for (let tableInfo in tableInfoArray) {
            this.onClubTableChanged(tableInfoArray[tableInfo])
        }

        let club: CLUB_INFO = this.clubData[clubID];
        if (club) {
            club.baoxInfoArray = baoxInfoArray;
            club.notice = notice;
            club.enableTime = enableTime;

            if (!club.tableMap) club.tableMap = {};
            if(this.isNullObj(tableInfoArray)){
                club.tableMap = {};
            }
            if (!club.baoxInfoArray) club.baoxInfoArray = [];
        }
    }

    private onClubTableChanged(tableInfo: TABLE_INFO) {
        const { players, tableSetting = {},roomCode } = tableInfo
        let { clubID } = tableSetting
        if (roomCode) {
            this.tables[roomCode] = tableInfo
            if (clubID) {
                let club: CLUB_INFO = this.clubData[clubID]
                if (club) {
                    club.tableMap[roomCode] = tableInfo
                }
            }
        } else {
            console.error("房号错误！")
        }
    }

    private  onClubDismiss(data:{clubID:number}){
        let clubID  = data.clubID || 0;
        delete  this.clubData[clubID];
    }
    private onClubTableClose(data:{roomCode:number,clubID:number}) {
        let {roomCode = 0, clubID = 0} = data;
        if (roomCode) {
            if(clubID){
                let club: CLUB_INFO = this.clubData[clubID]
                if (club && club.tableMap[roomCode]) {
                    delete club.tableMap[roomCode]
                }
            }
            delete this.tables[roomCode]
        }
    }

    //接收俱乐部主动下推消息
    onClub(data: { cmd: EM_CLUB_CMD, msg: any }) {
        let {cmd, msg} = data;
        switch (cmd) {
            case EM_CLUB_CMD.eClubCmd_BoxChange:
                this.boxChange(msg);
                onfire.fire("S_CLUB_BAOX_CHANGED",msg);
                break;
            case  EM_CLUB_CMD.eClubCmd_AddClub:
                this.refreshClub([msg]);
                onfire.fire("S_CLUB_CHANGED",msg);
                break;
            case EM_CLUB_CMD.eClubCmd_TableChange:
                this.onClubTableChanged(msg);
                onfire.fire("S_CLUB_TABLE_CHANGED",msg);
                break;
            case EM_CLUB_CMD.eClubCmd_TableClose:
                this.onClubTableClose(msg);
                onfire.fire("S_CLUB_TABLE_CHANGED", msg);
                break;
            case EM_CLUB_CMD.eClubCmd_Dismiss:
                this.onClubDismiss(msg);
                onfire.fire("S_CLUB_CHANGED", msg);
                break;
            case EM_CLUB_CMD.eClubCmd_ClubInfoChange:
                this.onClubInfoChange(msg);
                onfire.fire("S_CLUB_CHANGED", msg);
                break;
        }
    }
    //俱乐部信息变更
    onClubInfoChange(retData){
        let { clubID, data } = retData
        //删除
        if (data == null) {
            delete this.clubData[clubID]
        }
        else {
            let oldData = this.clubData[clubID] || {}
            //@ts-ignore
            let club = Object.assign(oldData, data) //修正
            this.clubData[clubID] = club
            if (!club.tableMap) club.tableMap = {};
            if (!club.baoxInfoArray) club.baoxInfoArray = [];
        }
    }
    private
    //包厢信息变化
    private boxChange(msg:{ clubID:number, baoxID:number, data:BAOX_INFO }){
        let { clubID, baoxID, data } = msg;
        let club: CLUB_INFO = this.clubData[clubID]
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
    private  isNullObj (data){
        for(let i in data){
            return false;
        }
        return  true;
    }
}