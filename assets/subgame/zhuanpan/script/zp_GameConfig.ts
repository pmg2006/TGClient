
export namespace zp_GameConfig {
    export const gameName = "zp_";
    export const SystemUI = {};
    export let UIData = {
            game: {
                url: "zhuanpan/UI/" + gameName + "UIGame",
                parent: "Canvas",
                zIndex: 1,
                preload: !0
            },
            menu: {
                url: "zhuanpan/UI/" + gameName + "UIMenu",
                parent: "Canvas",
                zIndex: 3,
                preload: !0
            },
            zp_jetton: {
                url: "zhuanpan/Prefabs/" + gameName + "jetton",
                parent: "Canvas",
                zIndex: 20,
                preload: !0
            }
        };
    export const AudioData = {
        bgm: "zhuanpan/sound/bg_music",
        clock_count: "zhuanpan/sound/clock_count",
        fail: "zhuanpan/sound/fail",
        sendCard: "zhuanpan/sound/sendCard",
        win: "zhuanpan/sound/win",
        startBet: "zhuanpan/sound/startBet",
        turnBanker: "zhuanpan/sound/turnBanker",
        betting: "zhuanpan/sound/betting",
        fq_bg: "zhuanpan/soundsame/sound-fly-bg",
        fly_zp: "zhuanpan/soundsame/sound-fly-zp",
        fq_sound_lose: "zhuanpan/soundpublic/sound-lose",
        fq_sound_win: "zhuanpan/soundpublic/sound-win",
        fq_startBet: "zhuanpan/soundpublic/sound-start-wager",
        fq_endWager: "zhuanpan/soundpublic/sound-end-wager",
        fq_bethigh: "zhuanpan/soundpublic/sound-bethigh",
        fq_betlow: "zhuanpan/soundpublic/sound-betlow",
        fq_zhuang1: "zhuanpan/soundpublic/zhuang-1",
        fq_jetton: "zhuanpan/soundpublic/sound-jetton",
        fq_button: "zhuanpan/soundpublic/sound-button",
        fq_countdown: "zhuanpan/soundpublic/sound-countdown"
    };
    
    export const gameConfig = {
        UIData: UIData,
        AudioData: AudioData
    }
}