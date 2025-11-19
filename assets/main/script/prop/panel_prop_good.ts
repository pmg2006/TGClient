
import { panel_shop_good_data } from "../shop/shop_defind";
import panel_prop_info from "./panel_prop_info";
import { DATA_BACK_PACK, EM_PROP_TYPE, NotVipSFName, prop_mg, VipOtherName, VipSFName } from "./prop_defind";
import { AudioControl } from "../AudioControl";
const {ccclass, property} = cc._decorator;

@ccclass
export default class panel_prop_good extends cc.Component {

    @property(cc.Label)
    lbl_title: cc.Label = null;

    @property(cc.Label)
    lbl_cnt: cc.Label = null;

    @property(cc.Sprite)
    icon:cc.Sprite = null;

    @property(cc.Node)
    good_introduce:cc.Node = null;

    @property(cc.Node)
    btn_drop:cc.Node = null;

    sfNodeList:cc.Node[] = [];

    curPropCfg:prop_mg = null;

    itemID:number = 0;

    cnt:number = 0;

    bindObj = [];

    start () {
        this.bindEvent();
    }

    writePanel(itemID,cnt,sfNodeList){
        this.itemID = itemID;
        this.cnt = cnt;
        this.curPropCfg = this.getPropCfgById(itemID);
        this.sfNodeList = sfNodeList;
        if(this.curPropCfg.type != EM_PROP_TYPE.Vip){
            this.lbl_title.string = this.curPropCfg.describe;
            this.lbl_cnt.string = "X" + cnt;
            // this.writeSpriteFrame(this.panel_shop_good_icons.getSpriteFrame(NotVipSFName[this.curPropCfg.type]))
            this.writeNodeSpriteFrame(this.getSFNodeByName(this.sfNodeList,NotVipSFName[this.curPropCfg.type]).getComponent(cc.Sprite))
        }else{
            //都是vip卡的情况
            this.lbl_title.string = VipOtherName[this.curPropCfg.describe];
            this.lbl_cnt.string = "X" + cnt;
            // this.writeSpriteFrame(this.panel_shop_good_icons.getSpriteFrame(VipSFName[this.curPropCfg.describe]));
            this.writeNodeSpriteFrame(this.getSFNodeByName(this.sfNodeList,VipSFName[this.curPropCfg.describe]).getComponent(cc.Sprite))
        }

        this.good_introduce.on('click',this.onGoodIntrClick,this);
        if(this.btn_drop)
        this.btn_drop.on("click",this.onPropEmailBtnClick,this)
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

    refreshCount(itemID:number,count:number){
        if(this.itemID != itemID)return;
        this.cnt -= count;
        if(this.cnt <= 0){
            this.node.destroy();
        }
        this.lbl_cnt.string = "X" + this.cnt;
    }

    onGoodIntrClick(){
        AudioControl.playClick();
        GD.GameTool.createPanel("hall/panel/panel_prop_info",(node:cc.Node)=>{
            let comp = node.getComponent("panel_prop_info") as panel_prop_info;
            comp.writePanel(this.itemID,this.cnt,this.sfNodeList);

        });
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

    onDestroy(){
        this.good_introduce.off('click');
        GameTools.destroyOnFire(this.bindObj);
        if(this.btn_drop)
        this.btn_drop.off('click');

    }

    onPropEmailBtnClick(){
        let retData:any ={}
        retData.itemID = this.itemID;
        retData.cnt = this.cnt;
        onfire.fire("eamilPropBtnClick", retData)
    }


}
