import { CONNECTION_CONFIG, GET_PHONE_YZM_ADDR, GET_PHONE_YZM_ADDR_EMAIL, YZM_ADDR, YZM_ADDR_EMAIL } from "../../kernel/Core/extend/ConstDefine";
import { AudioControl } from "./AudioControl";
import panel_pay_new from "./panel_pay_new";
import { VipJieShao } from "./prop/prop_defind";
import recharge_item from "./recharge_item";
import withdraw_item from "./withdraw_item";
import MD5 = require("../../kernel/3rd/md5");
import { i18nMgr } from "../../kernel/i18n/i18nMgr";
import Utils from "../../kernel/Core/extend/Utils";
import { EM_ACCOUNT_TYPE } from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class panel_user_bind extends cc.Component {

    @property(cc.Node)
    panel_bindMobile:cc.Node = null;

    @property(cc.Node)
    panel_bindMail:cc.Node = null;

    @property(cc.EditBox)
    acc_email: cc.EditBox = null;

    @property(cc.EditBox)
    pw_email: cc.EditBox = null;

    @property(cc.EditBox)
    acc_tel: cc.EditBox = null;

    @property(cc.EditBox)
    pw_tel: cc.EditBox = null;

    @property(cc.EditBox)
    yanzheng:cc.EditBox = null;

    @property(cc.Node)
    btn_bind:cc.Node = null;

    @property(cc.Node)
    btn_yzm:cc.Node = null;

    @property(cc.Node)
    panel_yzm:cc.Node = null;

    @property(cc.Label)
    title:cc.Label = null;

    lbl_countDown:cc.RichText = null;
    bg_countDown:cc.Node  = null;
    curType = null;     //当前选择的类型(0-手机,1-邮箱)
    bindObj = [];

    onLoad (){
        this.lbl_countDown = this.panel_yzm.getChildByName("label_time").getChildByName("richtext").getComponent(cc.RichText);
        this.bg_countDown = this.panel_yzm.getChildByName("btn_otp");
        this.curType = EM_ACCOUNT_TYPE.MOBILE;
        this.bindEvent();
    }

    start () {
        this.btn_bind.on('click',this.onBindClick,this);
    }

    bindEvent(){
        this.bindObj.push(onfire.on("countDown", this.onCountDown.bind(this)));
    }

    onBindClick(){
        AudioControl.playClick();

        if(this.yanzheng.string == ""){
            UIHelper.showTips("please input code");
            return;
        }
        let url = '';
        if(this.curType==1){
            url =CONNECTION_CONFIG.yanzhengAddr+GET_PHONE_YZM_ADDR_EMAIL(this.acc_email.string,this.yanzheng.string);
        }else{
            url =CONNECTION_CONFIG.yanzhengAddr+GET_PHONE_YZM_ADDR(this.acc_tel.string,this.yanzheng.string);
        }

        console.log("url--",url);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log("xhr.readyState  " + xhr.readyState);
            console.log("xhr.status  " + xhr.status);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                console.log(xhr.responseText);
                let repData = JSON.parse(xhr.responseText);
                if(repData.code != 0){
                    UIHelper.showTips(repData.errStr);
                    return;
                }
                if(this.curType==1){
                    NetHelp.bindMail(this.acc_email.string, MD5(this.pw_email.string), repData.ticket, (ret)=>{
                        console.log("ret:",ret)
                        if(ret.code != 0){
                            UIHelper.showTips(ret.errStr);
                            return;
                        }
                        this.node.active = false;
                        onfire.fire("bind_success", {type:1});
                        UIHelper.showTips(i18nMgr._getLabel("bind success", []));
                    });
                }else{
                    NetHelp.bindPhone("+91"+this.acc_tel.string, MD5(this.pw_tel.string), repData.ticket, (ret)=>{
                        console.log("ret:",ret)
                        if(ret.code != 0){
                            UIHelper.showTips(ret.errStr);
                            return;
                        }
                        this.node.active = false;
                        onfire.fire("bind_success", {type:0});
                        UIHelper.showTips(i18nMgr._getLabel("bind success", []));
                    });
                }
            }
        }.bind(this);
        xhr.open("GET", url, true);
        xhr.send();

    }

    onYzmClick(){
        let url = '';
        if(this.curType==EM_ACCOUNT_TYPE.EMAIL){
            if(!Utils.checkEmail(this.acc_email.string))return;
            url = CONNECTION_CONFIG.yanzhengAddr+YZM_ADDR_EMAIL+this.acc_email.string;
        }else{
            if(!Utils.checkMobile(this.acc_tel.string))return;
            url = CONNECTION_CONFIG.yanzhengAddr+YZM_ADDR+this.acc_tel.string;
        }
        if(NetHelp.isInterval){
            UIHelper.showTips(`请${NetHelp.intervalTime}秒后再获取`);
            return;
        }

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = ()=>{
            console.log("xhr.readyState  " + xhr.readyState);
            console.log("xhr.status  " + xhr.status);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                console.log("responseText===",xhr,typeof(xhr.responseText));
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

    //切换手机
    onChangeToTelClick(){
        AudioControl.playClick();
        this.curType = 0;
        this.panel_bindMobile.active = true;
        this.panel_bindMail.active = false;
        this.title.string = i18nMgr._getLabel("Bind", [])
    }
    //切换邮箱
    onChangeToEmailClick(){
        AudioControl.playClick();
        this.curType = 1;
        this.panel_bindMobile.active = false;
        this.panel_bindMail.active = true;
        this.title.string = i18nMgr._getLabel("Bind", [])
    }

    onCountDown(str:number){
        if(!NetHelp.isInterval)return;
        if(this.btn_yzm.getComponent(cc.Button).interactable) this.btn_yzm.getComponent(cc.Button).interactable = false;
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
        this.btn_bind.off('click',this.onBindClick,this);
        for (let i = 0; i < this.bindObj.length; i++) {
            onfire.un(this.bindObj[i])
        }
    }

    btnClosed(){
        this.node.active = false;
    }

    onClickLoginAccClear(){
       if(this.acc_tel)this.acc_tel.getComponent(cc.EditBox).string = "";
       if(this.acc_email) this.acc_email.getComponent(cc.EditBox).string = "";
    }

    //倒计时
    fbBtnClick(){

    }
}
