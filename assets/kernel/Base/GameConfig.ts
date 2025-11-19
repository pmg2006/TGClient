//游戏配置
export default class GameConfig {
    //xk:版本号
    static GAME_VERSION_S = "V:1.1.0.1";

    //xk:是否debug模式
    static IS_DEBUG_B = false;

    //xk:网页分享的地址，默认是下载地址
    static SHARE_URL_S = "http://www.zhuanlu666.com";

    //xk:分享的标题
    static SHARE_TITLE_S = "";

    //xk:分享的内容
    static SHARE_CONENT_S = "";

    //xk:socketIO正式服url
    static releaseUrl: "ws://gdy.zhanlu666.com:10001/client";
    //xk:socketIO测试服url
    static debugUrl: "ws://cl-test.zxsnn.com:19000/client";
    //xk:热更正式服url
    static hotUpdate_releaseUrl: "http://res.zhanlu666.com/hotupdate";
    //xk:热更测试服url
    static hotUpdate_debugUrl: "http://xxsj_update.zxsnn.com/home/debug";

}