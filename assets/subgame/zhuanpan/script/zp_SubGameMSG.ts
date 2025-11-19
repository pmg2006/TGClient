import { gameConst } from "../../../kernel/Core/KernelDefine";

// e[e.GS_GAME_FREE = gameConst.GAME_STATUS_FREE] = "GS_GAME_FREE", e[e.GS_ADD_JETTON = n.gameConst.GAME_STATUS_PLAY] = "GS_ADD_JETTON", e[e.GS_GAME_RESULT = n.gameConst.GAME_STATUS_PLAY + 1] = "GS_GAME_RESULT", e[e.SUB_S_GAME_START = 100] = "SUB_S_GAME_START", e[e.SUB_S_GAME_RESULT = 101] = "SUB_S_GAME_RESULT", e[e.SUB_S_ADD_JETTION = 102] = "SUB_S_ADD_JETTION", e[e.SUB_S_BANKER_QUEUE = 103] = "SUB_S_BANKER_QUEUE", e[e.SUB_S_XIAN_FLEE = 104] = "SUB_S_XIAN_FLEE", e[e.SUB_S_BANKER_FLEE = 105] = "SUB_S_BANKER_FLEE", e[e.SUB_S_GAME_FREE = 106] = "SUB_S_GAME_FREE", e[e.SUB_S_GAME_TIP = 111] = "SUB_S_GAME_TIP", e[e.SUB_C_ADD_JETTION = 1] = "SUB_C_ADD_JETTION"
          


export namespace zp_SubGameMSG {
   export const GameDefine = {
        PLAYER_COUNT: 5
    };
    
   export const subGameMSG = {
        GS_GAME_FREE: 0,
        GS_ADD_JETTON: 1,
        GS_GAME_RESULT: 2,
        SUB_S_GAME_START: 100,
        SUB_S_GAME_RESULT: 101,
        SUB_S_ADD_JETTION: 102,
        SUB_S_BANKER_QUEUE: 103,
        SUB_S_XIAN_FLEE: 104,
        SUB_S_BANKER_FLEE: 105,
        SUB_S_GAME_FREE: 106,
        SUB_S_GAME_TIP: 111,
        SUB_C_ADD_JETTION: 1
    };
}