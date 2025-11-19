export class prop_mg {

    id: number;

    // @PrimaryGeneratedColumn({comment: "物品类型ID"})
    itemID: number;

    // @Column({comment: "道具类型"})
    type: EM_PROP_TYPE;

    // @Column({comment: "物品描述"})
    describe: string;

    // @Column({comment: "到期天数"})
    expire: number;

    // @Column({comment: "扩展字段1(vip道具就是等级)"})
    extend1: number;

}

/**
 * 道具类型
 */
export enum EM_PROP_TYPE {
    BlindBoxChip = 1,//盲盒碎片
    JiPaiQi = 2,//记牌器
    Score = 3,//金币
    Diamon = 4,//砖石
    GoldBean = 5,//金豆
    otherScore = 6,//其他平台积分
    Card = 7,//英雄卡
    Vip = 8,//vip
    Footprint = 9,//足迹
    Contribution=10,//贡献
}

//配置表结构
export interface Pack_Good {
    [id: number]: prop_mg 
}

//背包结构
export interface DATA_BACK_PACK{
    [itemID:number]:{ cnt:number/*物品数量*/}
}

//道具的图片名

export const NotVipSFName = {
    "1":"manghe",
    "2":"Ddz_btnRecord",
    "3":"jb3",
    "4":"zs3",
    "5":"SY_dou",
    "6":"",
    "7":"",
    "8":"",
    "9":"SY_zuji",
    "10":"SY_huangguan"
};//1、2对应道具类型EM_PROP_TYPE

export const NotVipJieShao = {
    "1":[
    "官方推出的幸運盲盒,可獲得高品質道具獎勵。\nThe official launch of the lucky blind box, can be awarded high-quality props.",
    ],
    "2":[
        "部分游戲内使用的道具。",
    ],
    "3":[
        "金幣是游戲中使用的道具。\nGold coins are props used in games",
    ],
    "4":[
        "",
    ],
    "5":[
        "金豆场游戏对战结算道具，可以用来兑换贡献值和足迹。点击使用和原金币数叠加。",
    ],
    "6":[
        "",
    ],
    "7":[
        "",
    ],
    "8":[
        "",
    ],
    "9":[
        "使用可获得足迹",
    ],
    "10":[
        "使用可获得贡献值",
    ],
}

export const VipSFName = {
    "vip1":"3VIP",
    "vip2":"7VIP",
    "vip3":"30VIP",
    "vip4":"90VIP",
    "vip5":"180VIP",
    "vip6":"365VIP",
    "vip7":"730VIP",
    "vip8":"1500VIP",
}

export const VipOtherName = {
    "vip1":"VIP1 ",
    "vip2":"VIP2 ",
    "vip3":"VIP3 ",
    "vip4":"VIP4 ",
    "vip5":"VIP5 ",
    "vip6":"VIP6 ",
    "vip7":"VIP7 ",
    "vip8":"VIP8 ",
}

// export const VipJieShao = {
//     "vip1":[
//         "1，一级专属会员头像框",
//         "2，签到金币2倍加成",
//         "3，对局胜利后结算加成金币3%  ",
//         "4，游戏内的聊天，表情，互动等可无限使用",
//         "5，特殊会员任务",
//         "6，每天抽取盲盒次数比普通玩家多",
//     ],
//     "vip2":[
//         "1，二级专属会员头像框",
//         "2，签到金币2倍加成",
//         "3，对局胜利后结算加成金币6%  金豆0.01%（万分之一）",
//         "4，游戏内的聊天，表情，互动等可无限使用",
//         "5，特殊会员任务",
//         "6，每天抽取盲盒次数比普通玩家多",
//     ],
//     "vip3":[
//         "1，三级专属会员头像框",
//         "2，签到金币2倍加成",
//         "3，对局胜利后结算加成金币10% 金豆0.01%（万分之一）",
//         "4，游戏内的聊天，表情，互动等可无限使用",
//         "5，特殊会员任务",
//         "6，每天抽取盲盒次数比普通玩家多",
//     ],
//     "vip4":[
//         "1，四级专属会员头像框",
//         "2，签到金币2倍加成",
//         "3，对局胜利后结算加成13% 金豆0.02%（万分之二）",
//         "4，游戏内的聊天，表情，互动等可无限使用",
//         "5，特殊会员任务",
//         "6，每天抽取盲盒次数比普通玩家多",
//     ],
//     "vip5":[
//         "1，五级专属会员头像框",
//         "2，签到金币2倍加成",
//         "3，对局胜利后结算加成16% 金豆0.02%（万分之二）  ",
//         "4，游戏内的聊天，表情，互动等可无限使用",
//         "5，特殊会员任务",
//         "6，每天抽取盲盒次数比普通玩家多",
//     ],
//     "vip6":[
//         "1，六级专属会员头像框",
//         "2，签到金币2倍加成",
//         "3，对局胜利后结算加成20% 金豆0.03%（万分之三）",
//         "4，游戏内的聊天，表情，互动等可无限使用",
//         "5，特殊会员任务",
//         "6，每天抽取盲盒次数比普通玩家多",
//     ],
// }

// "vip（试用三天）":[
//             "1，专属会员头像框",
//             "2，签到金币2倍加成",
//             "3，对局胜利后结算加成金币1%  ",
//             "4，游戏内的聊天，表情，互动等可无限使用",
//             "5，特殊会员任务",
    
//         ],
//         "vip":[
//             "1，专属会员头像框",
//             "2，签到金币2倍加成",
//             "3，对局胜利后结算加成金币5%   ",
//             "4，游戏内的聊天，表情，互动等可无限使用",
//             "5，特殊会员任务",
//     ]


export const VipJieShao = {
    "vip1":[
        "",
        "VIP等級分爲LV1-LV8，LV1-LV3可在商店購買，LV4-Lv8需要盲盒開啓，VIP可在比賽對局中獲得額外金幣，VIP能给上级貢獻金幣。",
        "",
        "LV1：對局比赛中额外奖励金幣+3%，给上级貢獻1%",
        "LV2：對局比赛中额外奖励金幣+5%，给上级貢獻3%",
        "LV3：對局比赛中额外奖励金幣+10%，给上级貢獻5%",
        "LV4：對局比赛中额外奖励金幣+15%，给上级貢獻7%",
        "LV5：對局比赛中额外奖励金幣+20%，给上级貢獻9%",
        "LV6：對局比赛中额外奖励金幣+25%，给上级貢獻11%",
        "LV6：對局比赛中额外奖励金幣+30%，给上级貢獻13%",
        "LV6：對局比赛中额外奖励金幣+40%，给上级貢獻15%",
        "",
        "English",
        "",
        "VIP level is divided into LV1-LV8, LV1-LV3 can be purchased at the store, LV4-LV8 needs to be opened blind box, VIP can get extra gold coins in the game, VIP can receive the contribution of junior friends gold coins.",
        "",
        "LV1: on-board gold coin + 3% , Contribute to the superior gold coin + 1%",
        "LV2: on-board gold coin + 5% , Contribute to the superior gold coin + 3%",
        "LV3: on-board gold coin + 10% , Contribute to the superior gold coin + 5%",
        "LV4: on-board gold coin + 15% , Contribute to the superior gold coin + 7%",
        "LV5: on-board gold coin + 20% , Contribute to the superior gold coin + 9%",
        "LV6: on-board gold coin + 25% , Contribute to the superior gold coin + 11%", 
        "LV7: gold coin for game + 30% , Contribute to the superior gold coin + 13%",
        "LV8: gold coin for game + 40% , Contribute to the superior gold coin + 15%",
    ],
    "vip2":[
        "",
        "VIP等級分爲LV1-LV8，LV1-LV3可在商店購買，LV4-Lv8需要盲盒開啓，VIP可在比賽對局中獲得額外金幣，VIP能给上级貢獻金幣。",
        "",
        "LV1：對局比赛中额外奖励金幣+3%，给上级貢獻1%",
        "LV2：對局比赛中额外奖励金幣+5%，给上级貢獻3%",
        "LV3：對局比赛中额外奖励金幣+10%，给上级貢獻5%",
        "LV4：對局比赛中额外奖励金幣+15%，给上级貢獻7%",
        "LV5：對局比赛中额外奖励金幣+20%，给上级貢獻9%",
        "LV6：對局比赛中额外奖励金幣+25%，给上级貢獻11%",
        "LV6：對局比赛中额外奖励金幣+30%，给上级貢獻13%",
        "LV6：對局比赛中额外奖励金幣+40%，给上级貢獻15%",
        "",
        "English",
        "",
        "VIP level is divided into LV1-LV8, LV1-LV3 can be purchased at the store, LV4-LV8 needs to be opened blind box, VIP can get extra gold coins in the game, VIP can receive the contribution of junior friends gold coins.",
        "",
        "LV1: on-board gold coin + 3% , Contribute to the superior gold coin + 1%",
        "LV2: on-board gold coin + 5% , Contribute to the superior gold coin + 3%",
        "LV3: on-board gold coin + 10% , Contribute to the superior gold coin + 5%",
        "LV4: on-board gold coin + 15% , Contribute to the superior gold coin + 7%",
        "LV5: on-board gold coin + 20% , Contribute to the superior gold coin + 9%",
        "LV6: on-board gold coin + 25% , Contribute to the superior gold coin + 11%", 
        "LV7: gold coin for game + 30% , Contribute to the superior gold coin + 13%",
        "LV8: gold coin for game + 40% , Contribute to the superior gold coin + 15%",
    ],
    "vip3":[
        "",
        "VIP等級分爲LV1-LV8，LV1-LV3可在商店購買，LV4-Lv8需要盲盒開啓，VIP可在比賽對局中獲得額外金幣，VIP能给上级貢獻金幣。",
        "",
        "LV1：對局比赛中额外奖励金幣+3%，给上级貢獻1%",
        "LV2：對局比赛中额外奖励金幣+5%，给上级貢獻3%",
        "LV3：對局比赛中额外奖励金幣+10%，给上级貢獻5%",
        "LV4：對局比赛中额外奖励金幣+15%，给上级貢獻7%",
        "LV5：對局比赛中额外奖励金幣+20%，给上级貢獻9%",
        "LV6：對局比赛中额外奖励金幣+25%，给上级貢獻11%",
        "LV6：對局比赛中额外奖励金幣+30%，给上级貢獻13%",
        "LV6：對局比赛中额外奖励金幣+40%，给上级貢獻15%",
        "",
        "English",
        "",
        "VIP level is divided into LV1-LV8, LV1-LV3 can be purchased at the store, LV4-LV8 needs to be opened blind box, VIP can get extra gold coins in the game, VIP can receive the contribution of junior friends gold coins.",
        "",
        "LV1: on-board gold coin + 3% , Contribute to the superior gold coin + 1%",
        "LV2: on-board gold coin + 5% , Contribute to the superior gold coin + 3%",
        "LV3: on-board gold coin + 10% , Contribute to the superior gold coin + 5%",
        "LV4: on-board gold coin + 15% , Contribute to the superior gold coin + 7%",
        "LV5: on-board gold coin + 20% , Contribute to the superior gold coin + 9%",
        "LV6: on-board gold coin + 25% , Contribute to the superior gold coin + 11%", 
        "LV7: gold coin for game + 30% , Contribute to the superior gold coin + 13%",
        "LV8: gold coin for game + 40% , Contribute to the superior gold coin + 15%",
    ],
    "vip4":[
        "",
        "VIP等級分爲LV1-LV8，LV1-LV3可在商店購買，LV4-Lv8需要盲盒開啓，VIP可在比賽對局中獲得額外金幣，VIP能给上级貢獻金幣。",
        "",
        "LV1：對局比赛中额外奖励金幣+3%，给上级貢獻1%",
        "LV2：對局比赛中额外奖励金幣+5%，给上级貢獻3%",
        "LV3：對局比赛中额外奖励金幣+10%，给上级貢獻5%",
        "LV4：對局比赛中额外奖励金幣+15%，给上级貢獻7%",
        "LV5：對局比赛中额外奖励金幣+20%，给上级貢獻9%",
        "LV6：對局比赛中额外奖励金幣+25%，给上级貢獻11%",
        "LV6：對局比赛中额外奖励金幣+30%，给上级貢獻13%",
        "LV6：對局比赛中额外奖励金幣+40%，给上级貢獻15%",
        "",
        "English",
        "",
        "VIP level is divided into LV1-LV8, LV1-LV3 can be purchased at the store, LV4-LV8 needs to be opened blind box, VIP can get extra gold coins in the game, VIP can receive the contribution of junior friends gold coins.",
        "",
        "LV1: on-board gold coin + 3% , Contribute to the superior gold coin + 1%",
        "LV2: on-board gold coin + 5% , Contribute to the superior gold coin + 3%",
        "LV3: on-board gold coin + 10% , Contribute to the superior gold coin + 5%",
        "LV4: on-board gold coin + 15% , Contribute to the superior gold coin + 7%",
        "LV5: on-board gold coin + 20% , Contribute to the superior gold coin + 9%",
        "LV6: on-board gold coin + 25% , Contribute to the superior gold coin + 11%", 
        "LV7: gold coin for game + 30% , Contribute to the superior gold coin + 13%",
        "LV8: gold coin for game + 40% , Contribute to the superior gold coin + 15%",
    ],
    "vip5":[
        "",
        "VIP等級分爲LV1-LV8，LV1-LV3可在商店購買，LV4-Lv8需要盲盒開啓，VIP可在比賽對局中獲得額外金幣，VIP能给上级貢獻金幣。",
        "",
        "LV1：對局比赛中额外奖励金幣+3%，给上级貢獻1%",
        "LV2：對局比赛中额外奖励金幣+5%，给上级貢獻3%",
        "LV3：對局比赛中额外奖励金幣+10%，给上级貢獻5%",
        "LV4：對局比赛中额外奖励金幣+15%，给上级貢獻7%",
        "LV5：對局比赛中额外奖励金幣+20%，给上级貢獻9%",
        "LV6：對局比赛中额外奖励金幣+25%，给上级貢獻11%",
        "LV6：對局比赛中额外奖励金幣+30%，给上级貢獻13%",
        "LV6：對局比赛中额外奖励金幣+40%，给上级貢獻15%",
        "",
        "English",
        "",
        "VIP level is divided into LV1-LV8, LV1-LV3 can be purchased at the store, LV4-LV8 needs to be opened blind box, VIP can get extra gold coins in the game, VIP can receive the contribution of junior friends gold coins.",
        "",
        "LV1: on-board gold coin + 3% , Contribute to the superior gold coin + 1%",
        "LV2: on-board gold coin + 5% , Contribute to the superior gold coin + 3%",
        "LV3: on-board gold coin + 10% , Contribute to the superior gold coin + 5%",
        "LV4: on-board gold coin + 15% , Contribute to the superior gold coin + 7%",
        "LV5: on-board gold coin + 20% , Contribute to the superior gold coin + 9%",
        "LV6: on-board gold coin + 25% , Contribute to the superior gold coin + 11%", 
        "LV7: gold coin for game + 30% , Contribute to the superior gold coin + 13%",
        "LV8: gold coin for game + 40% , Contribute to the superior gold coin + 15%",
    ],
    "vip6":[
        "",
        "VIP等級分爲LV1-LV8，LV1-LV3可在商店購買，LV4-Lv8需要盲盒開啓，VIP可在比賽對局中獲得額外金幣，VIP能给上级貢獻金幣。",
        "",
        "LV1：對局比赛中额外奖励金幣+3%，给上级貢獻1%",
        "LV2：對局比赛中额外奖励金幣+5%，给上级貢獻3%",
        "LV3：對局比赛中额外奖励金幣+10%，给上级貢獻5%",
        "LV4：對局比赛中额外奖励金幣+15%，给上级貢獻7%",
        "LV5：對局比赛中额外奖励金幣+20%，给上级貢獻9%",
        "LV6：對局比赛中额外奖励金幣+25%，给上级貢獻11%",
        "LV6：對局比赛中额外奖励金幣+30%，给上级貢獻13%",
        "LV6：對局比赛中额外奖励金幣+40%，给上级貢獻15%",
        "",
        "English",
        "",
        "VIP level is divided into LV1-LV8, LV1-LV3 can be purchased at the store, LV4-LV8 needs to be opened blind box, VIP can get extra gold coins in the game, VIP can receive the contribution of junior friends gold coins.",
        "",
        "LV1: on-board gold coin + 3% , Contribute to the superior gold coin + 1%",
        "LV2: on-board gold coin + 5% , Contribute to the superior gold coin + 3%",
        "LV3: on-board gold coin + 10% , Contribute to the superior gold coin + 5%",
        "LV4: on-board gold coin + 15% , Contribute to the superior gold coin + 7%",
        "LV5: on-board gold coin + 20% , Contribute to the superior gold coin + 9%",
        "LV6: on-board gold coin + 25% , Contribute to the superior gold coin + 11%", 
        "LV7: gold coin for game + 30% , Contribute to the superior gold coin + 13%",
        "LV8: gold coin for game + 40% , Contribute to the superior gold coin + 15%",
    ],
    "vip7":[
        "",
        "VIP等級分爲LV1-LV8，LV1-LV3可在商店購買，LV4-Lv8需要盲盒開啓，VIP可在比賽對局中獲得額外金幣，VIP能给上级貢獻金幣。",
        "",
        "LV1：對局比赛中额外奖励金幣+3%，给上级貢獻1%",
        "LV2：對局比赛中额外奖励金幣+5%，给上级貢獻3%",
        "LV3：對局比赛中额外奖励金幣+10%，给上级貢獻5%",
        "LV4：對局比赛中额外奖励金幣+15%，给上级貢獻7%",
        "LV5：對局比赛中额外奖励金幣+20%，给上级貢獻9%",
        "LV6：對局比赛中额外奖励金幣+25%，给上级貢獻11%",
        "LV6：對局比赛中额外奖励金幣+30%，给上级貢獻13%",
        "LV6：對局比赛中额外奖励金幣+40%，给上级貢獻15%",
        "",
        "English",
        "",
        "VIP level is divided into LV1-LV8, LV1-LV3 can be purchased at the store, LV4-LV8 needs to be opened blind box, VIP can get extra gold coins in the game, VIP can receive the contribution of junior friends gold coins.",
        "",
        "LV1: on-board gold coin + 3% , Contribute to the superior gold coin + 1%",
        "LV2: on-board gold coin + 5% , Contribute to the superior gold coin + 3%",
        "LV3: on-board gold coin + 10% , Contribute to the superior gold coin + 5%",
        "LV4: on-board gold coin + 15% , Contribute to the superior gold coin + 7%",
        "LV5: on-board gold coin + 20% , Contribute to the superior gold coin + 9%",
        "LV6: on-board gold coin + 25% , Contribute to the superior gold coin + 11%", 
        "LV7: gold coin for game + 30% , Contribute to the superior gold coin + 13%",
        "LV8: gold coin for game + 40% , Contribute to the superior gold coin + 15%",
    ],
    "vip8":[
        "",
        "VIP等級分爲LV1-LV8，LV1-LV3可在商店購買，LV4-Lv8需要盲盒開啓，VIP可在比賽對局中獲得額外金幣，VIP能给上级貢獻金幣。",
        "",
        "LV1：對局比赛中额外奖励金幣+3%，给上级貢獻1%",
        "LV2：對局比赛中额外奖励金幣+5%，给上级貢獻3%",
        "LV3：對局比赛中额外奖励金幣+10%，给上级貢獻5%",
        "LV4：對局比赛中额外奖励金幣+15%，给上级貢獻7%",
        "LV5：對局比赛中额外奖励金幣+20%，给上级貢獻9%",
        "LV6：對局比赛中额外奖励金幣+25%，给上级貢獻11%",
        "LV6：對局比赛中额外奖励金幣+30%，给上级貢獻13%",
        "LV6：對局比赛中额外奖励金幣+40%，给上级貢獻15%",
        "",
        "English",
        "",
        "VIP level is divided into LV1-LV8, LV1-LV3 can be purchased at the store, LV4-LV8 needs to be opened blind box, VIP can get extra gold coins in the game, VIP can receive the contribution of junior friends gold coins.",
        "",
        "LV1: on-board gold coin + 3% , Contribute to the superior gold coin + 1%",
        "LV2: on-board gold coin + 5% , Contribute to the superior gold coin + 3%",
        "LV3: on-board gold coin + 10% , Contribute to the superior gold coin + 5%",
        "LV4: on-board gold coin + 15% , Contribute to the superior gold coin + 7%",
        "LV5: on-board gold coin + 20% , Contribute to the superior gold coin + 9%",
        "LV6: on-board gold coin + 25% , Contribute to the superior gold coin + 11%", 
        "LV7: gold coin for game + 30% , Contribute to the superior gold coin + 13%",
        "LV8: gold coin for game + 40% , Contribute to the superior gold coin + 15%",
    ],
}