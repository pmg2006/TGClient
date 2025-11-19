export namespace CrashDefine {
    export const enum msgEvent {
        StartBet = 1,
        UserBet,
        End,
    }

    //游戏状态
    export const gameStatus = {
        GAME_SCENE_FREE: 0,          //空闲
        GAME_END: 100,          //结束
    };

    export type History = {
        bWin: boolean,
        time: number,
        bet: number,
        beishu: number,
        endBeishu: number,
        score: number
    }
}

