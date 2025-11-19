import { prop_mg, EM_PROP_TYPE, NotVipSFName, VipOtherName, VipSFName, VipJieShao, NotVipJieShao } from "./prop_defind";
import { AudioControl } from "../AudioControl";
const {ccclass, property} = cc._decorator;

@ccclass
export default class panel_prop_info extends cc.Component {

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Sprite)
    icon:cc.Sprite = null;

    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Node)
    lbl_introduce_text:cc.Node = null;

    @property(cc.Node)
    btn_use:cc.Node = null;

    @property(cc.Node)
    btn_sell:cc.Node = null;

    @property(cc.Node)
    btn_send:cc.Node = null;

    @property(cc.EditBox)
    lbl_useCount:cc.EditBox = null;

    @property(cc.Node)
    btn_addUseCount:cc.Node = null;

    @property(cc.Node)
    btn_subUseCount:cc.Node = null;

    @property(cc.Node)
    btn_max: cc.Node = null;

    curPropCfg:prop_mg = null;

    sfNodeList:cc.Node[] = [];

    itemID:number = 0;

    cnt:number = 0;

    useCount:number = 1;//使用数量

    addLongTouch:boolean = false;
    subLongTouch:boolean = false;
    addTouchStartTime:number = 0;
    subTouchStartTime:number = 0;

    bindObj = [];

    onLoad(){
        this.btn_addUseCount.on(cc.Node.EventType.TOUCH_START,this.onAUCClick,this);
        this.btn_addUseCount.on(cc.Node.EventType.TOUCH_CANCEL,this.onAUCCancel,this);
        this.btn_addUseCount.on(cc.Node.EventType.TOUCH_END,this.onAUCCancel,this);
        
        this.btn_subUseCount.on(cc.Node.EventType.TOUCH_START,this.onSUCClick,this);
        this.btn_subUseCount.on(cc.Node.EventType.TOUCH_CANCEL,this.onSUCCancel,this);
        this.btn_subUseCount.on(cc.Node.EventType.TOUCH_END,this.onSUCCancel,this);

        this.btn_max.on(cc.Node.EventType.TOUCH_END,this.onMax,this);

    }

    start () {
        this.bindEvent();
    }
    
    onAUCClick(){
        //记录下触摸开始时间
        this.addTouchStartTime = 1;
    }

    onAUCCancel(){
        if(this.addTouchStartTime > 30){
            this.addTouchStartTime = 0;
        }else if(this.addTouchStartTime <= 30){
            this.addTouchStartTime = 0;
            this.addUseCount();
        }
    }

    onSUCClick(){
        //记录下触摸开始时间
        this.subTouchStartTime = 1;
    }

    onSUCCancel(){
        if(this.subTouchStartTime > 30){
            this.subTouchStartTime = 0;
        }else if(this.subTouchStartTime <= 30){
            this.subTouchStartTime = 0;
            this.subUseCount();
        }
    }

    //增加使用数量
    addUseCount(){
        this.useCount++;
        if(this.useCount > this.cnt){
            this.useCount = this.cnt;
        }
        this.lbl_useCount.string = ""+this.useCount;
        AudioControl.playClick();
        // console.log(this.lbl_useCount.string);
    }

    //减少使用数量
    subUseCount(){
        this.useCount--;
        if(this.useCount < 1){
            this.useCount = 1;
        }
        this.lbl_useCount.string = ""+this.useCount;
        AudioControl.playClick();
        // console.log(this.lbl_useCount.string);
    }

    //长按增加
    addTouchHold(){
        if(this.addTouchStartTime > 0){
            this.addTouchStartTime++ ;
            if(this.addTouchStartTime > 30){
                this.addUseCount();
            }
        }
    }

    //长按减少
    subTouchHold(){
        if(this.subTouchStartTime > 0){
            this.subTouchStartTime++ ;
            if(this.subTouchStartTime > 30){
                this.subUseCount();
            }
        }
    }

    onMax() {
        this.useCount = this.cnt;
        this.lbl_useCount.string = "" + this.useCount;
        AudioControl.playClick();
    }



    //编辑
    onEditEventEnd(event){
        let regExp2=/^[0-9]*[1-9][0-9]*$/;
        if(!regExp2.test(this.lbl_useCount.string)){
            UIHelper.showTips("非法输入");
            this.lbl_useCount.string = '1';
            return;
        }
        this.useCount = parseInt(this.lbl_useCount.string);
        if(this.useCount > this.cnt){
            this.useCount = this.cnt;
            this.lbl_useCount.string = this.useCount+''
        }
    }

    update(dt: number){
        this.addTouchHold();
        this.subTouchHold();
    }

    writePanel(itemID,cnt,sfNodeList){
        this.itemID = itemID;
        this.cnt = cnt;
        this.curPropCfg = this.getPropCfgById(itemID);
        this.sfNodeList = sfNodeList;
        if(this.curPropCfg.type != EM_PROP_TYPE.Vip){
            this.title.string = this.curPropCfg.describe + "X" + cnt;
            // this.writeSpriteFrame(this.panel_shop_good_icons.getSpriteFrame(NotVipSFName[this.curPropCfg.type]))
            this.writeNodeSpriteFrame(this.getSFNodeByName(this.sfNodeList,NotVipSFName[this.curPropCfg.type]).getComponent(cc.Sprite))
            let arr = NotVipJieShao[this.curPropCfg.type];
            for(let i = 0; i < arr.length; i++){
                let str = arr[i];
                let lbl = cc.instantiate(this.lbl_introduce_text);
                lbl.getComponent(cc.Label).overflow = cc.Label.Overflow.RESIZE_HEIGHT;
                lbl.getComponent(cc.Label).string = str;
                this.content.addChild(lbl);
            }
        }else{
            //都是vip卡的情况
            this.title.string = VipOtherName[this.curPropCfg.describe] + "X" + cnt;
            // this.writeSpriteFrame(this.panel_shop_good_icons.getSpriteFrame(VipSFName[this.curPropCfg.describe]));
            this.writeNodeSpriteFrame(this.getSFNodeByName(this.sfNodeList,VipSFName[this.curPropCfg.describe]).getComponent(cc.Sprite))
            
            //写入介绍
            let arr = VipJieShao[this.curPropCfg.describe];
            for(let i = 0; i < arr.length; i++){
                let str = arr[i];
                let lbl = cc.instantiate(this.lbl_introduce_text);
                lbl.getComponent(cc.Label).overflow = cc.Label.Overflow.RESIZE_HEIGHT;
                lbl.getComponent(cc.Label).string = str;
                this.content.addChild(lbl);
            }
        }
        this.btn_use.on('click',this.onUseClick,this);
        this.btn_sell.on('click',this.onSellClick,this);
    }

    writeNodeSpriteFrame(sf:cc.Sprite){
        this.icon.node.width = sf.node.width;
        this.icon.node.height = sf.node.height
        this.icon.spriteFrame = sf.spriteFrame;
    }
    getSFNodeByName(nodeList:cc.Node[],name:string):cc.Node{
        let sf = null;
        for(let i = 0; i < nodeList.length;i++){
            sf = nodeList[i]
            if(sf.name == name)return sf;
        }
    }

    bindEvent() {
        this.bindObj = [];
        this.bindObj.push(onfire.on("countchange", this.refreshCount.bind(this)));
    }

    refreshCount(itemID,count){
        console.log(count);
        this.cnt -= count;
        if(this.cnt <= 0){
            this.node.destroy();
        }
        this.title.string = this.curPropCfg.describe + "X" + this.cnt;
    }

    onUseClick(){
        if(this.curPropCfg.type == EM_PROP_TYPE.JiPaiQi){
            UIHelper.showTips("尚未开放");
            return;
        }
        NetHelp.useProp(this.itemID,this.useCount,(ret)=>{
            if(ret.code != 0){
                UIHelper.showTips(ret.info);
                return;
            }

            // if (this.curPropCfg.type == EM_PROP_TYPE.BlindBoxChip) {
            //     GD.GameTool.createPanel("hall/panel/panel_get",(node:cc.Node)=>{
            //         let comp = node.getComponent("panel_get");
            //         comp.writePanel(ret.data.itemID, ret.data.cnt, this.sfNodeList);
            //     });
            // }
            
            else {
                //使用成功
                UIHelper.showTips("使用成功");
                AudioControl.playFinish();
            }
     
            onfire.fire('countchange',ret.data.itemID,ret.data.cnt);
        })
    }

    onSellClick(){
        UIHelper.showTips("尚未开放");
    }

    onSendEmail(){
        this.node.active = false;
        let retData:any ={}
        retData.itemID = this.itemID;
        retData.cnt = Number(this.lbl_useCount.string);
        onfire.fire('sendPropToFuJian',retData);
    }

    initBtnActive(){
        this.btn_use.active = false;
        this.btn_sell.active = false;
        this.btn_send.active = true;
        this.lbl_useCount.string = "1";
    }


    writeSpriteFrame(sf?:cc.SpriteFrame){
        //设置图片
        if(sf){
            this.icon.spriteFrame = sf;
        }
    }

    private getPropCfgById(itemID:number):prop_mg{
        for(let key in GD.propCfg){
            if(parseInt(key) == itemID)return GD.propCfg[key];
        }
        return null;
    }

    onDestroy() {
        for (let i = 0; i < this.bindObj.length; i++) {
            onfire.un(this.bindObj[i]);
        }
        this.btn_sell.off('click');
        this.btn_use.off('click');
    }

    onCloseBtn(){
        this.node.active = false;
    }

}
