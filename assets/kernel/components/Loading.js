var KernelData = require("KernelData");
var ClientKernel = require("ClientKernel");

var AudioMgr = require("AudioMgr")

cc.Class({
    extends: cc.Component,

    properties: {

        label: {
            default: null,
            type: cc.Label,
        },

    },


    onLoad() {
        this.init();
        this.bindObj = [];
        this.bindObj.push(onfire.on("onLogonSuccess", this.onLogonSuccess.bind(this)))

    },

    onDestroy() {
        for (var i = 0; i < this.bindObj.length; i++) {
            onfire.un(this.bindObj[i])
        }

    },


    init() {
        this.bar.progress = 0;
        this.label.string = "";
        let replayData = cc.sys.localStorage.getItem("replayData") 
        if(replayData)
        {   
            replayData = JSON.parse(replayData)
            clientKernel.initReplayData(replayData)
            this.onLogonSuccess()
            
        }
        else{
            clientKernel.logonSubgame() //登录子游戏  登录成功会进 onLogonSuccess
        }
        
    },

    //登录成功
    onLogonSuccess() {
        //先加载音效
        audioMgr.loadAudioDir("sound", () => {            
            this.loadGame()
        })

    },

    loadGame() {

        let self = this;
        let onProgress = function(completedCount, totalCount, item) {
            var progress = 1;
            if (totalCount != 0) {
                progress = (completedCount / totalCount).toFixed(2);
            }

            //这里显示loading进度
            self.bar.progress = progress;
            self.label.string = (progress * 100).toFixed() + "%"

        };

        //预加载场景
        cc.director.preloadScene("game", onProgress, function() {
            self.scheduleOnce(() => {
                cc.director.loadScene("game");
            }, 0.3);

        });
    },

});