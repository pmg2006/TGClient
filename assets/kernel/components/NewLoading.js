
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label,
        },
    },

    start() {
        this.bindObj = [];
        this.bindObj.push(onfire.on("onLogonSuccess", this.onLogonSuccess.bind(this)))
        this.init();
    },

    onDestroy() {
        for (var i = 0; i < this.bindObj.length; i++) {
            onfire.un(this.bindObj[i])
        }
    },

    init() {
        this.bar = this.node.getChildByName("Bar").getComponent("Bar")
        this.setProgress(0)
        let replayData = cc.sys.localStorage.getItem("replayData")
        if (replayData) {
            replayData = JSON.parse(replayData)
            clientKernel.initReplayData(replayData)
        }
        clientKernel.sendLogonMsg()
    },

    setProgress(progress) {
        if (this.bar) {
            this.bar.progress = progress
        }
        this.label.string = (progress * 100).toFixed() + "%"
    },

    //登录成功
    onLogonSuccess() {
        clientKernel.addGameSink(KernelData.moduleEnName)
        GameSink.onBeforePreload(this.loadGame.bind(this))
    },

    loadGame() {
        let onProgress = (completedCount, totalCount, item) => {
            var progress = 1;
            if (totalCount != 0) {
                progress = (completedCount / totalCount).toFixed(2);
            }
            this.setProgress(progress)
        };
        //预加载场景
        let gameSceneName = KernelData.moduleEnName + "_game"
        console.log("开始加载游戏场景",gameSceneName)
        cc.director.preloadScene(gameSceneName, onProgress, () => {
            cc.director.loadScene(gameSceneName,()=>{
                GameSink.startGame()
            });
        });
    },


        

});