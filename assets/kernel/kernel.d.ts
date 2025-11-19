declare const audioMgr: AudioMgr;
declare const window: any;
declare const onfire: any;
declare const GameSink: any;//子游戏钩子 

declare const downloadMgr: any;
declare const GameTools: any;
declare const Helper: any; //跟 GameTools等价
declare const require: any;
declare const CommandDefine: any;

declare const NetHelp = window.NetHelp;
declare const GD = window.GD;

declare const UIHelper: _UIHelper


//kernel说明
// http://note.youdao.com/noteshare?id=080d9f9da7442cb98ebe4aeae543a24a

//getGameSink(yourGameSink).yourValue
declare function getGameSink<T extends cc.Component>(script: { prototype: T }): T;

declare namespace cc {
	export let xkNative: _xkNative
}


declare const clientKernel: ClientKernel


declare class _xkNative {
    ANDROID_API: string;
    IOS_API: string;
    openInstallInfo: any;
    onWXLoginCodeJSCF: any;
    onWXShareJSCF: any;
    signWithAppleCallBack: any;
    applePayCallback: any;
    callback_MsgKey(): void;
    callback_switchText(result: any): void;
    callback_GPS(result: any): void;
    /**
     * 得到大版本编号
     * @returns {*}
     */
    getVersionCode(): any;
    isWXAppInstalled(): any;
    /**
     * 微信登录，非原生调用无效
     */
    wxLogin(cb: any): void;
    /**
     * 微信分享文本
     * @param text 文字内容
     * @param isTimeLine 1表示朋友圈，0好友
     */
    wxShareText(text: any, isTimeLine: any): void;
    /**
     * 截图整个屏幕并分享给好友
     */
    wxShareCurrentScreen(): void;
    /**
     * 微信截图分享分享给好友
     * @param shareNode 截屏节点
     * @param hideNodes 隐藏节点
     * @param hasMask 是否有mask
     * @param isTimeLine 1表示朋友圈，0好友
     */
    shareScreenShoot(shareNode: any, hideNodes: any, hasMask: any, isTimeLine: any): void;
    /**
     * 微信分享图片
     * @param imgFilePath 图片路径
     * @param isTimeLine 1表示朋友圈，0好友
     */
    wxShareImage(imgFilePath: any, isTimeLine: any): void;
    /**
     * 微信分享网页链接
     * @param url 网页URL
     * @param title 标题
     * @param content 内容
     * @param isTimeLine 1表示朋友圈，0好友
     */
    wxShareWebUrl(url: any, title: any, content: any, isTimeLine: any): void;
    /**
     * 打开微信
     */
    openWXApp(): void;
    getHttpImg(url: any, callback: any): void;
    saveToFile(data: any, dirpath: any, filepath: any, callback: any): void;
    faceBookLogin():void;
    /**
     * ------------------------------- GVoice 语音相关 -------------------------------------------------
     */
    initGVoiceForKey(appID: any, appKey: any, userID: any): void;
    initGVoice(userID: any): void;
    setGVoiceMode(): void;
    applyMsgKey(): void;
    joinGVoiceRoom(roomNum: any): void;
    exitGVoiceRoom(roomNum: any): void;
    openMic(): void;
    closeMic(): void;
    startRecord(): void;
    stopRecord(): void;
    openSpeaker(): void;
    closeSpeaker(): void;
    callback_join_room(code: any): void;
    /**
     * ------------------------------ 高德地图 GPS定位相关 --------------------------------------
     */
    startLocation(isSingle?: boolean): void;
    stopLocation(): void;
    initGameSafe(): void;
    getServerIPAndPort(oldServerIp: any, oldServerPort: any): any;
    onGetBinDitch: any;
    /**
     * web 获取用户渠道(统计)
     */
    getUserBinDitch(cb: any): void;
    onWakeUpAdapter(result: any): void;
    openInstallRegister(): void;
    /**
     * 渠道效果统计
     * pointId      效果点ID
     * pointValue   效果值
     */
    openInstallEffectPoint(pointId: any, pointValue: any): void;
    /**
     * 苹果内购
     * productID 商品ID
     * serverUrl 服务地址
     * userID 用户ID
     * callback 支付成功回调
     */
    applePay(productID: any, serverUrl: any, userID: any, callback: any): void;
    /**
     * sign with appleid
     */
    signWithApple(cb: any): any;
    /**
     * 检查系统是否符合sign with appleid要求
     */
    isAvaliableOS(): any;
}



/**
 * 音效管理器， 对cc.audioEngine的封装
 */
declare class AudioMgr {
    audioClipMap: {};
    bgm_on: boolean;
    effect_on: boolean;
    bgm: any;
    bindObj: any[];
    constructor();
    onDestroy(): void;
    isBgmOpen(): boolean;
    isEffectOpen(): boolean;
    loadAudioDir(dirName: any, callback: any): void;
    releaseAll(): void;
    stopAll(): void;
    getMusicVolume(): number;
    setMusicVolume(audioNum: any): void;
    getEffectsVolume(): number;
    setEffectsVolume(audioNum: any): void;
    openBgm(on: any): void;
    openEffect(on: any): void;
    playMusic(music: any): number;
    playEffect(effect: any, ...args: any[]): any;
    stopEffect(...args: any[]): void;
}



//这一段是大厅数据的接口菜单，配合Hall.ts文件进行数据配置================================================================
declare let KernelData: {
    betScore: any;
    recharge: number;
    advNum:number;
    footprint:number;
    contribution:number;
    socketLog: boolean;
    nickname: string;
    password: string;
    head: string;
    openid: string;
    clubID: number;
    userID: number;
    gameID: number;
    diamond: number;
    score: number;
    sex:number;
    goldBean:number;
    bscRechargeAddr;
    bscColdAddr;
    roomID: number;
    bankScore: number;
    hasRealNameAuthorized:boolean;
    chairID: number;
    tableID: number;
    gamelistData: any[];
    uuid: string;
    phone: number;
    gameSink: any;
    wxUnionID:string;
    moduleEnName: string;
    clubData: {};
    tables: {};
    goldBean:number;
    vipLv:number;
    vipEndTime:string;
    inviteeRewards:{};
    inviteesRechargeTaskRewards:{};
    inviteesRechargeTask:any[];
    invitees:any[];
    realWin:number;
    referralAmount:number;
    withdrawalAmount:number;
    depositAmount:number;
    mail:string;
    mobile:string;
    bankaccount:any;
    agent1Code:string;
    withdrawAbleScore:number;
};


 declare class ClientUserItem {
    userID: any;
    gameID: any;
    tableID: any;
    chairID: any;
    nickname: any;
    sex: number;
    score: number;
    goldBean: number;
    userStatus: number;
    vipLevel: number;
    otherInfo: any;
    agreeDismiss: number;
    head: string;
    online: number;
    constructor();
    init(userInfo: any): void;
    getGender(): number;
    getUserID(): any;
    getGameID(): any;
    getHead(): string;
    getFaceID(): number;
    getNickname(): any;
    getTableID(): any;
    getChairID(): any;
    getUserStatus(): number;
    getUserScore(): number;
    getVipLevel(): number;
    getMemberOrder(): number;
    getOtherInfo(): any;
    isOnline(): boolean;
}

class ClientKernel {
    gameUserManager: any;
    private gameStatus;
    private myUserItem;
    private myUserID;
    private clientReady;
    private tableSetting;
    private dismissData;
    private _gotoHall;
    private isReplay;
    private replayData;
    private lastRecenectTime;
    private gameConfig;
    constructor();
    reset(): void;
    gotoSubgame2(moduleEnName: any): void;
    sendLogonMsg(): void;
    onLogonSuccess(): void;
    getUserMgr(): any;
    getTableUserData(): any;
    getTableSetting(): any;
    getDismissData(): any;
    webSocketSend(data: any): void;
    /**
    * 消息事件
    * @param data     * @returns {boolean}
    */
    onEventMessage(data: any): boolean;
    /**
    * 登录处理函数
    * @param subCMD
    * @param data
    * @returns {boolean}
    */
    onSocketMainLogon(subCMD: any, data: any): boolean;
    getRoomInfo(): void;
    onClientReady(): void;
    onReady(): void;
    chat(text: any): void;
    use_item(data: any): void;
    dismissGame(gotoHall?: boolean): void;
    reconnect(): void;
    gotoHall(): void;
    createGameSink(moduleEnName: any): void;
    removeGameSink(): void;
    /**
    * 用户命令函数
    * @param subCMD
    * @param data
    * @returns {boolean}
    */
    onSocketMainUser(subCMD: any, data: any): boolean;
    /**
    * 游戏命令函数
    * @param subCMD
    * @param data
    */
    onSocketMainGame(subCMD: any, data: any): void;
    /**
    * 框架命令函数
    * @param subCMD
    * @param data
    * @returns {boolean}
    */
    onSocketMainFrame(subCMD: any, data: any): boolean;
    /**
    * 发送消息
    * @param mainCMD
    * @param subCMD
    * @param data
    */
    sendSocketData(mainCMD: any, subCMD: any, data: any): void;
    sendGameMsg(subCMD: any, data: any): void;
    /**
    * 用户状态
    * @param data 数据
    * @returns {boolean}
    */
    onSubUserStatus(data: any): boolean;
    /**
    * 用户分数变更
    * @param data
    */
    onSubUserScore(data: any): boolean;
    /**
    * 用户上线、下线
    * @param data
    */
    onSubUserOnline(data: any): boolean;
    /**
    * 用户进入
    * @param data
    * @returns {boolean}
    */
    onUserEnter(data: any): void;
    /**
    * 切换视图椅子
    * @param chairID
    */
    switchViewChairID(chairID: any, chairCount?: number): number;
    /**
    * 获取自己椅子ID
    * @returns {*}
    */
    getMeChairID(): any;
    /**
    * 获取自己
    * @returns {null}
    */
    getMeUserItem(): any;
    /**
    * 获取座位玩家
    * @param chairID
    * @returns {*}
    */
    getTableUserItem(chairID: any): any;
    getTableUserItemCount(): any;
    /**
    * 通过UserID获取用户
    * @param userID
    * @returns {*}
    */
    getUserByUserID(userID: any): any;
    /**
    * 通过游戏ID获取用户
    */
    getUserByGameID(gameID: any): any;
    /**
    * 发送准备
    * @returns {boolean}
    */
    sendUserReady(): boolean;
    /**
    *用户信息变化处理
    */
    /**
    * 玩家激活
    * @param userItem
    * @returns {boolean}
    */
    onUserItemActive(userItem: any): void;
    /**
    * 玩家删除
    * @param userItem
    * @returns {boolean}
    */
    onUserItemDelete(userItem: any): boolean;
    /**
    * 分数更新
    * @param userItem
    * @param scoreInfo
    * @returns {boolean}
    */
    onUserItemUpdateScore(userItem: any, scoreInfo: any): boolean;
    /**
    * 状态更新
    * @param userItem
    * @param statusInfo
    * @returns {boolean}
    */
    onUserItemUpdateStatus(userItem: any, statusInfo: any): void;
    /**
    * 自己进入
    * @param userItem
    * @returns {boolean}
    */
    onEventSelfEnter(userItem: any): void;
    /**
    * 获取游戏配置
    * @returns {null}
    */
    getGameConfig(): any;
    replay(replayCode: any, chairID?: number): void;
    replayWithData(dbRecord: any, chairID?: number): void;
    do_replay(moduleEnName: any, players: any, tableSetting: any, cmdRecords: any, chairID?: number): void;
    isReplayGame(): boolean;
    initReplayData(userInfo: any, tableSetting: any, cmdRecords: any, chairID: any): void;
    checkIsReplay(): void;
    onTableSeatChanged(data: any): void;
    /**
    * 获取是否旁观玩家
    * @param chairID 椅子号，如果不传，默认是KernelData.chairID
    */
    getIsWatcher(chairID: any): boolean;
    onfire_fire(...args: any[]): void;
}




class _UIHelper {
    /**
     *显示加载界面
     *
     * @param {boolean} [show=true]
     * @param {string} [text=""]
     * @param {number} [stayTime=30]
     */
    showWaitLayer(show?: boolean, text?: string, stayTime?: number): void;
    /**
     *显示提示
     *
     * @param {string} [text=""]
     */
    showTips(text?: string): void;
    /**
     * 对话框
     *
     * @param {string} [text=""]
     * @param {Function} [cb1]
     * @param {Function} [cb2]
     */
    MessageBox(text?: string, cb1?: Function, cb2?: Function): void;
    getUIScript(type: any): cc.Component;
}
