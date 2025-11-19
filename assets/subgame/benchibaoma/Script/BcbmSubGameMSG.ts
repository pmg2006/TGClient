import { gameConst } from "../../../kernel/Core/KernelDefine"

export namespace BcbmSubGameMSG {


    //     var n = require("../kernel/Core/KernelDefine");
    export const GameDefine = {
        PLAYER_COUNT: 5
    }

    export const subGameMSG = {
        GS_GAME_FREE: gameConst.GAME_STATUS_FREE,
        GS_WAIT321: gameConst.GAME_STATUS_PLAY,
        GS_ADD_JETTON: gameConst.GAME_STATUS_PLAY + 1,
        GS_GAME_RESULT: gameConst.GAME_STATUS_PLAY + 2,
        SUB_S_BANKER_QUEUE: 101,
        SUB_S_SWITCH_BANKER: 102,
        SUB_S_GAME_RECORD: 104,
        SUB_S_ADD_JETTON: 105,
        SUB_S_BANKEY_FREE: 106,
        SUB_S_XIAN_FREE: 107,
        SUB_S_GAME_START: 108,
        SUB_S_START_BET: 109,
        SUB_S_GAME_RESULT: 110,
        SUB_S_GAME_HINT: 111,
        SUB_S_REPLY_STOCK: 112,
        SUB_C_ADD_JETTON: 1,
        SUB_C_APPLY_BANKER: 2,
        SUB_C_CANCEL_BANKER: 3,
        SUB_C_QUERY_STOCK: 4
    }
}