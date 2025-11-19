import { gameConst } from "../../../kernel/Core/KernelDefine";

export const subGameMSG = {
    //游戏状态
    GS_TK_FREE: gameConst.GAME_STATUS_FREE,         //空闲状态
    GS_TK_CALL: gameConst.GAME_STATUS_PLAY,         //玩家状态
    GS_TK_SCORE: gameConst.GAME_STATUS_PLAY + 1,    //下注状态
    GS_TK_PLAYING: gameConst.GAME_STATUS_PLAY + 2,  //游戏进行


    S_CALC:100,//结算
    S_SET:101,//参数变更
    S_XIAZHU:102,//下注回调
    S_ERR:103,//错误提示
    S_HISTORY:104,//历史记录回调

    /**
     * 请求翻雷
     */
    C_START: 1,

    /**
     * 设置参数
     */
    C_SET: 2,

    /**
     * 结算收米
     */
    C_CALC: 3,
    
    /**
     * 下注底分跟雷
     */
    C_XIAZHU:4,

    /**
     * 获取历史记录
     */
    C_HISTORY:5,
};

export enum ERRCODE {
    PARAMERR =1,//参数错误
    NOXIAZHU=2,//未下注
    OPEND=3,//已经翻过这个雷
}

// 场景消息
export interface SSceneData {
    autoStart:boolean, //是否自动开始
    lossOver:number,//输多少结算
    winOver:number,//赢多少结算
    lossInr:number,//输多少增加
    winInc:number,//赢多少增加
    allWins:number, //累计赢得
    bets:number[] //点击的每个格子记录
    lei:number //选择的雷数
    difei:number //底分设置
}

export interface SCalcData {
    final:boolean;//是否结束
    win:number; //输赢
    allWins:number, //累计赢得
    idx:number //翻雷格子1-25
    bets:number[] //点击的每个格子记录
    score:number //身上分数更新
}

export interface SSetData {
    autoStart:boolean, //是否自动开始
    lossOver:number,//输多少结算
    winOver:number,//赢多少结算
    lossInr:number,//输多少增加
    winInc:number,//赢多少增加
}

export interface SXiazhuData {
    lei:number //选择的雷数
    difei:number //底分设置
}

export interface SErrorCodeData {
    code:ERRCODE //看错误码
}

export interface SHISTORYData {
    win:number //输赢
    time:number //时间戳
    difen:number //底分
    lei:number //雷数
    bei:number //倍数
    bets:number[] //下注轨迹  翻雷记录
}

export let CStartData = {
    idx : 0,
}

export let CSetData = {
    lossOver : 0,
    winOver : 0,
    lossInr : 0,
    winInc : 0,
    autoStart : false,
}

export let CXiazhuData = {
    difen : 0,//底分
    lei : 0,
}

/**
 * 格式化时间
 * 调用 FormatDate(strDate, "yyyy-MM-dd HH:mm:ss")
 * @param strDate （中国标准时间）时间戳等
 * @param strFormat 返回格式
 * @returns
 */
export let formatData = function (strDate : any, strFormat?: any) {
    if (!strDate) return;
    if (!strFormat) strFormat = "yyyy-MM-dd";
    switch (typeof strDate) {
        case "string" :
            strDate = new Date(strDate.replace(/-/g, "/"));
            break;
        case "number" :
            strDate = new Date(strDate);
            break;
    }
    if (strDate instanceof Date) {
        const dict : any = {
            yyyy : strDate.getFullYear(),
            M : strDate.getMonth() + 1,
            d : strDate.getDate(),
            H : strDate.getHours(),
            m : strDate.getMinutes(),
            s : strDate.getSeconds(),
            MM : ("" + (strDate.getMonth() + 101)).substring(1),
            dd : ("" + (strDate.getDate() + 100)).substring(1),
            HH : ("" + (strDate.getHours() + 100)).substring(1),
            mm : ("" + (strDate.getMinutes() + 100)).substring(1),
            ss : ("" + (strDate.getSeconds() + 100)).substring(1)
        };
        return strFormat.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
            return dict[arguments[0]];
        });
    }
}

