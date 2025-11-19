export namespace CryptosDefine {
    export const enum msgEvent {
        UserBet = 1,
        End,
    }

    //游戏状态
    export const gameStatus = {
        GAME_SCENE_FREE: 0,          //空闲
        GAME_END: 100,          //结束
    };

    export const CardType = {
        Type_Null: 0,//无类型
        Type_Double: 1,//对子
        Type_Two_Pairs: 2,//两对
        Type_Three: 3,//三条
        Type_Gourd: 4,//葫芦
        Type_Four: 5,//四条
        Type_Five: 6,//五条
    }

    export const CardList = [1, 2, 3, 4, 5];
    export const CardColor = [cc.color(255, 0, 0), cc.color(255, 0, 97), cc.color(255, 0, 199), cc.color(0, 15, 25), cc.color(209, 0, 255)];
}