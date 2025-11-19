//音频数据
export const AudioData = {
    bet: "sound/bet",
    blow: "sound/blow",
    click: "sound/click",
    sartplay: "sound/sartplay",
    win: "sound/win",
};

//by_009:音频控制
export const AudioControl = {
    //by_009:播放点击音效
    playBet() {
        audioMgr.playEffect(AudioData.bet, false);
    },

    playWin() {
        audioMgr.playEffect(AudioData.win, false);
    },

    playBlow() {
        audioMgr.playEffect(AudioData.blow, false);
    },

    playSartplay() {
        audioMgr.playEffect(AudioData.sartplay, false);
    },

    playClick() {
        audioMgr.playEffect(AudioData.click, false);
    },
}