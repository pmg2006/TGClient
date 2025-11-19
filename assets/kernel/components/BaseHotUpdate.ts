const { ccclass, property } = cc._decorator;
import GameTools from "../GameTools";
import GameConfig from "../Base/GameConfig";
import { GameData } from "../../main/script/GameData";
import Utils, { KWAI_EVENT_TYPES } from "../Core/extend/Utils";

declare global {
    interface Window { ip: any; }
}

@ccclass
export default abstract class BaseHotUpdate extends cc.Component {
    @property({ type: cc.Asset })
    manifestUrl: cc.Asset = null;

    @property({ type: cc.Asset })
    debugManifestUrl: cc.Asset = null;

    android_version = "2.0.0";
    ios_version = "2.0.0";

    SHARE_DOWNLOAD_URL: string = "";

    private _storagePath;
    private _am;
    private _needUpdate: boolean;
    private _checkListener;
    private _updateListener;
    private _failCount: number;
    private _updating: boolean = false;
    private _canRetry: boolean;


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    }

    start() {
        if(cc.sys.isMobile) {
            //console.log("当前是移动端");
            //cc.view.setDesignResolutionSize(cc.winSize.width, cc.winSize.width / 16 * 9, cc.ResolutionPolicy.FIXED_WIDTH);
        } else {
            console.log("当前是PC端");
            cc.view.setDesignResolutionSize(cc.winSize.width, cc.winSize.height, cc.ResolutionPolicy.SHOW_ALL);
        }
        Utils.Instance.initKwai();
        Utils.Instance.sendKwaiEvent(KWAI_EVENT_TYPES.EVENT_CONTENT_VIEW);

    }

    /**
     * 检查游戏的大版本更新
     *
     * @protected
     * @returns true需要大版本更新，false反之
     * @memberof BaseHotUpdate
     */
    protected checkGameVersion(): boolean {
        if (CC_EDITOR || cc.sys.isBrowser) {
            console.log("编辑模式不需要更新")
            this.continueGame();
            return false;
        }

        if(GameConfig.IS_DEBUG_B && this.debugManifestUrl){
            this.manifestUrl = this.debugManifestUrl;
        }

        //检查大版本更新
        let tips = "游戏版本更新，点击确定后跳转到下载页面，请务必先删除应用，然后再重新下载";
        let serVersion = this.android_version;
        if (cc.sys.os === cc.sys.OS_IOS) {
            serVersion = this.ios_version;
        }

        let curVersion = cc.xkNative.getVersionCode();
        if (!curVersion) curVersion = "0.0.1";
        console.log("当前版本号", curVersion);
        if (GameTools.versionCompareHandle(curVersion, serVersion) < 0) {
            console.log("需要大版本更新");
            UIHelper.MessageBox(tips, () => {
                cc.sys.openURL(this.SHARE_DOWNLOAD_URL);
            })
            return true;
        }

        this.startGameUpdate();
        return false;
    }

    private initUpdate(){
        if (!cc.sys.isNative) {
            this.continueGame();
            return;
        }
    }

    protected startGameUpdate() {

    //下面这段亮起就是关闭热更新
        // Hot update is only available in Native build
        this.continueGame();
        return;

        
    //下面这段亮起就是开启热更新，
        if (!cc.sys.isNative) {
            this.continueGame();
            return;
        }

        console.log("------------------------ ",GameConfig.IS_DEBUG_B,GameConfig)
        if(GameConfig.IS_DEBUG_B && this.debugManifestUrl){
            this.manifestUrl = this.debugManifestUrl;
        }

        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'fangkahall');
        console.log('Storage path for remote asset : ' + this._storagePath);

        // Setup your own version compare handler, versionA and B is versions in string
        // if the return value greater than 0, versionA is greater than B,
        // if the return value equals 0, versionA equals to B,
        // if the return value smaller than 0, versionA is smaller than B.
        let versionCompareHandle = function (versionA, versionB) {
            console.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
            const vA = versionA.split('.');
            const vB = versionB.split('.');
            for (let i = 0; i < vA.length; ++i) {
                const a = parseInt(vA[i]);
                const b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                } else {
                    return a - b;
                }
            }
            if (vB.length > vA.length) {
                return -1;
            } else {
                return 0;
            }
        };

        const self = this;
        // Init with empty manifest url for testing custom manifest
        this._am = new jsb.AssetsManager('', this._storagePath, versionCompareHandle);
        // Setup the verification callback, but we don't have md5 check function yet, so only print some message
        // Return true if the verification passed, otherwise return false
        this._am.setVerifyCallback(function (path, asset) {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            const compressed = asset.compressed;
            // Retrieve the correct md5 value.
            const expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            const relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            const size = asset.size;
            if (compressed) {
                // self.setTipsText("Verification passed : " + relativePath)
                return true;
            } else {
                // self.setTipsText("Verification passed : " + relativePath + ' (' + expectedMD5 + ')')
                return true;
            }
        });

        this.setTipsText("更新准备");

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            this._am.setMaxConcurrentTask(2);
            this.setTipsText("正在更新...");
        }

        //this.panel.fileProgress.progress = 0;
        this.setDownProgress(0);

        this.checkUpdate()
    }

    private checkUpdate() {
        if (this._updating) {
            this.setTipsText('正在检查更新 ...');
            return;
        }
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            this.loadLocalManifestFile();
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            this.setTipsText("加载失败 manifest ...");
            return;
        }

        GameConfig.GAME_VERSION_S = this._am.getLocalManifest().getVersion();

        // console.log("设置更新回调");
        this._am.setEventCallback(this.checkCb.bind(this));

        // console.log("开始调用引擎更新");
        this._am.checkUpdate();
        this._updating = true;
    }

    private checkCb(event) {
        console.log('checkCb_Code: ' + event.getEventCode());
        let isNeedUpdate = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log("No local manifest file found, hot update skipped.");
                this.setTipsText("没有本地manifest文件，跳过更新");
                this.continueGame();
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log("Fail to download manifest file, hot update skipped.");
                this.setTipsText("下载manifest文件失败，跳过更新");
                this.updateFailed();
                cc.game.restart();
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                // this.panel.info.string = '发现新版本，准备开始更新';
                // this.panel.setPercent(0);
                this.setTipsText("发现新版本准备更新");
                // this._updating = false;
                isNeedUpdate = true;
                // this.hotUpdate();
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                // this.panel.info.string = "已更新至最新版本";
                this.setTipsText("已经是最新版本，无需更新");
                this.continueGame();
                break;
            default:
                // console.log("default");
                return;
        }

        this._am.setEventCallback(null);
        this._checkListener = null;
        this._updating = false;
        if (isNeedUpdate)
            this.hotUpdate();
    }

    hotUpdate() {
        // console.log("hotUpdate", this._updating);
        if (this._am && !this._updating) {
            this._am.setEventCallback(this.updateCb.bind(this));

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                // console.log("hotUpdate","加载配置文件");
                this.loadLocalManifestFile();
            }

            this._failCount = 0;
            this._am.update();
            //this.panel.updateBtn.active = false;
            this._updating = true;
        }
    }

    loadLocalManifestFile() {
        // Resolve md5 url
        let url = this.manifestUrl.nativeUrl;
        if (cc.loader.md5Pipe) {
            url = cc.loader.md5Pipe.transformURL(url);
        }
        this._am.loadLocalManifest(url);
    }

    private updateCb(event) {
        let needRestart = false;
        let failed = false;
        console.log('updateCb_Code: ' + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                // this.panel.info.string = '未找到本地更新文件，更新失败';
                this.setTipsText("未找到本地更新文件，更新失败");
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.setTipsText("正在更新");
                const percent = event.getPercent();
                this.setDownProgress(percent.toFixed(2));
                //当前文件下载总进度
                const percentByFile = event.getPercentByFile();
                this.setDownLoadFile(event.getDownloadedFiles(), event.getTotalFiles());
                // const msg = event.getMessage();
                // if (msg) {
                //     console.log(msg);
                // }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log('Fail to download manifest file, hot update skipped.');
                this.setTipsText("下载失败");
                failed = true;
                cc.game.restart();
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log('Already up to date with the latest remote version.');
                this.setTipsText("已经是最新版本");
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                console.log('Update finished. ' + event.getMessage());
                this.setTipsText("更新完成：正在重启游戏");
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                // this.panel.info.string = '更新失败. ' + event.getMessage();
                //this.panel.retryBtn.active = true;
                this._updating = false;
                this._canRetry = true;

                this._failCount++;
                if (this._failCount < 5) {
                    this._am.downloadFailedAssets();
                } else {
                    console.log('Reach maximum fail count, exit update process');
                    this._failCount = 0;
                    failed = true;
                    console.error("更新5次都失败");
                    //游戏重启再试
                    cc.game.restart();
                }
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                console.log('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                this.setTipsText("资源更新错误");
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                console.log(event.getMessage());
                this.setTipsText("解压错误：" + event.getMessage());
                break;
            default:
                break;
        }

        if (failed) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            this._updating = false;
            this.updateFailed();
        }

        if (needRestart) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            // Prepend the manifest's search path
            let searchPaths = jsb.fileUtils.getSearchPaths();
            searchPaths = Array.from(new Set(searchPaths));//去重
            let newPaths = this._am.getLocalManifest().getSearchPaths();
            // console.log("热更新路径:", JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);

            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    }


    /**
     * zp_describe:不需要更新，继续游戏
     */
    abstract continueGame()

    /**
     * 游戏更新失败
     */
    abstract updateFailed();

    /**
     * zp_describe:设置提示文本
     * @param text 文本内容
     */
    abstract setTipsText(text)


    /**
     * zp_describe:反馈已经下载的文件数量
     * @param downFileCount 当前已经下载的数量
     * @param totalFileCount 总文件数量
     */
    abstract setDownLoadFile(downFileCount, totalFileCount)

    /**
     * zp_describe:设置下载的进度条显示
     * @param progress 当前进度值,只保留2位有效小数
     */
    abstract setDownProgress(progress: number)


    // update (dt) {}
}
