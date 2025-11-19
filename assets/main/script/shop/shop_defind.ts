export interface panel_shop_good_data{
    goodID:number;
    describe:string;
    type:EM_SHOP_TYPE;
    cnt:number;
    buyType:SHOP_BUY_TYPE;
}

export  interface SHOP_NEED_ITEM {
    type:EM_ITEM_TYPE//物品类型
    cnt:number//物品数量
}
//商品购买类型
export interface SHOP_BUY_TYPE {
    [id: number]: SHOP_NEED_ITEM[]
}

export enum EM_ITEM_TYPE{
    Diamond = "diamond",    //钻石
    Score="score",   //金币
    GoldBean = "goldBean",  //金豆
    OtherScore = "otherScore",
    Cny="cny",      //人民币
}

export enum EM_SHOP_TYPE {
    Diamond="diamond",//砖石
    Score="score",//金币
    GoldBean="goldBean",//金豆
    Prop="prop",//道具.物品
    Vip="vip",//VIP卡
}

/**
 * 支付方式
 */
 export enum EM_PAY_TYPE {
    WeiChat = "weiChat",//微信
    Alipay="alipay",//支付宝
    Usdt="usdt",//虚拟币
}

export const CN_ITEM_TYPE = {
    "diamond":"鑽石/DO",
    "score":"金幣/Gold",
    "goldBean":"金豆",
    "otherScore":"积分",
    "cny":"$"
}

export const vipSpriteFrameName = {
    "vip1":"3VIP",
    "vip2":"7VIP",
    "vip3":"30VIP",
    "vip4":"90VIP",
    "vip5":"180VIP",
    "vip6":"365VIP",
}

/* bsc配置数据结构
*/
export interface CFG_BSC {
    usdtScore:number,//usdt 兑换砖石比列 
    farl:number,//farl 兑换砖石比列
    min: number; //最小提现
    max: number; //最大提现
    count: number; //每日次数
    free:number,//手续费 0.1百分10 也就是提现10块 只会到账9块
    }

//阿里支付返回数据结构
export interface ALIPAY_RESULT{
    memo:string;
    result:string;
    resultState:ALIPAY_RESULT_STATUS;
}

//阿里支付返回状态码枚举
//https://opendocs.alipay.com/open/204/105302
export enum ALIPAY_RESULT_STATUS{
    /**
     * 成功
     */
    Success = "9000",
    /**
     * 正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态
     */
    Handling = "8000",
    /**
     * 支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态。
     */
    UnknowResult = "6004",
    /**
     * 网络连接出错。
     */
    NetError = "6002",
    /**
     * 用户中途取消。
     */
    UserCancel = "6001",
    /**
     * 订单支付失败。
     */
    Field = "4000",
    /**
     * 其他支付错误。
     */

}

