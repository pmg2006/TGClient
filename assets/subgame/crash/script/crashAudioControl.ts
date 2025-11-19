const rootPath = "sound/";

export const CrashAudioControl = {
    //by_009:播放点击音效
    playClick() {
        let path = rootPath + "click";
        audioMgr.playEffect(path, false);
    },

    playSartPlay() {
        let path = rootPath + "sartPlay";
        audioMgr.playEffect(path, false)
    },

    playBomb() {
        let path = rootPath + "blow";
        audioMgr.playEffect(path, false)
    },

    playBet() {
        let path = rootPath + "bet";
        audioMgr.playEffect(path, false)
    },

    //by_010:赢
    playWin() {
        let path = rootPath + "win";
        audioMgr.playEffect(path, false)
    },

}
