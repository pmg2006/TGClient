import { AudioControl } from "./AudioControl";
import LoginBase from "../../kernel/Base/LoginBase";
import { CONNECTION_CONFIG, EM_ChannelType, EM_LOGINTYPE, Server_RES } from "../../kernel/Core/extend/ConstDefine";
import GameTools from "../../kernel/GameTools";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Login extends LoginBase {

    //by_009:使用协议
    @property(cc.Toggle)
    btn_use_agreement: cc.Toggle = null;

    //by_009:版本号
    @property(cc.Label)
    txt_version: cc.Label = null;


    start() {
        // cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);//这一段是强制横屏或竖屏
        if (cc.sys.os == "Windows" && cc.sys.isBrowser) {
            // window["Cocos2dGameContainer"].style = "cursor: url('https://i.ibb.co/dcy2w38/32.png'), default;";
        }
        if (cc.sys.isBrowser) {
            document.title = 'GoodLuck';
            let host = GameTools.GetQueryString("ip");
            let port = GameTools.GetQueryString("port");
            // if(host)CONNECTION_CONFIG.host = host;
            // if(port)CONNECTION_CONFIG.port = parseInt(port);
            // console.log("host:",host,"port:",port);
        }


        audioMgr.loadAudioDir("hall/sound", () => {
            //加载完成后播放背景音效
            AudioControl.playBGM();
        });
        audioMgr.loadAudioDir("sound", () => { });

        this.serverURI = GD.GameConfig.isDebug ? GD.GameConfig.debugUrl : GD.GameConfig.releaseUrl;
        //this.serverURI = "ws://47.239.169.5:9000";

        this.txt_version.string = GD.GameConfig.version;

        // let firstIn = cc.sys.localStorage.getItem("firstIn");
        // console.log("firstIn:",firstIn);
        // if(!firstIn || firstIn == ""){
        //     GD.GameTool.createPanel("hall/panel/panel_player_yinsi",(node)=>{
        //         node.getComponent("panel_player_yinsi").URL = "http://www.00001.com.cn/page1000010?article_id=24";
        //     });
        // }

        // GD.GameTool.createPanel("hall/panel/panel_login");

        // this.onDevtoolschange();
        // console.log=function () {};
        // console.error=function () {};

        // GD.GameTool.createPanel("hall/panel/panel_zhuanpan")
        console.log("===acc==", cc.sys.localStorage.getItem('account'))
        // if(cc.sys.localStorage.getItem('account')!=null ){
        //     GD.isVisitor = true;
        //     this.guestLogin1();
        // }else{
        GD.isVisitor = false;
        //this.guestLogin();
        // }
    }


    loginSucceedResp() {
        //获取定位信息
        cc.xkNative.startLocation();
        // console.error("初始化GVoice 登录成功");
        cc.xkNative.initGVoice(KernelData.uuid);
        console.log(`cc.sys.localStorage.setItem("firstIn","true")`);

        cc.sys.localStorage.setItem("userID", KernelData.userID);
        cc.sys.localStorage.setItem("uuid", KernelData.wxUnionID);
        console.log("Login successful")//登录成功了

        if (cc.director.getScene().name !== "hall") {
            //cc.director.loadScene("hall");
        }
    }


    //by_009:按钮点击事件
    btnOnClickSubclasses(event) {
        AudioControl.playClick();
        switch (event.currentTarget.name) {
            case "btn_clear"://
                cc.sys.localStorage.clear();
                GD.GameTool.showTextTips('清理缓存成功');
                break;
            case "btn_wx"://微信
                UIHelper.showTips("正在接入");
                return;
                cc.view.enableAutoFullScreen(true);
                if (!this.checkTCP()) { return };
                if (GD.GameConfig.isDebug)
                    this.guestLogin();  //测试登录
                else
                    this.wxLogin();     //微信登录
                break;

            case "btn_phone"://手机
                if (!this.checkTCP()) { return };
                GD.GameTool.createPanel("hall/panel/panel_login");
                break;

            case "btn_tourist"://游客
                if (!this.checkTCP()) { return };
                this.guestLogin();
                break;

            case "btn_facbook"://facbook登录
                if (!this.checkTCP()) { return };
                this.faceBookLogin();
                break;

            case "btn_google"://谷歌登录
                if (!this.checkTCP()) { return };
                this.googleLogin();
                break;

            case "btn_ios"://蘋果登录
                if (!this.checkTCP()) { return };
                this.guestLogin();
                break;

            case "btn_line"://line登录
                if (!this.checkTCP()) { return };
                this.lineLogin();
                break;
            case "txt_agreement"://使用协议
                // cc.sys.openURL("http://");
                break;
            case "yonghuyinsi":
                // cc.sys.openURL("http://www.00001.com.cn/page1000010?article_id=24");
                GD.GameTool.createPanel("hall/panel/panel_player_yinsi", (node) => {
                    node.getComponent("panel_player_yinsi").URL = "http://www.gamettl.com/UserAgreement.html";
                });
                break;
            case "ertongyinshi":
                // cc.sys.openURL("http://www.00001.com.cn/page1000010?article_id=25");
                GD.GameTool.createPanel("hall/panel/panel_player_yinsi", (node) => {
                    node.getComponent("panel_player_yinsi").URL = "http://www.gamettl.com/UserPrivacy.html";
                });
                break;
            case "btn_r_text_wx":
                this.accountLogin("ouvkK6LN7QueaEpd7HK1nCxs6dAo", "__wxlogin__")
                break;
            default:
                console.error("事件待处理：", event.currentTarget.name);
                break;
        }
    }

    guestLogin() {
        //if (cc.sys.isBrowser || cc.sys.os == cc.sys.OS_WINDOWS) {
        let userID = cc.sys.localStorage.getItem("tourist_userID");
        let uuid = cc.sys.localStorage.getItem("tourist_uuid");
        if (userID && uuid) {
            NetHelp.Login(EM_LOGINTYPE.eLoginType_UseridUUid, { userID: Number(userID), uuid: uuid, channelType: EM_ChannelType.Tourist }, (ret: Server_RES) => {
                this.onLoginResp(ret);
                UIHelper.showWaitLayer(false);
            },
            );
        }
        else {
            console.log("guestLogin 游客登录！。。。")
            NetHelp.Login(EM_LOGINTYPE.eLoginType_Tourist, { channelType: EM_ChannelType.Tourist }, (ret: Server_RES) => {
                this.onLoginResp(ret);
                UIHelper.showWaitLayer(false);
            },

            );
        }

        return;
    }


    guestLogin1() {
        console.log("===password==", cc.sys.localStorage.getItem('password'))
        let account = cc.sys.localStorage.getItem('account');
        let password = cc.sys.localStorage.getItem('password');

        this._phoneLogin("+91" + account, password)
    }

    //by_009:检查协议
    checkTCP() {
        if (this.btn_use_agreement.isChecked == false) {
            UIHelper.showTips("您还未同意用户使用协议");
            return false;
        }
        return true;
    }



    onDevtoolschange() {
        (function () {
            'use strict'
            var devtools = {
                open: false,
                orientation: null
            }
            var threshold = 160
            var emitEvent = function (state, orientation) {
                window.dispatchEvent(new CustomEvent('devtoolschange', {
                    detail: {
                        open: state,
                        orientation: orientation
                    }
                }))
            }
            setInterval(function () {
                var widthThreshold = window.outerWidth - window.innerWidth > threshold
                var heightThreshold = window.outerHeight - window.innerHeight > threshold
                var orientation = widthThreshold ? 'vertical' : 'horizontal'

                // @ts-ignore
                if (!(heightThreshold && widthThreshold) && ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
                    if (!devtools.open || devtools.orientation !== orientation) {
                        emitEvent(true, orientation)
                    }
                    devtools.open = true
                    devtools.orientation = orientation
                } else {
                    if (devtools.open) {
                        emitEvent(false, null)
                    }
                    devtools.open = false
                    devtools.orientation = null
                }
            }, 100)
            // @ts-ignore
            if (typeof module !== 'undefined' && module.exports) {
                // @ts-ignore
                module.exports = devtools
            } else {
                // @ts-ignore
                window.devtools = devtools
            }
        })()

        window.addEventListener('devtoolschange', function (e) {
            // if (e.detail.open) console.clear();
            // @ts-ignore
            if (e.detail.open) {
                location.href = "about:blank";
                console.error('！', 'font-size:100px;');
                setTimeout(function () {
                    for (let i = 0; i < 100000000; i++) {
                        console.log("ff");
                    }
                }.bind(this), 500);
            }
            console.log('*******************')
        })
    }



    // update (dt) {}
}
