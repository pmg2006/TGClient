export namespace BcbmGameConfig {
    export const SystemUI = {}

    export const UIData = {
        game: {
            url: "benchibaoma/UI/UIGame",
            parent: "Canvas",
            zIndex: 1,
            preload: !0
        },
        roominfo: {
            url: "benchibaoma/UI/UIRoominfo",
            parent: "Canvas",
            zIndex: 2,
            preload: !0
        },
        menu: {
            url: "benchibaoma/UI/UIMenu",
            parent: "Canvas",
            zIndex: 3,
            preload: !0
        }
    }

    export const AudioData = {
        bgm: "benchibaoma/sound/bg_music",
        clock_count: "benchibaoma/sound/clock_count",
        fail: "benchibaoma/sound/fail",
        sendCard: "benchibaoma/sound/sendCard",
        win: "benchibaoma/sound/win",
        startBet: "benchibaoma/sound/startBet",
        turnBanker: "benchibaoma/sound/turnBanker",
        betting: "benchibaoma/sound/betting",
        endBet: "benchibaoma/sound/sound-end-wager",
        btnturn: "benchibaoma/sound/sound-car-turn",
        getglod: "benchibaoma/sound/sound-get-gold",
        btnturndown: "benchibaoma/sound/sound-car-turn-end",
        clock: "benchibaoma/sound/sound-clock-count",
        moon: "benchibaoma/sound/moon"
    }
    export const gameConfig = {
        UIData: UIData,
        AudioData: AudioData
    }
}