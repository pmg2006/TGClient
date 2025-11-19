/**
 * 音效管理器， 对cc.audioEngine的封装
 */

export class AudioMgr {
    audioClipMap = {}
    bgm_on = true
    effect_on = true
    bgm = null
    bindObj = []

    constructor() {
        this.audioClipMap = {} //文件夹下的资源
        this.bgm_on = (cc.sys.localStorage.getItem("bgm_on") || "true") == "true"
        this.effect_on = (cc.sys.localStorage.getItem("effect_on") || "true") == "true"
        this.bgm = null
        this.bindObj = []
    }


    onDestroy() {
        this.releaseAll()
    }
    //背景音乐是否打开
    isBgmOpen() {
        return this.bgm_on || false
    }
    //音效是否打开
    isEffectOpen() {
        return this.effect_on || false
    }

    //加载dirName下所有的音频 加载完回调
    loadAudioDir(dirName, callback) {
        // 加载 sound 目录下所有 AudioClip，并且获取它们的路径
        cc.loader.loadResDir(dirName, cc.AudioClip, (err, assets, urls) => {
            if (err) {
                console.error("加载错误")
                return
            }
            for (var i = 0; i < urls.length; ++i) {
                var url = urls[i]
                this.audioClipMap[url] = assets[i]

            }
            this.openBgm(this.bgm_on)
            this.openEffect(this.effect_on)
            callback()
        });
    }

    //释放所有AudioMgr加载的音效
    releaseAll() {
        this.stopAll()
        for (let i = 0; i < this.bindObj.length; i++) {
            onfire.un(this.bindObj[i])
        }

        for (const key in this.audioClipMap) {
            var sound = this.audioClipMap[key]
            cc.loader.releaseAsset(sound);
        }


    }

    //停止所有音乐
    stopAll() {
        cc.audioEngine.stopMusic();
        cc.audioEngine.stopAllEffects();
    }

    getMusicVolume() {
        return cc.audioEngine.getMusicVolume();
    }

    setMusicVolume(audioNum) {
        cc.audioEngine.setMusicVolume(audioNum);
    }

    getEffectsVolume() {
        return cc.audioEngine.getEffectsVolume();
    }

    setEffectsVolume(audioNum) {
        cc.audioEngine.setEffectsVolume(audioNum);
    }

    //bgm开关
    openBgm(on) {
        if (on && this.bgm) {
            cc.audioEngine.playMusic(this.bgm, true);
        } else {
            cc.audioEngine.stopMusic();
        }
        this.bgm_on = on
        cc.sys.localStorage.setItem("bgm_on", on);

    }

    //音效开关
    openEffect(on) {
        if (!on) {
            cc.audioEngine.stopAllEffects(); //停止所有
        }
        this.effect_on = on
        cc.sys.localStorage.setItem("effect_on", on);
    }

    //播放背景音乐
    //music: cc.AudioClip 或者AudioMgr加载的音效资源路径
    playMusic(music) {
        var clip = null
        if ("string" === typeof music) { //string 路径播放
            if (this.audioClipMap[music]) {
                clip = this.audioClipMap[music]
            } else {
                console.log("你要播放的音乐不存在：", music)
            }
        } else if (music instanceof cc.AudioClip) {
            clip = music
        }

        if (clip) {
            this.bgm = clip
        } else {
            console.log("背景音乐错误null")
            return
        }
        if (!this.isBgmOpen()) return; //背景音乐静音

        cc.audioEngine.stopMusic(); //怕有很多个music
        return cc.audioEngine.playMusic(this.bgm, true);
    }

    //播放音效 返回effectID
    //effect: cc.AudioClip 或者AudioMgr加载的音效资源路径
    playEffect(effect, ...args) {
        if (!this.isEffectOpen()) return //音效静音


        var clip = null
        if ("string" === typeof effect) { //string 路径播放
            if (this.audioClipMap[effect]) {
                clip = this.audioClipMap[effect]
            }
        } else if (effect instanceof cc.AudioClip) {
            clip = effect
        }

        if (!clip) {
            console.log("你要播放的音乐不存在：", effect)
            return
        }

         //@ts-ignore
        return cc.audioEngine.playEffect(clip, ...args);

    }

    stopEffect(...args) {
        //@ts-ignore
        cc.audioEngine.stopEffect(...args);
    }

}

