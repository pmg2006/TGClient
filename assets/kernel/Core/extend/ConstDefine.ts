
export interface CONNEC_CONFIG {
    host: string,
    port: number,
    reconnect: boolean,
    maxReconnectAttempts: number,
    yanzhengAddr:string
}

// const formalConfig:CONNEC_CONFIG = {
//     host: "18.231.99.7",//"101.34.134.12",
//     port: 3100,
//     reconnect: true,
//     maxReconnectAttempts: 5,
//     yanzhengAddr:"https://webhook.00001.net"
// };

const gameConfig:CONNEC_CONFIG = {
    //host: "47.239.169.5",//"101.34.134.12",
    //port: 3100,
    host:"127.0.0.1",
    port: 3100,
    reconnect: true,
    maxReconnectAttempts: 5,
    yanzhengAddr:"https://api.luck111.net/api/user/"
}

const testConfig:CONNEC_CONFIG = {
    host:"127.0.0.1",//"101.34.134.12",
    port: 3100,
    reconnect: true,
    maxReconnectAttempts: 5,
    yanzhengAddr:"https://api.luck111.net/api/user/"
}

// const testConfig2:CONNEC_CONFIG = {
//     host: "1.116.39.66",
//     port: 3100,
//     reconnect: true,
//     maxReconnectAttempts: 5,
//     yanzhengAddr:"https://test1.00001.net"
// }

// const testConfig3:CONNEC_CONFIG = {
//     host: "127.0.0.1",
//     port: 3100,
//     reconnect: true,
//     maxReconnectAttempts: 5,
//     yanzhengAddr:"https://test1.00001.net"
// }

//export const YZM_ADDR = "send/notification?prefix=%2B55&telno=";//+55的URL编码
export const YZM_ADDR = "send/notification?prefix=%2B91&telno=";//+91的URL编码

export const YZM_ADDR_EMAIL = "send/mailVerificationCode?email=";

export const share_url = "https://test.betrab.com/"

export const share_url_test = "https://luck111.net/?" //"http://101.34.134.12:8888/dl/"

/**email about */
export const email_url="http://127.0.0.1:9001/api/user/";

//export const other_game_get_token = "https://api.betrab.com/api/user/third-token";
export const other_game_get_token = "https://api.luck111.net/api/user/third-token";

export function GET_PHONE_YZM_ADDR(telno:string,code:string){
    let addr = `verify/notification?prefix=%2B91&telno=${telno}&code=${code}`;
    return addr;
}

export function GET_PHONE_YZM_ADDR_EMAIL(email:string,code:string){
    let addr = `verify/mailVerificationCode?email=${email}&code=${code}`;
    return addr;
}

export function GET_PHONE_YZM_ADDR2(telno:string,code:string){
    let addr = `?appId=&numbers=${telno}&code=${code}`;
    return addr;
}

export function RESET_PASSWARD_ADDR(telno:string,pwd:string,ticket:string){
    let addr = `resetPassword?account=%2B91${telno}&password=${pwd}&ticket=${ticket}`;
    return addr;
}

export function RESET_PASSWARD_EMAIL_ADDR(eamil:string,pwd:string,ticket:string){
    let addr = `resetPasswordByEmail?email=${eamil}&password=${pwd}&ticket=${ticket}`;
    return addr;
}

export function BIND_INVITEE_ADDR(userId:number,referrerUserId:number){
    let addr = `bindReferrer?userId=${userId}&referrerUserId=${referrerUserId}`;
    return addr;
}

export function GET_SERVICE_LINK(code:string){
    let link = `get-serviceLink?code=${code}`;
    return link;
}

export function SUBMIT_LOG(logData: string) {
    // 构建提交日志的链接
    let link = CONNECTION_CONFIG.yanzhengAddr + `submit-log`;
    // 返回链接
    return link;
}


export const SAVE_RECENT_GAME = "/save-recent-game";

export const SAVE_FAVORITE_GAME = "/save-favorite-game";

//cancel-favorite-game
export const CANCEL_FAVORITE_GAME = "/cancel-favorite-game";

//submit-logs
export const SUBMIT_LOGS = "/submit-logs";


// setTimeout(function() {
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", 'https://api.betrab.com/api/user/record', true);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
//             var response = JSON.parse(xhr.responseText);
//             window.ip = response.ip;
//         }
//     };
//     xhr.send();
// }, 20);

export function GET_RECORD_IP(){
    let link = `record`;
    return link;
}

export function GET_ANDROID_APK_ID(code:string){
    let link = `/get-androidApkId?code=${code}`;
    return link;
}

/**email send code*/
export function GET_EMAIL_CODE(telno:string){
    let addr = `mailVerificationCode?email=${telno}`;
    return addr;
}

export let CONNECTION_CONFIG: CONNEC_CONFIG = CC_DEBUG ? testConfig : gameConfig;

//124.71.80.170


//客户端发送消息路由
export const msgRouter = {
    //登录
    enter: "connector.entryHandler.enter",
    //注册
    register: "connector.entryHandler.register",
    //更新用户信息
    updateUserInfo:"userCenter.userHandler.updateUserInfo",
    //修改性别
    changeSex:"userCenter.userHandler.changeSex",
    //游戏列表
    gameList: "userCenter.userHandler.GetGameList",
    //快速坐下
    fastSitDown: "userCenter.userHandler.fastSitDown",
    //快速坐下VIP
    fastSitDownVip: "userCenter.userHandler.fastSitDownVip",
    //房卡加入房间
    joinRoom: "userCenter.userHandler.joinRoom",
    //创建房间
    createRoom: "userCenter.userHandler.createRoom",
    //请求离开
    StandUp: "userCenter.userHandler.StandUp",
    //绑定上级ID
    bindFather: "userCenter.userHandler.bindFather",
    //登录子游戏消息发送
    sendSGMsg: "game.gameHandler.onClientMsg",
    //获取战绩
    getBattle: "userCenter.battleHandler.getMyGameResult_new",
    //获取回放数据
    getReplayData: "userCenter.battleHandler.getReplayData",
    //获取好友列表
    getLowerLevel: "userCenter.userHandler.getLowerLevel",
    //领取上下级奖励
    getFatherReward: "userCenter.userHandler.getFatherReward",

    //实名认证
    realNameAuthorize:"userCenter.userHandler.realNameAuthorize",

    //修改下级抽成比例
    modifyRation:"userCenter.userHandler.modifyRation",

    //获取上贡的金豆奖励
    getUpGoldBean:"userCenter.userHandler.getUpGoldBean",

    //获取上贡的金币奖励
    getUpScore:"userCenter.userHandler.getUpScore",

    //俱乐部BEGIN=========================================
    //获取俱乐部信息
    getMyClubInfo: "userCenter.clubHandler.getMyClubInfo",
    //创建俱乐部
    createClub: "userCenter.clubHandler.createClub",
    //加入俱乐部
    joinClub: "userCenter.clubHandler.joinClub",
    //加入俱乐部
    agreeClubAction: "userCenter.clubHandler.agreeClubAction",
    //申请离开俱乐部
    leaveClub: "userCenter.clubHandler.leaveClub",
    //俱乐部申请列表
    getClubWaiting: "userCenter.clubHandler.getClubWaiting",
    //俱乐部详情
    getClubDetail: "userCenter.clubHandler.getClubDetail",
    //创建包厢
    createBaox: "userCenter.clubHandler.createBaox",
    //创建包廂房間
    createBaoxRoom: "userCenter.clubHandler.createBaoxRoom",
    //解散俱樂部房間
    jiesanRoom: "userCenter.clubHandler.jiesanRoom",
    //删除包厢
    delBaox: "userCenter.clubHandler.delBaox",
    //获取成员列表
    getClubPlayers: "userCenter.clubHandler.getClubPlayers",
    //修改俱乐部
    modifyClub: "userCenter.clubHandler.modifyClub",
    //解散俱乐部
    delClub: "userCenter.clubHandler.delClub",
    //获取俱乐部战绩
    getClubBattle: "userCenter.battleHandler.getClubGameResult_new",
    //修改用户积分
    addOrDelClubScore: "userCenter.clubHandler.addOrDelScore",
    //添加或取消俱乐部管理员
    addOrDelClubAdmin: "userCenter.clubHandler.addOrDelAdmin",
    //踢出用户
    removeUser: "userCenter.clubHandler.removeUser",
    //领取上下级奖励
    getClubFatherReward: "userCenter.clubHandler.getFatherReward",
    //给下级设置抽成比列
    setSonRatio: "userCenter.clubHandler.setSonRatio",
    //绑定上级ID
    clubBindFather: "userCenter.clubHandler.bindFather",
    //俱乐部END=========================================
    //签到
    signDay: "userCenter.userHandler.signDay",
    //获取通用配置
    getCommonConfig: "userCenter.userHandler.getComCfg",
    //获取签到天数
    getSignNum: "userCenter.userHandler.getSignNum",
    // 排行榜列表
    getRankList: "rank.rankHandler.getGoldBeanRank",
    // 获取任务列表
    getTaskList: "userCenter.userHandler.taskList",
    // 获取用户上级
    getUpLevel : "userCenter.userHandler.getUpLevel",
    //邀请好友
    inviteFriend : "userCenter.userHandler.inviteFriend",
    //获取商品列表
    getShop:"userCenter.userHandler.getShop",
    //购买商品
    buyShop:"userCenter.userHandler.buyShop",
    //获取充值/记录
    getChargeRecord:"userCenter.userHandler.getChargeRecord",
    //购买商品
    buyScore: "userCenter.userHandler.buyScore",
    //获取道具配置表
    getPropCfg:"userCenter.userHandler.getPropCfg",
    //获取背包道具
    getPack:"userCenter.userHandler.getPack",
    //使用背包道具
    useProp:"userCenter.userHandler.useProp",
    //领取奖励
    getTaskReward:"userCenter.userHandler.getTaskReward",
    //观看广告奖励
    advAward:"userCenter.userHandler.advAward",
    //抽奖
    lottery:"userCenter.userHandler.lottery",
    //获取抽奖配置
    getLotteryCfg:"userCenter.userHandler.getLotteryCfg",
    //主动刷新数据
    getInfo:"userCenter.userHandler.getInfo",
    //金豆排行榜
    getGoldBeanRank:"userCenter.rankHandler.getGoldBeanRank",
    //获取广播公告
    getWebNotice:"userCenter.userHandler.getWebNotice",
    //扣减积分
    // deductOtherScores:"userCenter.userHandler.testGoldBean",
    //扣减积分
    deductOtherScores:"userCenter.userHandler.deductOtherScores",
    //获取公告
    getWebPublic:"userCenter.userHandler.getWebPublic",
    //获取桌子
    getTables:"userCenter.userHandler.getTables",
    //获取邮件信息表
    getMail:"userCenter.userHandler.getMail",
    //发送邮件信息
    sendMail:"userCenter.userHandler.sendMail",
    //读取邮件信息
    readMail:"userCenter.userHandler.readMail",
    //删除邮件
    deleteMail:"userCenter.userHandler.deleteMail",
    //手机注册 - 当前使用
    regMobile:"connector.entryHandler.regMobile",   //"login.regHandler.regMobile",
    //邮箱注册
    mailRegister:"login.regHandler.regMail",
    //手机登录
    phoneLogin:"connector.entryHandler.enter",
    //绑定手机
    bindPhone:"userCenter.userHandler.bindMobile",
    //绑定邮箱
    bindMail:"userCenter.userHandler.bindMail",
    //修改手机密码
    modiflyPhonePWD:"userCenter.userHandler.reMobilePassword",
    //修改邮箱密码
    modiflyMailPWD:"userCenter.userHandler.reMobilePassword",
    //获取推荐好友奖励
    getReferralReward:"userCenter.userHandler.getReferralReward",
    //返现
    withdraw:"userCenter.userHandler.withdraw",
    //推荐绑定人
    bindReferrer:"userCenter.userHandler.bindReferrer",
    //分享奖励配置
    getReferralConfig:"userCenter.userHandler.getReferralConfig",
    //获取提现订单
    getWithdrawOrder:"userCenter.userHandler.getWithdrawOrder",
    //获取我的支付订单
    getMyPayOrder:"userCenter.userHandler.getMyPayOrder",
    //获取VIP配置
    getVipConfig:"userCenter.userHandler.getVipConfig",
    //获取每日充值
    getDailyRecharge:"userCenter.userHandler.getDailyRecharge",
    //转换推荐奖励
    convertReferralReward:"userCenter.userHandler.convertReferralReward",
    // 进入三方游戏
    enterThirdGame:"userCenter.userHandler.enterThirdGame",
    //EGAME API
    enterThirdGame2:"userCenter.userHandler.enterThirdGame2",
    // 支付三方游戏
    payThirdGame:"userCenter.userHandler.payThirdGame",
    // 提取三方游戏
    payoutThirdGame:"userCenter.userHandler.payoutThirdGame",
};

//消息接收
export const msgReceive = {
    UserSitdown: "UserSitdown",//用户坐下消息

    OnGame: "onGame",//子游戏内消息
    eRoute_Attr: "onAttr",//玩家属性改变
    eRoute_Leave: "onLeave",//玩家离开房间
    eRoute_Club: "onCLub",//俱乐部消息
    eRoute_Manghe: "onManghe",//盲合

    eRoute_OtherLogin :"onOtherLogin", //其他地方登录的消息

    eRoute_RechargeSuccess : "onRechargeSuccess", //充值成功

};

//request 返回标准结构体
export interface Server_RES {
    code: number;
    errStr?: string;
    data?: any;
}
//登录类型
export enum EM_LOGINTYPE {
    eLoginType_Code = 1,//微信code登录,
    eLoginType_Token = 2,//token登录
    eLoginType_Tourist = 3,//游客登录
    eLoginType_Userid = 4,//userID单机登录
    eLoginType_UseridUUid = 5,//userID，uuid登录
    eLoginType_WxSmall = 6,//微信小程序登录 extendField:{code:string,userInfo:string}
    eLoginType_Ls = 7,// ls登录
    eloginType_Account = 8,//账号密码登录
    eLoginType_Google = 9,//google登录
    eLoginType_Facebook = 10,//facbook登录
    eLoginType_Line = 11,//LINE登錄
    eLoginType_Phone = 12,//phone登錄
    eLoginType_Mail = 13,//邮箱登錄
}

//广播数据结构
export interface WEB_NOTICE
{ //返回的是一个数组。请注意，目前只有一条
    text:string//公告内容
    titile:string//公告标题，目前没有
    sort:number//公告排序，目前没有
}

export enum EM_ChannelType {
    Tourist = 0,//游客
    GoogleFacebookm = 1,//谷歌facebook
    WeiChat = 2,//微信
    Account = 3,//账号注册
}

//游戏厂商
export enum EM_GameProvider {
    SkyWind = 0,//SkyWind
    PG_Soft = 1,//PG Soft
    Spribe = 2,//Spribe
    BGaming = 3,//BGaming
    PlayStar = 4,//PlayStar
}

