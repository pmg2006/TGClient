import { DATA_BACK_PACK, Pack_Good, NotVipSFName,prop_mg, EM_PROP_TYPE,VipSFName } from "./prop/prop_defind";
const { ccclass, property } = cc._decorator;
import { AudioControl } from "./AudioControl";

@ccclass
export default class panel_email extends cc.Component {

    @property(cc.Node)
    mainPanel:cc.Node = null;

    @property(cc.Node)
    sysMailPanel:cc.Node = null;

    @property(cc.Node)
    frendsMailPanel:cc.Node = null;

    @property(cc.Node)
    sendMailPanel:cc.Node = null;
    @property([cc.Node])
    checkMaskNodeList:cc.Node[] = [];

    @property([cc.Node])
    eMailItem:cc.Node[] = [];

    @property(cc.Node) //没有邮件提示
    noEmail:cc.Node = null;

    @property(cc.EditBox)
    titleEditBox_send:cc.EditBox = null;
    @property(cc.EditBox)
    idEditBox_send:cc.EditBox = null;
    @property(cc.EditBox)
    content_send:cc.EditBox = null;
    @property(cc.ScrollView)
    sysScrollview:cc.ScrollView = null;
    @property(cc.ScrollView)
    frendScrollview:cc.ScrollView = null;
    @property([cc.SpriteFrame])
    emailItemSprite:cc.SpriteFrame[] = [];

    //邮件内容
    @property([cc.Label])  //邮件标题
    contentTitle:cc.Label[] = [];
    @property([cc.Label])  //邮件名称
    contentName:cc.Label[] = [];
    @property([cc.Label])  //发送过来的玩家ID
    contentId:cc.Label[] = [];
    @property([cc.Label]) //邮件时间
    contentTime:cc.Label[] = [];
    @property([cc.Label]) //邮件内容
    contentDetail:cc.Label[] = [];
    // @property([cc.Node]) //附件内容
    // contentFujian:cc.Node[] = [];

    //好友邮件附件节点和系统邮件附件节点
    @property([cc.Sprite])
    canRecive_fujianSp:cc.Sprite[] = [];

    @property([cc.Node])
    contents:cc.Node[] = [];

    @property(cc.Node)
    sendDrop_tip:cc.Node = null;
    @property(cc.Node)
    content_sendDrop:cc.Node = null;
    @property(cc.Node)
    totalIcon:cc.Node = null;

    @property(cc.Node)
    panelPropInfo:cc.Node = null;

    //发邮件附件物品图标
    @property(cc.Sprite)
    fujianSp:cc.Sprite = null;

    sendItemID:number = 0;

    // panel_prop_good_pre:cc.Prefab = null;

    // panel_shop_good_icons:cc.SpriteAtlas = null;
    sysEmailData:[];
    friendEmailData:[];
    curselectIndex:number;
    curEmailData:[];
    curEmailIndex:number;
    sfNodeList:cc.Node[] = [];
    curPropCfg:prop_mg = null;
    orginSp:cc.SpriteFrame = null;
    sendPropCnt:number;

    onLoad(){
        this.curselectIndex = 0;
        this.sendPropCnt = 1;
        this.curEmailIndex = 0;
        this.curEmailData = [];
        this.orginSp = this.fujianSp.spriteFrame;
        for(let i = 0; i < this.totalIcon.childrenCount; i ++){
            this.sfNodeList.push(this.totalIcon.children[i]);
        }
        onfire.on("eamilPropBtnClick", this.eamilPropBtnClick.bind(this))
        onfire.on("getBackPack", this.initSendMailTips.bind(this))
        onfire.on("sendPropToFuJian", this.sendPropToFuJian.bind(this))
    }

    start(){
        NetHelp.getMail(1,(ret)=>{
            if(ret.code != 0){
                console.log(ret);
                this.noEmail.active = true;
                this.checkMaskNodeList[0].getChildByName("scrollview").active = false;
                this.checkMaskNodeList[0].getChildByName("mailContent").active = false;
                return;
            }
            this.sysEmailData = ret.data;
            console.log("==getMail==1=",this.sysEmailData)
            // userId:number 用户ID   fromGameID:number 来自哪个用户GameId  fromNickName:string 来自哪个用户昵称
            //isSys:number  系统邮件0否1是   title:string 标题   content:string  内容   reward:string 奖励道具 itemID_cnt这样的格式多用#分割
            //createTime：number  开始的时间戳    isRead:number  是否阅读
            //发送邮件:gameID发送对象的游戏ID   参数title邮件标题    参数content邮件内容  reward 物品id_数量 这样的字符串例如1_10
           // this.initMainPanel();
        });
        NetHelp.getMail(0,(ret)=>{
            if(ret.code != 0){
                console.log(ret);
                this.noEmail.active = true;
                this.checkMaskNodeList[1].getChildByName("scrollview").active = false;
                this.checkMaskNodeList[1].getChildByName("mailContent").active = false;
                return;
            }
            this.friendEmailData = ret.data;
            console.log("==getMail==0=",this.friendEmailData)
            // userId:number 用户ID   fromGameID:number 来自哪个用户GameId  fromNickName:string 来自哪个用户昵称
            //isSys:number  系统邮件0否1是   title:string 标题   content:string  内容   reward:string 奖励道具 itemID_cnt这样的格式多用#分割
            //createTime：number  开始的时间戳    isRead:number  是否阅读
            //发送邮件:gameID发送对象的游戏ID   参数title邮件标题    参数content邮件内容  reward 物品id_数量 这样的字符串例如1_10
            this.initMainPanel();
        });
        //获取道具配置    暂时每次拉取道具信息
        if(GD.propCfg){
            return;
        }
        NetHelp.getPropCfg((ret)=>{
            if(ret.code != 0){
                console.log(ret);
                return;
            }
            GD.propCfg = ret.data as Pack_Good;
        });
        this.panelPropInfo.active = false;
    }
    initMainPanel(){
        for(let i = 0;i<this.checkMaskNodeList.length;i++){
            if(this.curselectIndex==i){
                this.checkMaskNodeList[i].active=true;
            }else{
                this.checkMaskNodeList[i].active=false;
            }
        }
        
        if(this.curselectIndex ==0){
            this.curEmailData = this.sysEmailData;

        }else if(this.curselectIndex==1){
            this.curEmailData = this.friendEmailData;
        }
        this.noEmail.active = false;
        if(this.curselectIndex<2){ //系统邮件和好友邮件
            if(this.curEmailData == null ||(this.curEmailData && this.curEmailData.length<=0)){
                this.noEmail.active = true;
                this.checkMaskNodeList[this.curselectIndex].getChildByName("scrollview").active = false;
                this.checkMaskNodeList[this.curselectIndex].getChildByName("mailContent").active = false;
                return;
            }
            this.checkMaskNodeList[this.curselectIndex].getChildByName("scrollview").active = true;
            this.checkMaskNodeList[this.curselectIndex].getChildByName("mailContent").active = true;
            this.contents[this.curselectIndex].removeAllChildren()
            for(let i = 0;i<this.curEmailData.length;i++){
                let emailData:any = this.curEmailData[i];
                let item = cc.instantiate(this.eMailItem[this.curselectIndex]);
                item.active = true;
                if(emailData.isRead==1){
                    item.getComponent(cc.Sprite).spriteFrame = this.emailItemSprite[1];
                    if(this.curselectIndex==0){
                        item.getChildByName("name").getComponent(cc.Label).string = "System/GM";
                    }else{
                        item.getChildByName("name").getComponent(cc.Label).string = emailData.fromNickName;
                    }
                }else{
                    item.getComponent(cc.Sprite).spriteFrame = this.emailItemSprite[0];
                    if(this.curselectIndex==0){
                        item.getChildByName("name").getComponent(cc.Label).string = "System/GM";
                    }else{
                        item.getChildByName("name").getComponent(cc.Label).string = emailData.fromNickName;
                    }
                }
                item.getChildByName("weidubiaoti").getComponent(cc.Label).string = emailData.title;
                item.name = i+"";
                this.contents[this.curselectIndex].addChild(item);
            }
            this.initEmailConttent(0);
        }
    }

    initSysMailPanel(){
        AudioControl.playClick();
        this.curselectIndex = 0;
        this.initMainPanel();
    }

    emailItemBtnClick(event,target){
        AudioControl.playClick();
        this.initEmailConttent(event.target.name)
        for(let i = 0;i<this.contents[this.curselectIndex].children.length;i++){
            this.contents[this.curselectIndex].children[i].color = new cc.Color(255,255,255)
        }
        event.target.color = new cc.Color(244,230,103);
    }

    emailReplyBtnClick(event,target){
        AudioControl.playClick();
        for(let i = 0;i<this.checkMaskNodeList.length;i++){
            if(2==i){
                this.checkMaskNodeList[i].active=true;
            }else{ 
                this.checkMaskNodeList[i].active=false;
            }
        }
        let eMailItemData:any = this.curEmailData[this.curEmailIndex];
        if(eMailItemData!= null){
            this.idEditBox_send.string = eMailItemData.fromGameID;
        }
    }

    initEmailConttent(index){
        if(this.curEmailData==null||this.curEmailData.length<1) return; 
        this.curEmailIndex = index;
        this.checkMaskNodeList[this.curselectIndex].getChildByName("mailContent").active = false;
        let eMailItemData:any = this.curEmailData[index];
        let emailId = eMailItemData._id;
        this.canRecive_fujianSp[this.curselectIndex].node.parent.active = eMailItemData.reward==""?false:true;
        this.canRecive_fujianSp[this.curselectIndex].node.parent.getChildByName("grop_bg").active = false;
        let a = eMailItemData.reward.split('_');
        let _itemid = parseInt(a[0]);
        let cnt =  parseInt(a[1]);
        if(eMailItemData.isRead==1){
            this.checkMaskNodeList[this.curselectIndex].getChildByName("mailContent").active = true;
            this.contentTitle[this.curselectIndex].string = eMailItemData.title;
            this.contentName[this.curselectIndex].string = eMailItemData.isSys == 1 ?"System/GM":eMailItemData.fromNickName;
            this.contentId[this.curselectIndex].string = "ID:"+eMailItemData.fromGameID;
            this.contentTime[this.curselectIndex].string = this.timestampToTime(eMailItemData.createTime);
            this.contentDetail[this.curselectIndex].string = eMailItemData.content;
            this.curPropCfg = this.getPropCfgById(_itemid);
            if(this.curPropCfg!= null){
                this.canRecive_fujianSp[this.curselectIndex].node.getChildByName("num").active = true;
                if(this.curPropCfg.type != EM_PROP_TYPE.Vip){
                    this.canRecive_fujianSp[this.curselectIndex].spriteFrame=this.getSFNodeByName(this.sfNodeList,NotVipSFName[this.curPropCfg.type]).getComponent(cc.Sprite).spriteFrame;
                }else{
                    this.canRecive_fujianSp[this.curselectIndex].spriteFrame=this.getSFNodeByName(this.sfNodeList,VipSFName[this.curPropCfg.describe]).getComponent(cc.Sprite).spriteFrame;
                }
                this.canRecive_fujianSp[this.curselectIndex].node.getChildByName("num").getComponent(cc.Label).string = "X"+cnt;
                this.canRecive_fujianSp[this.curselectIndex].node.parent.getChildByName("grop_bg").active = true;
            }
        }else{
            NetHelp.readMail(emailId,(ret)=>{
                if(ret.code != 0){
                    console.log(ret);
                    return;
                }
                let item = this.contents[this.curselectIndex].getChildByName(index)
                if(item){
                    item.getComponent(cc.Sprite).spriteFrame = this.emailItemSprite[1];
                }
                onfire.fire("readEmail")
                this.checkMaskNodeList[this.curselectIndex].getChildByName("mailContent").active = true;
                this.contentTitle[this.curselectIndex].string = eMailItemData.title;
                this.contentName[this.curselectIndex].string = eMailItemData.isSys == 1 ?"System/GM":eMailItemData.fromNickName;
                this.contentId[this.curselectIndex].string = "ID:"+eMailItemData.fromGameID;
                this.contentTime[this.curselectIndex].string = this.timestampToTime(eMailItemData.createTime);
                this.contentDetail[this.curselectIndex].string = eMailItemData.content;
                this.curPropCfg = this.getPropCfgById(_itemid);
                if(this.curPropCfg!= null){
                    this.canRecive_fujianSp[this.curselectIndex].node.getChildByName("num").active = true;
                    if(this.curPropCfg.type != EM_PROP_TYPE.Vip){
                        this.canRecive_fujianSp[this.curselectIndex].spriteFrame=this.getSFNodeByName(this.sfNodeList,NotVipSFName[this.curPropCfg.type]).getComponent(cc.Sprite).spriteFrame;
                    }else{
                        this.canRecive_fujianSp[this.curselectIndex].spriteFrame=this.getSFNodeByName(this.sfNodeList,VipSFName[this.curPropCfg.describe]).getComponent(cc.Sprite).spriteFrame;
                    }
                    this.canRecive_fujianSp[this.curselectIndex].node.getChildByName("num").getComponent(cc.Label).string = "X"+cnt;
                    this.canRecive_fujianSp[this.curselectIndex].node.parent.getChildByName("grop_bg").active = true;
                }
            });
        }
    }

    timestampToTime(timestamp) {
        var date = new Date(timestamp*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    }

    initFrendMailPanel(){
        AudioControl.playClick();
        this.curselectIndex = 1;
        this.initMainPanel();
    }

    initsendMailPanel(){
        AudioControl.playClick();
        this.curselectIndex = 2;
    }

    sendEmailBtnClick(){
        AudioControl.playFinish();
        if(this.titleEditBox_send.string==''){
            GD.GameTool.showTextTips("請輸入標題/Enter Title");
            return;
        }
        if(this.idEditBox_send.string==''){
            GD.GameTool.showTextTips("請輸入ID/Enter ID");
            return;
        }
        if(this.content_send.string==''){
            GD.GameTool.showTextTips("請輸入内容/Enter Content");
            return;
        }
        let title = this.titleEditBox_send.string;
        let gameID = parseInt(this.idEditBox_send.string);
        let content = this.content_send.string;
        let reward = this.sendItemID?  this.sendItemID+"_"+this.sendPropCnt:"";
        NetHelp.sendMail(gameID,title,content,reward,(ret)=>{
            console.log(ret.code)
            GD.GameTool.showTextTips(ret.errStr);
            this.content_send.string='';
            this.idEditBox_send.string='';
            this.titleEditBox_send.string='';
            this.fujianSp.spriteFrame = this.orginSp;
            this.fujianSp.node.getChildByName("num").active = false;
            this.fujianSp.node.parent.getChildByName("grop_bg").active = false;
            //发送邮件:gameID发送对象的游戏ID   参数title邮件标题    参数content邮件内容  reward 物品id_数量 这样的字符串例如1_10
        });
    }

    initSendMailTips(){
        if(this.content_sendDrop==null)  return;
        if(this.content_sendDrop.children.length>0){
            this.sendDrop_tip.active = false;
        }else{
            this.sendDrop_tip.active = true;
        }
    }
    eamilPropBtnClick(data){
        AudioControl.playClick();
        this.sendItemID = data.itemID;
        this.curPropCfg = this.getPropCfgById(data.itemID);
         if(this.sfNodeList==null) return
        let comp = this.panelPropInfo.getComponent("panel_prop_info")
        comp.writePanel(data.itemID,data.cnt,this.sfNodeList);
        comp.initBtnActive()
        this.panelPropInfo.active = true;
    }

    fuJianClick(){
        AudioControl.playClick();
        this.fujianSp.node.getChildByName("num").active = false;
        this.fujianSp.node.parent.getChildByName("grop_bg").active = false;
        this.fujianSp.spriteFrame = this.orginSp;
        let retData:any ={}
        retData.itemID = this.sendItemID;
        retData.cnt = 0;
        onfire.fire('rebackPropToFuJian',retData);
    }


    sendPropToFuJian(data){
        this.sendItemID = data.itemID;
        this.sendPropCnt = data.cnt;
        this.curPropCfg = this.getPropCfgById(data.itemID);
         if(this.sfNodeList==null) return
        
        if(this.curPropCfg.type != EM_PROP_TYPE.Vip){
            this.writeNodeSpriteFrame(this.getSFNodeByName(this.sfNodeList,NotVipSFName[this.curPropCfg.type]).getComponent(cc.Sprite))
        }else{
            this.writeNodeSpriteFrame(this.getSFNodeByName(this.sfNodeList,VipSFName[this.curPropCfg.describe]).getComponent(cc.Sprite))
        }
    }

    private getPropCfgById(itemID:number):prop_mg{
        for(let key in GD.propCfg){
            if(parseInt(key) == itemID)return GD.propCfg[key];
        }
        return null;
    }

    writeNodeSpriteFrame(sf:cc.Sprite){
        this.fujianSp.spriteFrame = sf.spriteFrame;
        this.fujianSp.node.parent.getChildByName("grop_bg").active = true;
        this.fujianSp.node.getChildByName("num").active = true;
        this.fujianSp.node.getChildByName("num").getComponent(cc.Label).string = "x"+this.sendPropCnt;
    }

    getSFNodeByName(nodeList:cc.Node[],name:string):cc.Node{
        let sf = null;
        for(let i = 0; i < nodeList.length;i++){
            sf = nodeList[i]
            if(sf.name == name)return sf;
        }
    }
}
