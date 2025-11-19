
import GameConfig from "./GameConfig";
import { EM_ChannelType, EM_LOGINTYPE, Server_RES } from "../Core/extend/ConstDefine";
import NativeCall from "../NativeCall";
import MD5 = require("../../kernel/3rd/md5");
import { UIView } from "../../core/UIView";

const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class LoginBase extends UIView{
    @property
    serverURI: string = "127.0.0.1"; //服务器地址

    @property({
        type: cc.Label,
        tooltip: "版本号的Label"
    })
    lbl_version: cc.Label = null;

    @property({
        type: cc.Layout,
        tooltip: "测试按钮的父节点,必需加上layout"
    })
    test_btn_node: cc.Layout = null;



    //用这个代替onLoad
    onLoad() {
        this.scheduleOnce(() => {
            console.log("Initialize login...");//初始化登录界面
            let openid = cc.sys.localStorage.getItem('openid');
            console.log("-------------openid", openid);
            if (!openid) {
                console.log('openid');//打开ID为空
            } else {
                this.LoginOpenId(openid);
            }

            GameTools.addBtnOnClick(this.node, this.btnOnClick, this);

            if (cc.sys.isNative && this.lbl_version) {
                this.lbl_version.string = "版本号：" + GameConfig.GAME_VERSION_S;
            }
        }, 0.1)
        this.initTestBtn();
    }

    /**
     * 初始化测试按钮
     *
     * @memberof LoginBase
     */
    initTestBtn() {
        if (!CC_DEBUG) return;

        if (!this.test_btn_node) return;

        this.test_btn_node.type = cc.Layout.Type.GRID;
        this.test_btn_node.resizeMode = cc.Layout.ResizeMode.CHILDREN;
        this.test_btn_node.node.width = 1000;
        this.test_btn_node.spacingX = 90;
        this.test_btn_node.spacingY = 20;

        for (let i = 1; i <= 15; i++) {
            let btnNode = new cc.Node();
            let btn = btnNode.addComponent(cc.Button);
            btnNode.name = "test" + i;
            let lbl = btnNode.addComponent(cc.Label);
            lbl.string = "测试" + i;
            this.test_btn_node.node.addChild(btnNode);
            btnNode.setPosition(0, 0);
            btnNode.setScale(1, 1);
        }
    }

    btnOnClick(event) {
        let btnName: string = event.currentTarget.name;
        //测试账号
        if (btnName.indexOf("test") == 0) {
            console.log("测试账号登陆")
            this.accountLogin(btnName, btnName);
        }
        switch (btnName) {
            case "btn_wechat": {
                this.wxLogin();
                break;
            }
        }

        this.btnOnClickSubclasses(event);
    }

    onLoginResp(ret: Server_RES) {
        const { code, data, errStr } = ret
        if (code == 0) {
            //通知一下子类，登录成功了
            this.loginSucceedResp();
            console.error("xxxxxx ", KernelData.moduleEnName)
            if (KernelData.moduleEnName) {
                console.error("In games", KernelData.moduleEnName)//在游戏中
                clientKernel.gotoSubgame2(KernelData.moduleEnName)
            } else {
                console.error("In hall ", KernelData)//在大厅里
                if (cc.director.getScene().name !== "hall") {
                    console.error("Reload hall ", cc.director.getScene().name)//重新加载大厅
                    //cc.director.loadScene("hall")
                }
            }



        } else {
            UIHelper.showTips(errStr)
        }
    }

    /**
     * 登录成功之后的返回，用户子类来处理事件逻辑
     */
    loginSucceedResp() {

    }

    /**
     * 回调子类，如需处理，重写覆盖
     *
     * @memberof LoginBase
     */
    btnOnClickSubclasses(event) { }

    wxLogin() {
        console.log("微信登录");
        // cc.xkNative.wxLogin(this.wxLoginResp.bind(this));
        NativeCall.inst.wxLogin(this.wxLoginResp.bind(this));
        //Extension.inst.getWeixinToken(this.wxLoginResp.bind(this),"wx9291c65e683d3c1f");
    }

    appleLogin() {
        cc.xkNative.signWithApple(this.appleLoginResp.bind(this));
    }

    lastAccountLgin() {
        let account = cc.sys.localStorage.getItem('account');
        let password = cc.sys.localStorage.getItem('password');
        if (account && password) {
            this._phoneLogin(account, password);
        }
        
    }

    accountLogin(account, password) {
        UIHelper.showWaitLayer(true, "正在登陆服务器");
        console.log(account, password);
        NetHelp.connect(this.serverURI, () => {
            NetHelp.loginYouke(account, password, (retData) => {
                this.onLoginResp(retData);
                UIHelper.showWaitLayer(false);
            })
        })
    }

    _phoneLogin(account, password) {
        UIHelper.showWaitLayer(true, "正在登录服务器");
        console.log(account, password);
       
        NetHelp.phoneLogin(
            EM_LOGINTYPE.eLoginType_Phone, 
            account, // username
            MD5(password), // 32位md5字符串
            (ret: Server_RES) => {
                UIHelper.showWaitLayer(false);
                //KernelData = ret.data;
                NetHelp.meLoginUser.setInfo(ret.data)
                this.onLoginResp(ret);
            });
        
    }


    phoneLogin(phone: number, code: number) {
        console.log(this.serverURI)
        UIHelper.showWaitLayer(true, "正在登陆服务器");
        NetHelp.connect(this.serverURI, () => {
            // 新游客
            NetHelp.loginPhone(phone, code, (retData) => {
                this.onLoginResp(retData);
                UIHelper.showWaitLayer(false);
            })
        });
    }

    faceBookLogin() {
        console.log("facebook登录");
        //NativeCall.inst.faceBookLogin(this.faceBookLoginResp.bind(this));
    }
    private faceBookLoginResp(data) {
        console.log("facebook回调", data);
        this.scheduleOnce(this.facebookCallBack.bind(this, data), 0.1);
    }
    private facebookCallBack(data) {
        UIHelper.showWaitLayer(true, "正在登陆服务器");
        if (!data) {
            UIHelper.MessageBox("无数据!");
            return;
        }
        if (typeof data == "string") {
            let _data: any = JSON.parse(data);
            if (_data.code && parseInt(_data.code) == 200) {
                let accessToken = _data.data.accessToken;
                if (accessToken) {
                    let token = accessToken.token;
                    let accountId = accessToken.userId;
                    NetHelp.Login(EM_LOGINTYPE.eLoginType_Facebook, { accessToken: token, accountId: accountId }, (ret: Server_RES) => {
                        this.onLoginResp(ret);
                        UIHelper.showWaitLayer(false);
                    });
                }
            }
        }
        if (typeof data == "object") {
            if (data.code && parseInt(data.code) == 200) {
                let accessToken = data.data.accessToken;
                if (accessToken) {
                    let token = accessToken.token;
                    let accountId = accessToken.userId;
                    NetHelp.Login(EM_LOGINTYPE.eLoginType_Facebook, { accessToken: token, accountId: accountId }, (ret: Server_RES) => {
                        this.onLoginResp(ret);
                        UIHelper.showWaitLayer(false);
                    });
                }
            }
        }
    }

    lineLogin() {
        console.log("lineLogin登录");
        NativeCall.inst.lineLogin(this.lineLoginResp.bind(this));
    }
    private lineLoginResp(data) {
        console.log("lineLogin回调", data);
        this.scheduleOnce(this.lineLoginCallBack.bind(this, data), 0.1);
    }
    private lineLoginCallBack(data) {
        UIHelper.showWaitLayer(true, "正在登陆服务器");
        if (!data) {
            UIHelper.MessageBox("无数据!");
            return;
        }
        if (typeof data == "string") {
            let _data: any = JSON.parse(data);
            if (_data.code && parseInt(_data.code) == 200) {
                let lineCredential: any = _data.data.lineCredential;
                if (lineCredential) {
                    let token = lineCredential.accessToken.tokenString;
                    NetHelp.Login(EM_LOGINTYPE.eLoginType_Line, { id_token: token }, (ret: Server_RES) => {
                        this.onLoginResp(ret);
                        UIHelper.showWaitLayer(false);
                    });
                }
            }
        }
        if (typeof data == "object") {
            if (data.code && parseInt(data.code) == 200) {
                let lineCredential: any = data.data.lineCredential;
                if (lineCredential) {
                    let token = lineCredential.accessToken.tokenString;
                    NetHelp.Login(EM_LOGINTYPE.eLoginType_Line, { id_token: token }, (ret: Server_RES) => {
                        this.onLoginResp(ret);
                        UIHelper.showWaitLayer(false);
                    });
                }
            }
        }
    }

    googleLogin() {
        console.log("google登录");
        // cc.xkNative.wxLogin(this.wxLoginResp.bind(this));
        NativeCall.inst.googleLogin(this.googleCallBack.bind(this));
        //Extension.inst.getWeixinToken(this.wxLoginResp.bind(this),"wx9291c65e683d3c1f");
    }


    googleCallBack(data) {
        // Id, Email, IdToken

        if (!data) {
            UIHelper.MessageBox("无数据");
            return;
        }

        if (typeof data == "object") {
            const result = data.result;

            if (!result || !result.idToken) {
                UIHelper.MessageBox("不支持改登录方式=");
                return;
            }

            UIHelper.showWaitLayer(true, "正在登陆服务器");
            NetHelp.Login(EM_LOGINTYPE.eLoginType_Google, { accessToken: result.idToken, accountId: result.id, channelType: EM_ChannelType.GoogleFacebookm }, (ret: Server_RES) => {
                this.onLoginResp(ret);
                UIHelper.showWaitLayer(false);
            });

            return;
        }


        UIHelper.MessageBox("数据类型错误");
    }

    private wxLoginResp(code) {
        console.log("微信回调", code);
        //this.wxCode = code;
        this.scheduleOnce(this.wxLoginCallBack.bind(this, code), 0.1);
        // this.wxLoginCallBack(code);
        //cc.sys.localStorage.setItem('wx_code', code);
    }

    private appleLoginResp(identityToken, authCode) {
        this.scheduleOnce(this.appleLoginCallBack.bind(this, identityToken, authCode), 0.1);
    }

    protected wxLoginCallBack(code) {
        UIHelper.showWaitLayer(true, "正在登陆服务器");
        NetHelp.Login(EM_LOGINTYPE.eLoginType_Code, { code: code, channelType: EM_ChannelType.WeiChat }, (ret: Server_RES) => {
            this.onLoginResp(ret);
            UIHelper.showWaitLayer(false);
        });
    }


    private appleLoginCallBack(identityToken, authCode) {
        UIHelper.showWaitLayer(true, "正在登陆服务器");
        NetHelp.connect(this.serverURI, () => {
            NetHelp.loginAppleid(identityToken, authCode, (retData) => {
                this.onLoginResp(retData)
                UIHelper.showWaitLayer(false);
            })
        });
    }

    private LoginOpenId(openid) {
        UIHelper.showWaitLayer(true, "正在登陆服务器");
        NetHelp.connect(this.serverURI, () => {
            NetHelp.loginWeixin(null, openid, (retData) => {
                const { code } = retData
                UIHelper.showWaitLayer(false);
                if (code == 0) {
                    if(cc.director.getScene().name !== "hall") {
                        cc.director.loadScene("hall");
                    }
                } else {
                    this.wxLogin()
                }
            })
        });
    }

}
