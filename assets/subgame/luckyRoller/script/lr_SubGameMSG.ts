import { gameConst } from "../../../kernel/Core/KernelDefine";

export const subGameMSG = {
    //游戏状态
    GS_TK_FREE: gameConst.GAME_STATUS_FREE,         //空闲状态
    GS_TK_CALL: gameConst.GAME_STATUS_PLAY,         //玩家状态
    GS_TK_SCORE: gameConst.GAME_STATUS_PLAY + 1,    //下注状态
    GS_TK_PLAYING: gameConst.GAME_STATUS_PLAY + 2,  //游戏进行

    S_CALC:100,//结算
    S_HISTORY:101,//历史记录回调

    /**
     * 请求开始
     */
    C_START: 0,

    /**
     * 获取历史记录
     */
    C_HISTORY:1,
};

// 场景消息
export interface SData {
    difen : number //底分设置
    beishu : number //倍数
    higher : number //1为higher，2为lower
    handerNum : string //选择数字
    resultNum : string //结果

    win : number // 输赢
    allWin : number // 总输赢
    score : number // 分数更新
}

export interface HISTORY {
    win:number
    time:number
    difen:number
    higher:number 
    handerNum:string
    resultNUm:string
}

export let CSetData = {
    difen : 0,
    beishu : 1,
    higher : 1,
    handerNum : 222,
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