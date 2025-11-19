const rootPath = "hall/sound/";

//by_009:音频控制
export const AudioControl = {
    //by_009:播放点击音效
    playClick() {
        let path = rootPath+"click";
        audioMgr.playEffect(path, false);
    },

    //by_009:播放背景音乐
    playBGM() {
        let path = rootPath+"bg";
        audioMgr.playMusic(path);
    },

    //by_009:播放完成
    playFinish() {
        let path = rootPath+"finish";
        audioMgr.playEffect(path);
    }

}
