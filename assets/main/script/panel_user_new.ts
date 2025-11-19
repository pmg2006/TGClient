import { AudioControl } from "./AudioControl";
import { EM_DISPLAY_TYPE } from "./GameData";
import panel_pay_new from "./panel_pay_new";
import panel_user_bind from "./panel_user_bind";
import { VipJieShao } from "./prop/prop_defind";
import recharge_item from "./recharge_item";
import withdraw_item from "./withdraw_item";

const {ccclass, property} = cc._decorator;

@ccclass
export default class panel_user_new extends cc.Component {

    @property(cc.Node)
    avatar:cc.Node = null;

    @property(cc.Label)
    lbl_nickname:cc.Label = null;

    @property(cc.Label)
    lbl_gameID:cc.Label = null;

    @property(cc.Node)
    vipNode:cc.Node = null;

    @property(cc.Node)
    phone_unbound:cc.Node = null;
    @property(cc.Node)
    phone_verified:cc.Node = null;

    @property(cc.Node)
    email_unbound:cc.Node = null;
    @property(cc.Node)
    email_verified:cc.Node = null;

    @property(cc.Node)
    btn_ok:cc.Node[] = [];

    @property(cc.Label)
    lbl_withdraw:cc.Label = null;

    @property(cc.Label)
    lbl_totalMoney:cc.Label = null;

    @property(cc.Label)
    lbl_rate:cc.Label = null;

    @property(cc.Node)
    toggleNode:cc.Node[] = [];

    @property(cc.Node)
    recharge:cc.Node = null;
    @property(cc.Node)
    withdraw:cc.Node = null;
    @property(cc.Node)
    recharge_item:cc.Node = null;
    @property(cc.Node)
    withdraw_item:cc.Node = null;

    @property(cc.ProgressBar)
    p_progress:cc.ProgressBar = null

    @property(cc.Node)
    bindNode:cc.Node = null;

    @property(cc.Node)
    helpNode:cc.Node = null;

    @property(cc.Label)
    vipLabel:cc.Label[] = [];   //vip等级，upVip，recharge，betAmount

    @property(cc.ProgressBar)
    vipProgressBar:cc.ProgressBar[] = []; 

    @property(cc.Label)
    lblPhone: cc.Label = null;

    @property(cc.Label)
    lblEmail: cc.Label = null;

    private rechargeData:any = null;
    private withdrawData:any = null;
    private vipConfigData:any = null;
    private curVipIndex:number = 0;
    bindObj = [];

    onLoad (){
    }

    start () {
        this.curVipIndex = KernelData.vipLv;
        NetHelp.getVipConfig(this.initVipInfo.bind(this));
        this.helpNode.active = false;
        this.writePanel();
        this.bindEvent();
    }

    bindEvent(){
        this.bindObj.push(onfire.on("bind_success", this.bindSuccess.bind(this)));
        this.bindObj.push(onfire.on("S_USER_PROP_CHANGED", this.onS_USER_PROP_CHANGED.bind(this)))
    }

    onS_USER_PROP_CHANGED(data) {
        console.log("玩家属性变化通知 user", JSON.stringify(data));
        if ("withdrawAbleScore" in data) {
            // this.diamond.string = data.diamond;
            this.lbl_withdraw.string = GameTools.convertInfo(KernelData.withdrawAbleScore);
        }
    }


    writePanel(){
        GameTools.loadWxHead(this.avatar, KernelData.head);
        this.lbl_nickname.string = KernelData.nickname;
        this.lbl_gameID.string = ""+KernelData.gameID;  
        for(let i = 0;i<this.vipNode.childrenCount;i++){
            if((KernelData.vipLv - 1) == i){
                this.vipNode.children[i].active = true;
            }else{
                this.vipNode.children[i].active = false;
            }
        }
        let phoneChecked = false;
        let emailChecked = false;
        for(let key in KernelData){
            if(KernelData.hasOwnProperty("mobile")){
                console.log("=3444=mobile==",KernelData.mobile)
                phoneChecked = true;
                break;
            }
            if(KernelData.hasOwnProperty("mail")){
                console.log("=444=email==",KernelData.mail)
                emailChecked = true;
                break;
            }
        }
        console.log("===emailChecked==",emailChecked,phoneChecked)
        if(phoneChecked){
            this.lblPhone.string = KernelData.mobile;
            this.phone_unbound.active = false;
            this.phone_verified.active = false;
            this.btn_ok[0].getComponent(cc.Button).interactable = false;
            this.btn_ok[0].getChildByName("Background").color = cc.color(54,54,54);
        }else{
            this.phone_unbound.active = true;
            this.phone_verified.active = false;
            this.btn_ok[0].getComponent(cc.Button).interactable = true;
            this.btn_ok[0].getChildByName("Background").color = cc.color(100,50,150);
        }
        if(emailChecked){
            this.lblEmail.string = KernelData.mail;
            this.email_unbound.active = false;
            this.email_unbound.active = false;
            this.btn_ok[1].getComponent(cc.Button).interactable = false;
            this.btn_ok[1].getChildByName("Background").color = cc.color(54,54,54);
        }else{
            this.email_unbound.active = true;
            this.email_verified.active = false;
            this.btn_ok[1].getComponent(cc.Button).interactable = true;
            this.btn_ok[1].getChildByName("Background").color = cc.color(100,50,150);
        }
       
        //this.lbl_withdraw.string = "R$"+Math.min( KernelData.score, KernelData.realWin + KernelData.referralAmount- KernelData.withdrawalAmount).toFixed(2);
        this.lbl_withdraw.string = "₹"+Math.min( KernelData.score, KernelData.withdrawAbleScore).toFixed(2);

        this.lbl_totalMoney.string = KernelData.depositAmount.toString();

        NetHelp.getMyPayOrder('succeeded',1,10,(ret)=>{
            if(ret.code != 0){
                console.log(ret);
                return;
            }
            this.rechargeData = ret.data;
            this.initHistory(ret.data,0);
        });
        NetHelp.getWithdrawOrder('succeeded',1,10,(ret)=>{
            if(ret.code != 0){
                return;
            }
            console.log(ret);
            this.withdrawData = ret.data;
            this.initHistory(ret.data,1);
        });
        this.bindNode.active = false;
        this.lbl_rate.string = KernelData.depositAmount +"/" + KernelData.realWin.toFixed(2);
        this.p_progress.progress = KernelData.depositAmount / KernelData.realWin
    }

    bindSuccess(data){
        if(data&&data.type==0){
            this.phone_unbound.active = false;
            this.phone_verified.active = true;
            this.btn_ok[0].getComponent(cc.Button).interactable = false;
            this.btn_ok[0].getChildByName("Background").color = cc.color(54,54,54);
        }
        if(data&&data.type==1){
            this.email_unbound.active = false;
            this.email_verified.active = true;
            this.btn_ok[1].getComponent(cc.Button).interactable = false;
            this.btn_ok[1].getChildByName("Background").color = cc.color(54,54,54);
        }
    }

    initVipInfo(ret){
        if (ret && ret.code == 0) {
            this.vipConfigData = ret.data;
            this.initVip(KernelData.vipLv);
        }
    }
    initVip(index){
        if(index<0||index>10)return;
        let curVipData = this.vipConfigData[index];
        this.vipLabel[0].string = index.toString();
        this.vipLabel[1].string = "₹"+curVipData.upgradeReward;
        this.vipLabel[2].string = "₹"+curVipData.rechargeAmount;
        this.vipLabel[3].string = "₹"+curVipData.betAmount;
        //this.vipProgressBar[0].progress = KernelData.recharge / curVipData.upgradeReward;
        this.vipProgressBar[1].progress = KernelData.depositAmount / curVipData.rechargeAmount;
        this.vipProgressBar[2].progress = KernelData.betScore / curVipData.betAmount;
    }

    //
    vipAllRanksBtnClick(){
        AudioControl.playClick();
        this.helpNode.active = true;
    }

    helpNodeCloseBtnClick(){
        AudioControl.playClick();
        this.helpNode.active = false;
    }

    vipBtnYouClick(){
        AudioControl.playClick();
        this.curVipIndex +=1;
        if(this.curVipIndex>10) this.curVipIndex = 10;
        console.log("===this.curVipIndex=y=",this.curVipIndex)
        this.initVip(this.curVipIndex);
    }

    vipBtnZuoClick(){
        AudioControl.playClick();
        this.curVipIndex -=1;
        if(this.curVipIndex<0) this.curVipIndex = 0;
        console.log("===this.curVipIndex=z=",this.curVipIndex)
        this.initVip(this.curVipIndex);
    }


    initHistory(ret:any,type:number){
        if(!ret||!ret.rows|| ret.rows.length<=0) return;
        this.recharge.removeAllChildren();
        this.withdraw.removeAllChildren();
        for(let i = 0;i<ret.rows.length;i++){
            let data = ret.rows[i];
            console.log("data==",data)
            if(type==0){
                let comp = cc.instantiate(this.recharge_item).getComponent(recharge_item);
                comp.writePanel(data);
                comp.node.active = true;
                this.recharge.addChild(comp.node);
            }else{
                let comp = cc.instantiate(this.withdraw_item).getComponent(withdraw_item);
                comp.writePanel(data);
                comp.node.active = true;
                this.withdraw.addChild(comp.node);
            }
        }
    }

    depositHistoryClick(){
        AudioControl.playClick();
        this.toggleNode[0].getComponent(cc.Toggle).isChecked = true;
        this.toggleNode[1].getComponent(cc.Toggle).isChecked = false;
        this.recharge.active = true;
        this.withdraw.active = false;
        this.initHistory(this.rechargeData,0);
    }

    withDrawHistoryClick(){
        AudioControl.playClick();
        this.toggleNode[0].getComponent(cc.Toggle).isChecked = false;
        this.toggleNode[1].getComponent(cc.Toggle).isChecked = true;
        this.recharge.active = false;
        this.withdraw.active = true;
        this.initHistory(this.withdrawData,1);
    }

    toCashOnClick(){
        AudioControl.playClick();
        GD.GameTool.createPanel("hall/panel/panel_pay_new",(node)=>{
            node.getComponent(panel_pay_new).displayType = EM_DISPLAY_TYPE.CASH;
            //node.getComponent(panel_pay_new).changeToCash();
        });
    }

    onClickBindMobile(){
        AudioControl.playClick();
        this.bindNode.active = true;
        this.bindNode.getComponent(panel_user_bind).onChangeToTelClick();
    }

    onClickBindMail(){
        AudioControl.playClick();
        this.bindNode.active = true;
        this.bindNode.getComponent(panel_user_bind).onChangeToEmailClick();
    }

    onDestroy(){
        for (let i = 0; i < this.bindObj.length; i++) {
            onfire.un(this.bindObj[i])
        }
    }

    onClickClose(){
        this.node.destroy();
    }
}
