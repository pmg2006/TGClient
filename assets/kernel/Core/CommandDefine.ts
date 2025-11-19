
export enum CommandDefine {

    //主动通知
    S_USER_SITDOWN,//坐下
    S_USER_STANDUP,//离开
    S_USER_PROP_CHANGED, //玩家属性变化通知
    S_USER_KICK_OUT,//被踢出游戏
    S_CLUB_TABLE_CHANGED,// 俱乐部桌子有变化
    S_CLUB_BAOX_CHANGED, //包厢变更通知 格式 {clubID,baoxID,data}  客户端收到这个消息的时候 直接去KernlData.clubData 里面拿 已经是最新的
    S_CLUB_CHANGED, //俱乐部变更通知   格式 {clubID,data} 客户端收到这个消息的时候 直接去KernlData.clubData 里面拿  注意：如果是在俱乐部里面 要判断clubID 才刷新 该俱乐部，是删除俱乐部的话（data为null） 记得退出俱乐部界面

    S_BROADCAST = 20, //广播消息（文字）


    ////客户端消息号//////
    __CLIENT_MSG_BEGIN = 1000,
    C_LOGIN = 1001, //登录消息 游客：{account,password, loginType:"youke"}  微信{code,openid,loginType:"weixin"}
    C_LOGIN_BY_USER_ID,// userid登录,电玩城还有用，房卡游戏请忽略

    C_CREATE_ROOM, //创建房间{roomID:120, clubID?:20, baoxID?:1}
    C_JOIN_ROOM,    //加入房间 {roomID:120}    
    C_CLUB_CREATE, //创建俱乐部{clubName:"俱乐部名称"}
    C_CLUB_JOIN,    //申请加入俱乐部{clubID:20}
    C_CLUB_LEAVE,    //申请离开俱乐部{clubID:20}
    C_CLUB_GET_WAITING,    //俱乐部申请列表{clubID:20}
    C_CLUB_AGREE,    //同意某人加入俱乐部{clubID:20,userID,agree:1}
    C_CLUB_MY, //获取我的俱乐部列表{}
    C_CLUB_DETAIL, //俱乐部详情 {clubID}
    C_CLUB_GET_PLAYERS, //俱乐部详情 {clubID}    
    C_BOX_CREATE, //创建包厢{clubID,config}
    C_BOX_DEL, //删除包厢{clubID,baoxID}
    C_BOX_MODIFY, //修改包厢名字{clubID,baoxID,baoxName}
    C_CLUB_KICKOUT, //踢除某个玩家
    C_CLUB_LIMIT_ENTER, //禁止在俱乐部内游戏
    C_CLUB_ADD_ADMIN, //添加管理员
    C_CLUB_JIESAN, //解散房间
    C_CLUB_MODIFY_USER, //修改俱乐部玩家信息 （备注，积分等等）
    C_CLUB_GET_LOG, //获取俱乐部操作日志{clubID}    

    C_CLUB_MODIFY, //修改修改俱乐部属性
    C_BOX_MODIFY_TAX, //修改俱乐部抽水数据

    C_CLUB_ADD_LISTENER, //监听俱乐部消息 监听的人会主动推送
    C_CLUB_REMOVE_LISTENER, //注销监听俱乐部消息
    C_CLUB_DEL,    //解散俱乐部


    C_USER_OPTION_BEGIN = 1100,
    C_USER_SIT_DOWN,//坐下
    C_USER_STAND_UP,//离开
    C_BIND_PHONE, //绑定手机号到这个账
    C_BIND_ID_CARD, //绑定身份证
    C_BUG_REPORT,//提建议
    C_USER_QUERY,//查询用户信息
    C_CD_KEY,//激活码


    C_BANK_OPTION_BEGIN = 1200,
    C_BANKER_SAVE, //存款
    C_BANKER_DRAW, //取款
    C_BANKER_GIVE, //赠送
    C_BANKER_GIVE_QUERY, //查询赠送玩家昵称    
    C_BANKER_RECORD_QUERY, //查询交易记录 

    C_UPDATE_USER_GPS = 1999,//更新用户GPS信息


    C_GAME_SERVER_MSG = 2000, //发给游戏
    C_HTTP_MSG = 3000, //

}

//俱乐部信息
export interface CLUB_INFO {
    //创建者userID
    userID: number,
    //创建者游戏ID
    gameID: number,
    //创建者昵称     
    nickname: string,
    //创建者头像
    head: string,
    //俱乐部ID
    clubID: number,
    //俱乐部gameID(用来显示)
    clubCode: number,
    //俱乐部名字
    clubName: string,
    //自己在这个俱乐部是否管理员 0=不是 1=是
    isAdmin: number,
    //自己在这个俱乐部的积分
    clubScore: number,
    //俱乐部人数
    userCount: number,
    //等待处理条数 （小红点）
    waitNum: number,
    //俱乐部公告
    notice: string,
    //俱乐部可以玩的时间段 为空则表示全天时段可以玩 09:00:00-23:00:00 //表示这个时间段可以玩
    enableTime: string,
    //包厢信息数组
    baoxInfoArray: BAOX_INFO[],
    tableMap: { [roomCode: number]: TABLE_INFO }, //roomCode 房间号
}


//包厢信息
export interface BAOX_INFO {
    //包厢ID
    baoxID: number,
    //包厢名字
    name: string,
    //游戏模块名字
    moduleEnName: string,
    //包厢配置
    config: any,
    //包厢配置
    taxInfo: ITaxInfoData, //税收配置
    enable: 0 | 1, //0=当前不能创建房间，1=可以创建房间
    enableTime: string, //"05:00:00-20:00:00" 表示从5点到20点
}

export interface IModifyBaox {
    //包厢名字
    name?: string,
    //包厢配置
    config?: string, //json  来自创建面板
    enable?: 0 | 1, //0=当前不能创建房间，1=可以创建房间
    enableTime?: string, //"05:00:00-20:00:00" 表示从5点到20点
}

export interface ITaxInfoData {
    enableScoreLimit: number, //是否开启分数限制  
    minEnterScore: number, //进入最小积分
    enableTax: number, //是否收税  
    taxNumType: number, //税收类型 1=百分比 0=固定数值
    dyjTaxNum: number, //大赢家收取
    allTaxNum: number, //所有人数值
}
export interface IModifyClub {

    notice?: string, //公告

    enableTime?: string, //"05:00:00-20:00:00" 表示从5点到20点
}




//桌子信息
export interface TABLE_INFO {
    roomCode: number,
    round: number, //当前局数 0未开始 
    tableSetting: any,
    players: PLAYER_INFO[],
}

//玩家信息
export interface PLAYER_INFO {
    userID: number,
    gameID: number,
    nickname: string,
    head: string,
}


//俱乐部玩家列表
export interface CLUB_PLAYER_INFO {
    userID: number,
    gameID: number,
    nickname: string,
    head: string,
    desc: string, //备注
    clubScore: number, //俱乐部积分
    online: number,      //是否在线 0=不在线 1=在线
    isAdmin: number,     //是否队长 0=不是 1=是队长
    limitEnter: number, //禁止游戏 0=不禁止，1=禁止
}


export interface IModifyBaoxUser {
    desc?: string, //备注
    limitEnter?: number, //禁止游戏 0=不禁止，1=禁止   
    addScore?: number, //加减俱乐部积分
}

//俱乐部玩家列表
export interface CLUB_WAITING_INFO {
    userID: number,
    gameID: number,
    nickname: string,
    head: string,
    action: number,      //离开/加入 1=加入 2=离开

}

//总战绩
export interface ITableSetting {
    roomCode: number, //房间号
    juShu: number,

}
//总战绩
export interface GAME_RESULT {
    roomCode: number, //房间号
    uuid: string,//uuid
    gameName: string, //"红中麻将" "五十K"  单纯用来显示
    moduleEnName: string, //"guandan" "hongzhongmj" 模块名
    bigWinner: number, //大赢家userID
    tableSetting: ITableSetting, //桌子配置 kv 组合
    timestamp: number, //时间戳
    clubID: number | null, //俱乐部ID
    players: GAME_RESULT_PLAYER_INFO[],//玩家信息
    json: any, //每局战绩详情，(弃用)
    gameDetail: IGameDetail[], //每局战绩详情
}


export interface IGameDetail {
    replayCode: string, //回放码
    round: number, //第几局
    time: number,//时间戳
    score: number[][],//这个引擎用来翻译的 客户端取player信息显示即可
    players: GAME_DETAIL_PLAYER_INFO[];//玩家信息
}


//每局详情
export interface GAME_DETAIL_PLAYER_INFO {
    chairID: number,
    userID: number,
    gameID: number,
    nickname: string,
    head: string,
    score: number,      //总得分

}
export interface GAME_RESULT_PLAYER_INFO extends GAME_DETAIL_PLAYER_INFO {
    diamond: number,   //钻石 目前没用
    bigWinner: 0 | 1,         //是否大玩家    

}

export interface RewardInfo {
    rewardDays: number, //本周已领取天数
    todayReward: 0 | 1,  //今日是否已经领取
}



export interface ISUB_PLAYER_INFO {
    userID: number,
    //游戏ID
    gameID: number,
    //昵称     
    nickname: string,
    //头像
    head: string,
    //是否在线 0|1
    online: number,
    //筹码总额
    score: number,
    //本周贡献
    weekCtbt: number,
    //今日贡献
    todayCtbt: number,
    //最后登录时间
    loginTime: number,
}

export interface ISUB_AGENT_INFO {
    userID: number,
    //游戏ID
    gameID: number,
    //昵称     
    nickname: string,
    //头像
    head: string,
    //筹码总额
    score: number,
    playerCtbt: number, //直属玩家总贡献
    playerCount: number, //直属玩家人数
    agentCtbt: number, //下一级上家总贡献
    allMemberCount: number, //团队总人数
}

