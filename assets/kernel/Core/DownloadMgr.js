/**
 * 子游戏下载管理
 */
const SubgameManager = require('SubgameManager');

const SubgameState = {
    NONE: 0, //未下载
    NEWEST: 1, // 最新版本
    NEED_UPDATE: 2, //子游要更新
    DOWNLOADING: 3, // 正在下载
    WATING: 4, // 正在等待
}


let DownloadMgr = cc.Class({
    properties: {
        subgameMap: null,
        downloadList: [],
        isDownloading: false, //是否正在下载

    },

    ctor: function() {
        console.log("DownloadMgr ctor")
        this.subgameMap = {}
        onfire.on("DownloadSubgameFinished", this.onDownloadSubgameFinished.bind(this))
    },

    //初始化
    createGameData(gameInfo) {
        const { moduleName, moduleEnName } = gameInfo
        if (cc.sys.isBrowser) { //浏览器就最新，不需要下载
            return { progress: 1, state: SubgameState.NEWEST, moduleEnName, moduleName }
        }
        return { progress: 0, state: SubgameState.NONE, moduleEnName, moduleName }
    },

    //子游戏下载完成
    onDownloadSubgameFinished: function(moduleEnName, success) {
        this.isDownloading = false
        this.downloadList.splice(0, 1)

        //下载完了继续下载剩下的
        if (this.checkDownload()) {
            var moduleEnName = this.downloadList[0]
            this.downloadGame(moduleEnName)
        }
    },

    //增加下载
    addDonwload: function(moduleEnName) {
        if (!this.subgameMap[moduleEnName]) {
            this.subgameMap[moduleEnName] = this.createGameData({ moduleName: moduleEnName, moduleEnName })
        }
        if (this.downloadList.indexOf(moduleEnName) == -1) {
            this.downloadList.push(moduleEnName)
            let gameData = this.getGameData(moduleEnName)
            this.setGameDownloadState(moduleEnName, SubgameState.WATING) //正在等待下载
            onfire.fire("DownlaodSubgameWaiting", gameData)
            if (this.checkDownload()) {
                var moduleEnName = this.downloadList[0]
                this.downloadGame(moduleEnName)
            }

        }
    },

    //检查是否还有下载
    checkDownload: function() {
        return this.downloadList.length > 0 && !this.isDownloading
    },


    //下载游戏
    downloadGame(moduleEnName) {
        var self = this
        this.isDownloading = true
        self.setGamePercent(moduleEnName, 0)
        this.setGameDownloadState(moduleEnName, SubgameState.DOWNLOADING) //正在下载
        let gameData = this.getGameData(moduleEnName)
        onfire.fire("DownlaodSubgameStart", gameData)
        SubgameManager.downloadSubgame(moduleEnName, (progress) => {
            progress = progress || 0
            self.setGamePercent(moduleEnName, progress)
            onfire.fire("DownloadingSubgame", gameData)
        }, (success) => {
            self.setGamePercent(moduleEnName, success ? 1 : 0)
            self.setGameDownloadState(moduleEnName, success ? SubgameState.NEWEST : SubgameState.NONE)
            onfire.fire("DownloadSubgameFinished", gameData)
        });
    },

    //设置游戏状态
    setGameDownloadState(moduleEnName, state) {
        if (!this.subgameMap[moduleEnName]) {
            this.subgameMap[moduleEnName] = this.createGameData({ moduleName: moduleEnName, moduleEnName })
        }
        this.subgameMap[moduleEnName].state = state
    },

    //获取游戏状态
    getGameDownloadState(moduleEnName) {
        console.log("getGameDownloadState",moduleEnName, JSON.stringify( this.subgameMap));
        if (!this.subgameMap[moduleEnName]) {
            this.subgameMap[moduleEnName] = this.createGameData({ moduleName: moduleEnName, moduleEnName })
        }
        
        return this.subgameMap[moduleEnName].state
    },

    //设置下载百分比
    setGamePercent(moduleEnName, progress) {
        this.subgameMap[moduleEnName].progress = progress
    },
    //
    getGameData(moduleEnName) {
        return this.subgameMap[moduleEnName] || {}
    },



    //这里要一个个来初始化 多个会有错误
    startTask() {
        if (this.todoList.length > 0) {
            let moduleEnName = this.todoList.splice(0, 1) //取第一个
            console.log("开始检测子游戏状态", moduleEnName)
            this.getSubgameState(moduleEnName, (subgameName, state) => {
                console.log("获取游戏状态", subgameName,state)
                this.setGameDownloadState(subgameName, state)
                if (!cc.sys.isBrowser) {
                    jsb.fileUtils.setSearchPaths(this.searchPaths); //重置 assetmanager会该表搜索路径
                }
                this.startTask()
            })
        }
    },


    //初始化所有子游戏状态
    initSubgameState(gamelistData) {
        let todoList = [] //列表
        for (var i = 0; i < gamelistData.length; i++) {
            let gameInfo = gamelistData[i]
            let moduleEnName = gameInfo.moduleEnName
            this.subgameMap[moduleEnName] = this.createGameData(gameInfo); // 合并
            todoList.push(moduleEnName);
        }

        this.todoList = todoList;
        //这里要一个个来初始化 多个会有错误

        if (!cc.sys.isBrowser) {
            this.searchPaths =  jsb.fileUtils.getSearchPaths();          

        }

        
        this.startTask();
    },


    //获取子游戏当前的更新状态 cb = (moduleEnName, state) =>void
    getSubgameState(moduleEnName, cb) {
        if (cc.sys.isBrowser) {
            cb && cb(moduleEnName, SubgameState.NEWEST); //浏览器最新
            return
        }
        cc.error('子游戏开始' + moduleEnName);
        if (SubgameManager.isSubgameDownLoad(moduleEnName)) {
            SubgameManager.needUpdateSubgame(moduleEnName, (success, name) => {
                if (success) {
                    cc.error('子游要更新!', name);
                    cb && cb(name, SubgameState.NEED_UPDATE)
                } else {
                    cb && cb(name, SubgameState.NEWEST)
                }
            }, (success, name) => {
                cc.error('子游戏出错了', name);
                cb && cb(name, SubgameState.NONE)
            });
        } else {
            cb && cb(moduleEnName, SubgameState.NONE)
        }
    }

});



module.exports.DownloadMgr = DownloadMgr;
module.exports.SubgameState = SubgameState;