import { CONNECTION_CONFIG, EM_LOGINTYPE, GET_PHONE_YZM_ADDR,GET_PHONE_YZM_ADDR_EMAIL,RESET_PASSWARD_ADDR, RESET_PASSWARD_EMAIL_ADDR, Server_RES, YZM_ADDR, YZM_ADDR_EMAIL } from "../../kernel/Core/extend/ConstDefine";

const {ccclass, property} = cc._decorator;
import MD5 = require("../../kernel/3rd/md5");
import GameTools from "../../kernel/GameTools";
import { AudioControl } from "./AudioControl";
import { i18nMgr } from "../../kernel/i18n/i18nMgr";
import { EM_ACCOUNT_TYPE } from "./GameData";
import Utils from "../../kernel/Core/extend/Utils";

@ccclass
export default class panel_forgetPassword extends cc.Component {

    @property(cc.Node)
    panel_email:cc.Node = null;//邮箱重设密码

    @property(cc.Node)
    panel_phone:cc.Node = null;//手机重设密码

    @property(cc.Node)
    panel_yzm:cc.Node = null;//验证码节点
   
    @property(cc.EditBox)//邮箱
    acc_email: cc.EditBox = null;

    @property(cc.EditBox) //手机号
    acc_tel: cc.EditBox = null;

    @property(cc.EditBox) //新密码
    pwd: cc.EditBox = null;

    @property(cc.EditBox)  //手机验证码
    tel_yanzheng:cc.EditBox = null;

    @property(cc.Node)  //重新设置密码按钮
    btn_resetpwd:cc.Node = null;

    @property(cc.Node) //验证码
    btn_yzm:cc.Node = null;

    lbl_countDown:cc.RichText = null;
    bg_countDown:cc.Node  = null;
    curType = null;     //当前选择的类型(0-手机,1-邮箱)

    bindObj = [];

    onLoad (){
        this.lbl_countDown = this.panel_yzm.getChildByName("label_time").getChildByName("richtext").getComponent(cc.RichText);
        this.bg_countDown = this.panel_yzm.getChildByName("btn_otp");
        this.curType = 0;
        this.bindEvent();
    }

    start () {
       
        this.btn_yzm.on('click',this.onYzmClick,this);

        // let str1 = cc.sys.localStorage.getItem('act');
        // let str2 = cc.sys.localStorage.getItem('pwd');
        // let bool = cc.sys.localStorage.getItem('isRem');//记住是否记住密码
        // if(str1)this.login_acc_email.string  = str1;
        // if(str2)this.login_pw_email.string  = str2;
        // this.remenberPw.isChecked = (bool && bool == 1);
    }

    bindEvent(){
        this.bindObj.push(onfire.on("countDown", this.onCountDown.bind(this)));
    }

    onInitUI(flag:boolean,type){
        this.panel_email.active = flag;
        this.acc_email.node.active = flag;
        this.panel_phone.active = !flag;
        this.panel_yzm.active = true;
        this.acc_tel.node.active = !flag;
        this.pwd.node.active = true
        this.curType = type;
    }

    onResetClick(){
        AudioControl.playClick();

        if(this.tel_yanzheng.string == ""){
            UIHelper.showTips("Por favor, insira o código de verificação");
            return;
        }
        let url = '';
        if(this.curType==1){
            url =CONNECTION_CONFIG.yanzhengAddr+GET_PHONE_YZM_ADDR_EMAIL(this.acc_email.string,this.tel_yanzheng.string);
        }else{
            url =CONNECTION_CONFIG.yanzhengAddr+GET_PHONE_YZM_ADDR(this.acc_tel.string,this.tel_yanzheng.string);
        }
        //let url = CONNECTION_CONFIG.yanzhengAddr+GET_PHONE_YZM_ADDR(this.acc_tel.string,this.tel_yanzheng.string);
        console.log(url);
        let xhr = new XMLHttpRequest();
        UIHelper.showWaitLayer(true)
        xhr.onreadystatechange = function () {
            console.log("xhr.readyState  " + xhr.readyState);
            console.log("xhr.status  " + xhr.status);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                console.log(xhr.responseText);
                let repData = JSON.parse(xhr.responseText);
                if(repData.code != 0){
                    UIHelper.showTips(repData.errStr);
                    UIHelper.showWaitLayer(false)
                    return;
                }
                //新增一个手机重置密码接口
                let url = "";
                if(this.curType==1){
                    url = CONNECTION_CONFIG.yanzhengAddr+RESET_PASSWARD_EMAIL_ADDR(this.acc_email.string,MD5(this.pwd.string),repData.ticket);
                }else{
                    url = CONNECTION_CONFIG.yanzhengAddr+RESET_PASSWARD_ADDR(this.acc_tel.string,MD5(this.pwd.string),repData.ticket);
                }
                let _xhr = new XMLHttpRequest();
                _xhr.onreadystatechange = ()=>{
                    UIHelper.showWaitLayer(false)
                    console.log("xhr.readyState---  " + _xhr.readyState);
                    console.log("xhr.status-----  " + _xhr.status);
                    if (_xhr.readyState === 4 && (_xhr.status >= 200 && _xhr.status < 400)) {
                        console.log("responseText===",_xhr,typeof(_xhr.responseText));
                        let _repData = JSON.parse(_xhr.responseText);
                        if(_repData.code != 0){
                            UIHelper.showTips(_repData.errStr);
                            return;
                        }
                        UIHelper.showTips("Senha alterada com sucesso!");
                    }
                };
                _xhr.open("GET", url, true);
                _xhr.send();
            }
        }.bind(this);
        xhr.open("GET", url, true);
        xhr.send();
    }

    // 获取验证码
    onYzmClick(){
        if(NetHelp.isInterval){
            UIHelper.showTips(`Por favor, obtenha novamente após ${NetHelp.intervalTime} segundos`);
            return;
        }

        let url = '';
        if(this.curType == EM_ACCOUNT_TYPE.EMAIL){
            if(this.acc_email.string == ''){
                GD.GameTool.showTextTips("o email não pode estar vazio");
                return;
            }
            url = CONNECTION_CONFIG.yanzhengAddr+YZM_ADDR_EMAIL+this.acc_email.string;
        }else{
            if(!Utils.checkMobile(this.acc_tel.string))return;
            url = CONNECTION_CONFIG.yanzhengAddr+YZM_ADDR+this.acc_tel.string;
        }
        console.log(url);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = ()=>{
            console.log("xhr.readyState  " + xhr.readyState);
            console.log("xhr.status  " + xhr.status);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                console.log(xhr.responseText);
                let repData = JSON.parse(xhr.responseText);
                if(repData.code != 0){
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

    onCountDown(str:number){
        if(!NetHelp.isInterval)return;
        if(this.btn_yzm.getComponent(cc.Button).interactable)this.btn_yzm.getComponent(cc.Button).interactable = false;
        if(this.bg_countDown.active)this.bg_countDown.active = false;
        if(!this.lbl_countDown.node.active)this.lbl_countDown.node.active = true;
        this.lbl_countDown.string = `(${str}s)`;
        if(str <= 1){//计时结束
            this.btn_yzm.getComponent(cc.Button).interactable = true;
            this.bg_countDown.active = true;
            this.lbl_countDown.node.active = false;
        }
    }

    onDestroy(){
        this.btn_yzm.off('click',this.onYzmClick,this);
        for (let i = 0; i < this.bindObj.length; i++) {
            onfire.un(this.bindObj[i])
        }
    }

    btnClosed(){
        this.node.destroy();
    }



    onClickLoginAccClear(){
       if(this.acc_email) this.acc_email.getComponent(cc.EditBox).string = "";
       if(this.acc_tel) this.acc_tel.getComponent(cc.EditBox).string = "";
    }

    //倒计时

}
