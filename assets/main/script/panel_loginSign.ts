import { BIND_INVITEE_ADDR, CONNECTION_CONFIG, EM_ChannelType, EM_LOGINTYPE, GET_PHONE_YZM_ADDR, GET_PHONE_YZM_ADDR_EMAIL, Server_RES, YZM_ADDR, YZM_ADDR_EMAIL } from "../../kernel/Core/extend/ConstDefine";

const { ccclass, property } = cc._decorator;
import MD5 = require("../../kernel/3rd/md5");
import GameTools from "../../kernel/GameTools";
import { AudioControl } from "./AudioControl";
import panel_forgetPassword from "./panel_forgetPassword";
import LoginBase from "../../kernel/Base/LoginBase";
import { i18nMgr } from "../../kernel/i18n/i18nMgr";
import NetUtil from "../../kernel/Core/extend/NetUtil";
import * as ConstDefine from "../../kernel/Core/extend/ConstDefine";
import { EM_ACCOUNT_TYPE, GameData } from "./GameData";
import Utils, { KWAI_EVENT_TYPES, httpRequest } from "../../kernel/Core/extend/Utils";
import { PlazNetKernel } from "../../kernel/Core/extend/PlazNetKernel";

declare var FB: any;

@ccclass
export default class panel_loginSign extends LoginBase {

    @property(cc.Node)
    changeToReg: cc.Node = null;

    @property(cc.Node)
    panel_signup: cc.Node = null;

    @property(cc.Node)
    panel_login: cc.Node = null;

    @property(cc.Node)
    panel_text_phone_s: cc.Node = null;//手机注册用户名

    @property(cc.Node)
    panel_text_otp_s: cc.Node = null;//手机注册验证码

    @property(cc.Node)
    panel_text_captcha_s: cc.Node = null;//手机注册验证码

    @property(cc.Node)
    panel_text_phone_l: cc.Node = null;//手机登录用户名

    @property(cc.Node)
    panel_text_captcha_l: cc.Node = null;//手机登录验证码

    @property(cc.Node)
    panel_text_mail_s: cc.Node = null;//邮件注册用户名

    @property(cc.Node)
    panel_text_pwd_s: cc.Node = null;//邮件注册密码

    @property(cc.Node)
    panel_text_email_l: cc.Node = null; //邮件登录用户名

    @property(cc.Node)
    panel_text_pwd_l: cc.Node = null;//邮件登录密码

    @property(cc.EditBox)
    login_acc_email: cc.EditBox = null;

    @property(cc.EditBox)
    login_pw_email: cc.EditBox = null;

    @property(cc.EditBox)
    login_acc_tel: cc.EditBox = null;

    @property(cc.EditBox)
    login_pw_tel: cc.EditBox = null;

    @property(cc.EditBox)
    signup_acc_email: cc.EditBox = null;

    @property(cc.EditBox)
    signup_pw_email: cc.EditBox = null;

    @property(cc.EditBox)
    signup_acc_tel: cc.EditBox = null;

    @property(cc.EditBox)
    signup_yanzheng: cc.EditBox = null;

    @property(cc.Node)
    btn_login: cc.Node = null;

    @property(cc.Node)
    btn_signup: cc.Node = null;

    @property(cc.Node)
    btn_yzm: cc.Node = null;

    @property(cc.Node)
    panel_yzm: cc.Node = null;

    @property(cc.Node)
    changeToLogin: cc.Node = null;

    @property(cc.Toggle)
    remenberPw: cc.Toggle = null;

    @property(cc.Toggle)
    login: cc.Toggle = null;

    @property(cc.Toggle)
    register: cc.Toggle = null;

    @property(cc.Node)
    switchNode: cc.Node = null;

    @property(cc.Node)
    nodeTitle: cc.Node = null;

    lbl_countDown: cc.RichText = null;
    bg_countDown: cc.Node = null;
    curType = null;     //当前选择的类型(0-手机,1-邮箱)
    bindObj = [];

    onLoad() {
        this.lbl_countDown = this.panel_yzm.getChildByName("label_time").getChildByName("richtext").getComponent(cc.RichText);
        this.bg_countDown = this.panel_yzm.getChildByName("btn_otp");

        let loginType = cc.sys.localStorage.getItem('loginType');
        this.curType = loginType ? Number(loginType) : EM_ACCOUNT_TYPE.MOBILE;
        console.log("当前登录类型:"+this.curType);
        if (this.curType == EM_ACCOUNT_TYPE.EMAIL) {
            this.onChangeToEmailClick()
        } else {
            this.onChangeToTelClick()
        }
        this.bindEvent();
    }

    start() {
        // this.loadFacebookSDK().then(()=>{
        //     this.initFacebookSDK();
        // })
        this.changeToReg.on('click', this.onChangeToRegClick, this);
        this.changeToLogin.on('click', this.onChangeToLogClick, this);
        this.btn_login.on('click', this.onLoginClick, this);
        this.btn_signup.on('click', this.onSignupClick, this);
        //this.btn_yzm.on('click',this.onYzmClick,this);
        this.InitRemenberUI();
        this.nodeTitle.active = true;

    }

    bindEvent() {
        this.bindObj.push(onfire.on("countDown", this.onCountDown.bind(this)));
    }

    loadFacebookSDK() {
        return new Promise((resolve) => {
            var script = document.createElement('script');
            script.src = 'https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v15.0&appId=910506179990403&autoLogAppEvents=1';
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }

    initFacebookSDK() {
        if (typeof FB === 'undefined') {
            cc.error('These services are based on the Facebook SDK for JavaScript. ' +
                'You should load https://connect.facebook.net/en_US/all.js before using the FB API.');
        };
        FB.init({
            appId: '910506179990403',
            autoLogAppEvents: true,
            status: true,
            xfbml: true,
            version: 'v17.0'
        });

    }


    onFaceBookLogin() {
        AudioControl.playClick();

        if (typeof FB === 'undefined') return;
        // FB.login((response) => {
        //     if (response.authResponse) {
        //         console.log('Welcome!  Fetching your information.... ');
        //         FB.api('/me', (response) => {
        //             UIHelper.showTips('Good to see you, ' + response.name + '.' + response.id);
        //         });
        //     }
        //     else {
        //         UIHelper.showTips('User cancelled login or did not fully authorize.');
        //     }
        // });

        FB.login((response) => {
            if (response.authResponse) {
                console.log('登录成功！', response);
                UIHelper.showTips("登录成功" + JSON.stringify(response));
                // if (accessToken) {
                //     let token = accessToken.token;
                //     let accountId = accessToken.userId;
                //     NetHelp.Login(EM_LOGINTYPE.eLoginType_Facebook, { accessToken: token, accountId: accountId }, (ret: Server_RES) => {
                //         this.onLoginResp(ret);
                //         UIHelper.showWaitLayer(false);
                //     });
                // }
                // 在这里执行登录成功后的逻辑处理
            } else {
                console.log('登录失败！', response);
                UIHelper.showTips("登录失败" + JSON.stringify(response));
                // 在这里执行登录失败后的逻辑处理
            }
        }, { scope: 'public_profile,email' });
    }

    InitRemenberUI() {
        let bool = cc.sys.localStorage.getItem('isRem');//记住是否记住密码
        this.remenberPw.isChecked = (bool && bool == 1);
        if (bool == null) {
            cc.sys.localStorage.setItem('isRem', 1)
            this.remenberPw.isChecked = true;
        }
        if (bool == 1) {
            // let accountEmail = cc.sys.localStorage.getItem('accountEmail');
            // if (accountEmail && accountEmail != "") {
            //     this.curType = EM_ACCOUNT_TYPE.EMAIL;
            //     this.telAndEmailUIswitchNoInitRemenberUI(true)
            // }

            if (this.curType == EM_ACCOUNT_TYPE.EMAIL) {
                let str1 = cc.sys.localStorage.getItem('accountEmail');
                let str2 = cc.sys.localStorage.getItem('passwordEmail');
                if (str1) {
                    this.login_acc_email.string = str1;
                    if (str2) this.login_pw_email.string = str2;
                } else {
                    this.login_pw_email.string = "";
                }
            } else {
                let str1 = cc.sys.localStorage.getItem('accountTel');
                let str2 = cc.sys.localStorage.getItem('passwordTel');
                if (str1) {
                    //this.login_acc_tel.string = "+91" + str1;
                    this.login_acc_tel.string = str1;
                    if (str2) this.login_pw_email.string = str2;
                } else {
                    this.login_pw_email.string = "";
                }
            }
        } else {
            this.login_acc_email.string = "";
            this.login_acc_tel.string = "";
            this.login_pw_email.string = "";
        }
    }

    onChangeToRegClick() {
        AudioControl.playClick();
        this.panel_signup.active = true;
        this.panel_login.active = false;
        this.register.getComponent(cc.Toggle).isChecked = true;
        this.login.getComponent(cc.Toggle).isChecked = false;
    }
    onChangeToLogClick() {
        AudioControl.playClick();
        this.panel_signup.active = false;
        this.panel_login.active = true;
        this.register.getComponent(cc.Toggle).isChecked = false;
        this.login.getComponent(cc.Toggle).isChecked = true;
    }

    onToggleClick() {
        let isRem = this.remenberPw.isChecked ? 1 : 0;
        cc.sys.localStorage.setItem('isRem', isRem);
    }

    onInitLoginSignUI(flag: boolean) {
        // this.login.node.active = false;
        // this.register.node.active = false;
        if (flag && !CC_DEBUG) {
            // 注册界面，隐藏邮箱登录，显示手机登录
            this.switchNode.active = true;
        } else {
            this.switchNode.active = true;
        }
        this.panel_signup.active = flag;
        this.panel_login.active = !flag;

        this.panel_text_phone_s.active = true;
        this.panel_text_otp_s.active = true;
        this.panel_text_captcha_s.active = false;
        this.panel_text_mail_s.active = false;
        this.panel_text_pwd_s.active = true;
        this.panel_text_phone_l.active = true;
        //this.panel_text_captcha_l.active = true;
        this.panel_text_email_l.active = false;
        this.panel_text_pwd_l.active = true;

        if (!flag) {
            let loginType = cc.sys.localStorage.getItem('loginType');
            this.curType = loginType ? Number(loginType) : EM_ACCOUNT_TYPE.MOBILE;
            if (this.curType == EM_ACCOUNT_TYPE.EMAIL) {
                this.onChangeToEmailClick()
            } else {
                this.onChangeToTelClick()
            }
        } else {
            // 注册界面，类型只有手机
            this.curType = EM_ACCOUNT_TYPE.MOBILE;
            this.onChangeToTelClick();
        }

    }

    /** 账号登录 */
    onLoginClick() {
        // let data:any = {payAmount:1, transactionId:"test"};
        // PlazNetKernel.instance().OnRechargeSuccess(data);
        panel_loginSign.promptPWAInstallation();

        Utils.Instance.FBTrace("Login");

        NetHelp.disConnect(true);
        AudioControl.playClick();
        let curAccStr = this.login_acc_email.string;
        let curPwdStr = this.login_pw_email.string;
        let type = EM_LOGINTYPE.eLoginType_Mail;
        if (this.curType == EM_ACCOUNT_TYPE.MOBILE) {
            curAccStr = this.login_acc_tel.string;
            if (!Utils.checkMobile(curAccStr)) return;
            curAccStr = "+91" + this.login_acc_tel.string;
            curPwdStr = this.login_pw_tel.string;
            type = EM_LOGINTYPE.eLoginType_Phone
        } else {
            if (!Utils.checkEmail(curAccStr)) return;
        }
        if (!Utils.checkPassword(curPwdStr)) return;
        UIHelper.showWaitLayer(true, i18nMgr._getLabel("Logining", []))
        this.awaitGetIp();
        NetHelp.phoneLogin(
            type,
            curAccStr, // username
            MD5(curPwdStr), // 32位md5字符串
            (ret: Server_RES) => {
                UIHelper.showWaitLayer(false);
                this.saveInfo();
                this.onLoginResp(ret);
            });
    }

    static autoLoginIfPossible() {
        let autoLogin = localStorage.getItem("autoLogin");
        if (!autoLogin || autoLogin == "false") {
            console.log("没有设置自动登录，不进行自动登录");
            return;
        }
        // 从本地存储中获取登录类型和账户信息
        const loginType = cc.sys.localStorage.getItem('loginType');
        const accountEmail = cc.sys.localStorage.getItem('accountEmail');
        const passwordEmail = cc.sys.localStorage.getItem('passwordEmail');
        //const accountTel = "+91" + cc.sys.localStorage.getItem('accountTel');
        const accountTel = "+91" + cc.sys.localStorage.getItem('accountTel');
        const passwordTel = cc.sys.localStorage.getItem('passwordTel');

        //console.log("自动登录账号:" + accountTel);
        //console.log("自动登录密码:" + passwordTel);

        let curType = EM_ACCOUNT_TYPE.EMAIL;
        // 检查是否有足够的信息进行自动登录
        if (loginType && ((loginType === EM_ACCOUNT_TYPE.EMAIL.toString() && accountEmail && passwordEmail) ||
            (loginType === EM_ACCOUNT_TYPE.MOBILE.toString() && accountTel && passwordTel))) {
            // 设置当前登录类型
            curType = Number(loginType);

            // 根据登录类型设置账号和密码
            let curAccStr = (curType === EM_ACCOUNT_TYPE.EMAIL) ? accountEmail : accountTel;
            let curPwdStr = (curType === EM_ACCOUNT_TYPE.EMAIL) ? passwordEmail : passwordTel;
            //console.log("开始自动登录")
            // 发起登录请求
            UIHelper.showWaitLayer(true, i18nMgr._getLabel("Logining", []));
            NetHelp.phoneLogin(
                curType === EM_ACCOUNT_TYPE.EMAIL ? EM_LOGINTYPE.eLoginType_Mail : EM_LOGINTYPE.eLoginType_Phone,
                curAccStr, // 用户名
                MD5(curPwdStr), // 密码
                async (ret: Server_RES) => {
                    console.log("自动登录回调 : " +KernelData.userID + " ret:",ret); 
                    UIHelper.showWaitLayer(false);
                    // this.onLoginResp(ret);
                    const { code, errStr } = ret
                    if (code == 0 ) {
                        await this.getGameListDataForStatic();
                        GD.isVisitor = true;

                        console.log("派发事件", "loginSucceed");
                        cc.find("Canvas/UI").emit('loginSucceed', { detail: 'Hello, Node B!' });
                    } else {
                        if(KernelData.userID){
                            cc.find("Canvas/UI").emit('loginSucceed', { detail: 'Hello, Node B!' });
                        }
                        UIHelper.showTips(errStr)
                    }
                }
            );
        } else {
            // 如果没有足够的信息，显示登录界面
            console.log("没有足够的信息进行自动登录，显示登录界面");
        }
    }

    getUserIdFromUrl(curUrl: string): string {
        let userid = '';

        if (curUrl) {
            // 尝试从 URL 的查询参数中获取 userid
            let urlObj = new URL(curUrl);
            userid = urlObj.searchParams.get('userid') || "";

            // 如果在查询参数中找不到 userid，尝试从哈希中获取
            if (!userid && urlObj.hash) {
                // 提取哈希中的查询部分
                let hashQuery = urlObj.hash.substring(urlObj.hash.indexOf('?') + 1);
                let params = new URLSearchParams(hashQuery);
                userid = params.get('userid') || "";
            }
        }

        return userid;
    }
    /** 账号注册 */
    onSignupClick() {
        Utils.Instance.FBTrace("Register");

        NetHelp.disConnect(true);
        AudioControl.playClick();
        let code = this.signup_yanzheng.string;
        let curUrl = window.location.href;
        let userid = '';
        if (curUrl && curUrl != '') {
            //let url = new URL(curUrl);
            userid = this.getUserIdFromUrl(curUrl);//url.searchParams.get('userid') || "";
        }
        if (this.signup_yanzheng.string == "") {
            UIHelper.showTips("Por favor, insira o código de verificação");
            return;
        }

        let url = '';
        if (this.curType == EM_ACCOUNT_TYPE.EMAIL) {
            url = CONNECTION_CONFIG.yanzhengAddr + GET_PHONE_YZM_ADDR_EMAIL(this.signup_acc_email.string, this.signup_yanzheng.string);
        } else {
            url = CONNECTION_CONFIG.yanzhengAddr + GET_PHONE_YZM_ADDR(this.signup_acc_tel.string, this.signup_yanzheng.string);
        }
        console.log("url--", url);
        UIHelper.showWaitLayer(true)
        this.awaitGetIp();

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log("xhr.readyState  " + xhr.readyState);
            console.log("xhr.status  " + xhr.status);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                console.log(xhr.responseText);
                let repData = JSON.parse(xhr.responseText);
                if (repData.code != 0) {
                    UIHelper.showWaitLayer(false);
                    UIHelper.showTips(repData.errStr);
                    return;
                }
                let _userid = Number(userid) ? Number(userid) : 0
                if (this.curType == 1) {
                    NetHelp.emailRegister(this.signup_acc_email.string, MD5(this.signup_pw_email.string), repData.ticket, (ret) => {
                        console.log("ret:", ret)
                        UIHelper.showWaitLayer(false);
                        if (ret.code != 0) {
                            UIHelper.showTips(ret.errStr);
                            return;
                        }
                        // 邮箱注册成功
                        Utils.Instance.AdjustEvent(Utils.Instance.getAdjustEvent().EmailRegister, 0);
                        Utils.Instance.sendKwaiEvent(KWAI_EVENT_TYPES.EVENT_COMPLETE_REGISTRATION);

                        panel_loginSign.promptPWAInstallation();

                        this.login_acc_email.string = this.signup_acc_email.string;
                        this.login_pw_email.string = this.signup_pw_email.string;
                        if (_userid > 0) {
                            let _url = CONNECTION_CONFIG.yanzhengAddr + BIND_INVITEE_ADDR(ret.data.userID, Number(userid));
                            console.log("=_url===========", _url)
                            let _xhr = new XMLHttpRequest();
                            _xhr.onreadystatechange = () => {
                                UIHelper.showWaitLayer(false);
                                console.log("xhr.readyState---  " + _xhr.readyState);
                                console.log("xhr.status-----  " + _xhr.status);
                                if (_xhr.readyState === 4 && (_xhr.status >= 200 && _xhr.status < 400)) {
                                    console.log("responseText===", _xhr, typeof (_xhr.responseText));
                                    let _repData = JSON.parse(_xhr.responseText);
                                    if (_repData.code != 0) {
                                        UIHelper.showTips(_repData.errStr);
                                        return;
                                    }
                                    //UIHelper.showTips("绑定成功!");
                                }
                            };
                            _xhr.open("GET", _url, true);
                            _xhr.send();
                        }
                        this.onInitLoginSignUI(false);
                        //UIHelper.showTips("Registro bem-sucedido, por favor volte ao login");//注册成功，请返回登录页面
                        UIHelper.showTips("पंजीकरण सफल, कृपया पुनः लॉग इन करें");//注册成功，请返回登录页面
                    });
                } else {
                    NetHelp.phoneRegister("+91" + this.signup_acc_tel.string, MD5(this.signup_pw_email.string), repData.ticket, (ret) => {
                        console.log("ret:", ret)
                        UIHelper.showWaitLayer(false);
                        if (ret.code != 0) {
                            UIHelper.showTips(ret.errStr);
                            return;
                        }
                        // 手机注册成功
                        Utils.Instance.AdjustEvent(Utils.Instance.getAdjustEvent().PhoneRegister, 0);
                        Utils.Instance.sendKwaiEvent(KWAI_EVENT_TYPES.EVENT_COMPLETE_REGISTRATION);
                        //Utils.Instance.FBTrace("Register");

                        panel_loginSign.promptPWAInstallation();

                        this.login_acc_tel.string = this.login_acc_tel.string;
                        this.login_pw_email.string = this.signup_pw_email.string;
                        if (_userid > 0) {
                            let _url = CONNECTION_CONFIG.yanzhengAddr + BIND_INVITEE_ADDR(ret.data.userID, Number(userid));
                            console.log("=_url===========", _url)
                            let _xhr = new XMLHttpRequest();
                            _xhr.onreadystatechange = () => {
                                UIHelper.showWaitLayer(false);
                                console.log("xhr.readyState---  " + _xhr.readyState);
                                console.log("xhr.status-----  " + _xhr.status);
                                if (_xhr.readyState === 4 && (_xhr.status >= 200 && _xhr.status < 400)) {
                                    console.log("responseText===", _xhr, typeof (_xhr.responseText));
                                    let _repData = JSON.parse(_xhr.responseText);
                                    if (_repData.code != 0) {
                                        UIHelper.showTips(_repData.errStr);
                                        return;
                                    }
                                    //UIHelper.showTips("绑定成功!");
                                }
                            };
                            _xhr.open("GET", _url, true);
                            _xhr.send();
                        }
                        this.onInitLoginSignUI(false);
                        //UIHelper.showTips("Registro bem-sucedido, por favor volte ao login");
                        UIHelper.showTips("पंजीकरण सफल, कृपया पुनः लॉग इन करें");//注册成功，请返回登录页面
                    });
                }
            }
        }.bind(this);
        xhr.open("GET", url, true);
        xhr.send();
        //}
    }
 
    // 点击收获验证码
    onYzmClick() {
        let url = '';
        if (this.curType == EM_ACCOUNT_TYPE.EMAIL) {
            if (!Utils.checkEmail(this.signup_acc_email.string)) return;
            url = CONNECTION_CONFIG.yanzhengAddr + YZM_ADDR_EMAIL + this.signup_acc_email.string;
        } else {
            if (!Utils.checkMobile(this.signup_acc_tel.string)) return;
            url = CONNECTION_CONFIG.yanzhengAddr + YZM_ADDR + this.signup_acc_tel.string;
        }
        if (NetHelp.isInterval) {
            UIHelper.showTips(`Por favor, obtenha novamente após ${NetHelp.intervalTime} segundos`);
            return;
        }

        UIHelper.showWaitLayer(true)
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            console.log("xhr.readyState  " + xhr.readyState);
            console.log("xhr.status  " + xhr.status);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                console.log("responseText===", xhr, typeof (xhr.responseText));
                UIHelper.showWaitLayer(false)
                let repData = JSON.parse(xhr.responseText);
                if (repData.code != 0) {
                    UIHelper.showTips(repData.errStr);
                    return;
                }
                NetHelp.countDown();
                this.btn_yzm.getComponent(cc.Button).interactable = false;
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }

    telAndEmailUIswitch(flag: boolean) {
        this.panel_text_phone_s.active = flag;
        this.panel_text_otp_s.active = true;
        //this.panel_text_captcha_s.active = flag;

        this.panel_text_mail_s.active = !flag;
        this.panel_text_pwd_s.active = true;

        this.panel_text_phone_l.active = flag;
        //this.panel_text_captcha_l.active = flag;

        this.panel_text_email_l.active = !flag;
        this.panel_text_pwd_l.active = true
        this.InitRemenberUI();
    }

    telAndEmailUIswitchNoInitRemenberUI(flag: boolean) {
        this.panel_text_phone_s.active = flag;
        this.panel_text_otp_s.active = true;
        //this.panel_text_captcha_s.active = flag;

        this.panel_text_mail_s.active = !flag;
        this.panel_text_pwd_s.active = true;

        this.panel_text_phone_l.active = flag;
        //this.panel_text_captcha_l.active = flag;

        this.panel_text_email_l.active = !flag;
        this.panel_text_pwd_l.active = true
    }

    //切换手机
    onChangeToTelClick() {
        AudioControl.playClick();
        this.curType = EM_ACCOUNT_TYPE.MOBILE;
        this.telAndEmailUIswitch(true)
    }
    //切换邮箱
    onChangeToEmailClick() {
        AudioControl.playClick();
        this.curType = EM_ACCOUNT_TYPE.EMAIL;
        this.telAndEmailUIswitch(false)
    }

    onBtnForget() {
        AudioControl.playClick();
        GD.GameTool.createPanel("hall/panel/panel_forgetPassword", (node) => {
            node.getComponent(panel_forgetPassword).curType = this.curType;
            if (this.curType == EM_ACCOUNT_TYPE.MOBILE) {
                node.getComponent(panel_forgetPassword).onInitUI(false, 0);
            } else {
                node.getComponent(panel_forgetPassword).onInitUI(true, 1);
            }
        });
    }

    onClickUserAgreement() {
        AudioControl.playClick();
        GD.GameTool.createPanel("hall/panel/panel_player_yinsi", (node) => {
            node.getComponent("panel_player_yinsi").URL = "http://www.gamettl.com/UserAgreement.html";
        });
    }

    onClickUserPrivacy() {
        AudioControl.playClick();
        GD.GameTool.createPanel("hall/panel/panel_player_yinsi", (node) => {
            node.getComponent("panel_player_yinsi").URL = "http://www.gamettl.com/UserPrivacy.html";
        });
    }

    onCountDown(str: number) {
        if (!NetHelp.isInterval) return;
        if (this.btn_yzm.getComponent(cc.Button).interactable) this.btn_yzm.getComponent(cc.Button).interactable = false;
        if (this.bg_countDown.active) this.bg_countDown.active = false;
        if (!this.lbl_countDown.node.active) this.lbl_countDown.node.active = true;
        this.lbl_countDown.string = `(${str}s)`;
        if (str <= 1) {//计时结束
            this.btn_yzm.getComponent(cc.Button).interactable = true;
            this.bg_countDown.active = true;
            this.lbl_countDown.node.active = false;
        }
    }

    async getGameListData(): Promise<Server_RES> {
        let ret = await NetUtil.requestSync(ConstDefine.msgRouter.gameList, {});
        if (ret.code == 0) {
            NetHelp.gamelistData = ret.data;
            console.error("List of games ", NetHelp.gamelistData)//游戏列表
        }
        return ret;
    }

    static async getGameListDataForStatic(): Promise<Server_RES> {
        let ret = await NetUtil.requestSync(ConstDefine.msgRouter.gameList, {});
        if (ret.code == 0) {
            NetHelp.gamelistData = ret.data;
            console.error("List of games ", NetHelp.gamelistData)//游戏列表
        }
        return ret;
    }

    static promptPWAInstallation() {
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            // 阻止浏览器自动显示安装提示
            e.preventDefault();
            // 保存事件，以便稍后重新触发
            deferredPrompt = e;
            // 显示安装按钮或提示
            let installApp = confirm("Você quer instalar o aplicativo?");
            if (installApp) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('用户接受了安装应用');
                    } else {
                        console.log('用户拒绝了安装应用');
                    }
                    deferredPrompt = null;
                });
            }
        });
    }

    async onLoginResp(ret: Server_RES) {
        const { code, errStr } = ret
        if (code == 0) {
            
            await this.getGameListData();
            // console.error("xxxxxx ", KernelData.moduleEnName)
            // if (KernelData.nickname == "") {  //判断昵称
            //     GD.GameTool.createPanel("hall/panel/panel_login_rename");
            // } else if (KernelData.moduleEnName) {
            //     console.error("In games ", KernelData.moduleEnName)//在游戏中
            //     clientKernel.gotoSubgame2(KernelData.moduleEnName)
            // } else {
            //     console.error("In hall ", KernelData)//在大厅
            //     // if(cc.director.getScene().name !== "hall"){
            //     //     console.error("重新加载大厅 ",cc.director.getScene().name)
            //     // 登录的时候已经在大厅，不需要在刷新一次大厅场景
            //     //cc.director.loadScene("hall")
            //     //  } 
            // }
            GD.isVisitor = true;
            KernelData = ret.data;
            //登录成功返回

            this.loginSucceedResp();
        } else {
            UIHelper.showTips(errStr)
        }
    }

    saveInfo() {
        // 设置下一次自动登录
        localStorage.setItem("autoLogin", "true");

        try {
            if (this.curType == EM_ACCOUNT_TYPE.EMAIL) {
                cc.sys.localStorage.setItem('loginType', EM_ACCOUNT_TYPE.EMAIL.toString());
                cc.sys.localStorage.setItem('accountEmail', this.login_acc_email.string);
                if (this.remenberPw.isChecked) {
                    cc.sys.localStorage.setItem('passwordEmail', this.login_pw_email.string);
                } else {
                    cc.sys.localStorage.removeItem('passwordEmail');
                }
            } else {
                cc.sys.localStorage.setItem('loginType', EM_ACCOUNT_TYPE.MOBILE.toString());
                cc.sys.localStorage.setItem('accountTel', this.login_acc_tel.string);
                if (this.remenberPw.isChecked) {
                    cc.sys.localStorage.setItem('passwordTel', this.login_pw_email.string);
                } else {
                    cc.sys.localStorage.removeItem('passwordTel');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    loginSucceedResp() {
        //获取定位信息
        // cc.xkNative.startLocation();
        // console.error("初始化GVoice 登录成功");
        // cc.xkNative.initGVoice(KernelData.uuid);
        // cc.sys.localStorage.setItem("userID", KernelData.userID);
        // cc.sys.localStorage.setItem("uuid", KernelData.wxUnionID);
        cc.find("Canvas/UI").emit('loginSucceed', { detail: 'Hello, Node B!' });
        let parent = cc.find("Canvas/UI/panelNode");
        parent && parent.removeAllChildren();
        if (!cc.sys.isMobile && this.node) {
            this.node.destroy();
        }
    }

    onDestroy() {
        this.changeToReg.off('click', this.onChangeToRegClick, this)
        this.btn_login.off('click', this.onLoginClick, this);
        this.btn_signup.off('click', this.onSignupClick, this);
        for (let i = 0; i < this.bindObj.length; i++) {
            onfire.un(this.bindObj[i])
        }
    }

    btnClosed() {
        this.node.destroy();
    }


    onClickLoginAccClear() {
        if (this.login_acc_email) this.login_acc_email.getComponent(cc.EditBox).string = "";
        if (this.login_acc_tel) this.login_acc_tel.getComponent(cc.EditBox).string = "";
        if (this.signup_acc_tel) this.signup_acc_tel.getComponent(cc.EditBox).string = "";
        if (this.signup_acc_email) this.signup_acc_email.getComponent(cc.EditBox).string = "";
    }

    //倒计时
    fbBtnClick() {
        // AudioControl.playClick();
        // this.faceBookLogin();
    }

    async awaitGetIp() {
        if (GameData.Instance.ip && GameData.Instance.ip.length > 0) return;

        let url = CONNECTION_CONFIG.yanzhengAddr + ConstDefine.GET_RECORD_IP();
        console.log('Service Link Url:', url);
        let response: any = await httpRequest(url, 'GET', null);
        console.log('Service Link:', response);
        if (response.code === 0 && response) {
            if (response.data) {
                GameData.Instance.ip = response.data.ip;
            } else {
                GameData.Instance.ip = response.ip;
            }
        }
    }

    guestLogin() {
        NetHelp.disConnect(true);

        UIHelper.showWaitLayer(true, i18nMgr._getLabel("Logining", []))
        this.awaitGetIp();
        //if (cc.sys.isBrowser || cc.sys.os == cc.sys.OS_WINDOWS) {
        let userID = cc.sys.localStorage.getItem("tourist_userID");
        let uuid = cc.sys.localStorage.getItem("tourist_uuid");
        if (userID && uuid) {
            console.log("游客登录！。。。")
            NetHelp.Login(EM_LOGINTYPE.eLoginType_UseridUUid, {
                userID: Number(userID), uuid: uuid, channelType: EM_ChannelType.Tourist,
                agentCode: GameData.Instance.agentCode, ip: GameData.Instance.ip,   // 渠道ID
            }, (ret: Server_RES) => {
                this.onLoginResp(ret);
                UIHelper.showWaitLayer(false);
            },
            );
        }
        else {
            console.log("新游客登录！。。。")
            NetHelp.Login(EM_LOGINTYPE.eLoginType_Tourist, {
                channelType: EM_ChannelType.Tourist,
                agentCode: GameData.Instance.agentCode, ip: GameData.Instance.ip,
                // 渠道ID
            }, (ret: Server_RES) => {
                Utils.Instance.AdjustEvent(Utils.Instance.getAdjustEvent().GuestRegister, 0);
                Utils.Instance.sendKwaiEvent(KWAI_EVENT_TYPES.EVENT_COMPLETE_REGISTRATION);

                this.onLoginResp(ret);
                cc.sys.localStorage.setItem("tourist_uuid", ret.data.wxUnionID);
                cc.sys.localStorage.setItem("tourist_userID", ret.data.userID);
                UIHelper.showWaitLayer(false);
            },

            );
        }

        return;

        // NetHelp.phoneLogin(
        //     EM_LOGINTYPE.eLoginType_Tourist,
        //     "", // username
        //     MD5(""), // 32位md5字符串
        //     (ret: Server_RES) => {
        //         UIHelper.showWaitLayer(false);
        //         this.saveInfo();
        //         this.onLoginResp(ret);
        //     });

    }

    visitorLoginClick() {
        AudioControl.playClick();
        GD.isVisitor = true;
        //this.loginSucceedResp();
        this.guestLogin();
        //cc.director.loadScene("hall");

        let curUrl = window.location.href;
        let userid = '';
        if (curUrl && curUrl != '') {
            let urlParams = new URLSearchParams(curUrl);
            userid = urlParams.get('userid') || "";
        }
        let _userid = Number(userid) ? Number(userid) : 0
        if (_userid > 0) {
            let _url = CONNECTION_CONFIG.yanzhengAddr + BIND_INVITEE_ADDR(KernelData.userID, Number(userid));
            let _xhr = new XMLHttpRequest();
            _xhr.onreadystatechange = () => {
                console.log("xhr.readyState---  " + _xhr.readyState);
                console.log("xhr.status-----  " + _xhr.status);
                if (_xhr.readyState === 4 && (_xhr.status >= 200 && _xhr.status < 400)) {
                    console.log("responseText===", _xhr, typeof (_xhr.responseText));
                    let _repData = JSON.parse(_xhr.responseText);
                    if (_repData.code != 0) {
                        UIHelper.showTips(_repData.errStr);
                        return;
                    }
                    UIHelper.showTips("Vinculação bem sucedida!");
                }
            };
            _xhr.open("GET", _url, true);
            _xhr.send();
        }
    }

    onClickClose() {
        this.node.destroy();
    }
}
