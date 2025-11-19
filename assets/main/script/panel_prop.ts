import panel_prop_good from "./prop/panel_prop_good";
import { DATA_BACK_PACK, Pack_Good, prop_mg } from "./prop/prop_defind";


const { ccclass, property } = cc._decorator;

@ccclass
export default class panel_prop extends cc.Component {

    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Node)
    totalIcon:cc.Node = null;

    @property()
    isEmail_drop:boolean = false;

    sfNodeList:cc.Node[] = [];
    panel_prop_good_pre:cc.Prefab = null;
    panel_shop_good_icons:cc.SpriteAtlas = null;
    bindObj = [];


    onLoad(){
        for(let i = 0; i < this.totalIcon.childrenCount; i ++){
            this.sfNodeList.push(this.totalIcon.children[i]);
        }
        onfire.on("sendPropToFuJian", this.updateContent.bind(this))
        onfire.on("rebackPropToFuJian", this.updateContent.bind(this))
        this.bindEvent();   
    }

    start(){

        //获取道具配置    暂时每次拉取道具信息
        if(GD.propCfg){
            this.getGoodPre();
            return;
        }
        NetHelp.getPropCfg((ret) => {
            if (ret.code != 0) {
                console.log(ret);
                return;
            }
            GD.propCfg = ret.data as Pack_Good;
            this.getGoodPre();
        });
    }

    bindEvent() {
        this.bindObj = [];
        this.bindObj.push(onfire.on("S_USER_PROP_MANGHE", this.onMangHe.bind(this)));
    }

    getGoodPre(){
        if(this.isEmail_drop){
            cc.loader.loadRes("hall/panel/panel_prop_email", cc.Prefab, (err, prefab)=>{
                if (err) {
                    console.error(err);
                    return
                }
                this.panel_prop_good_pre = prefab;
                this.getGoodSf();
            });
        }else{
            cc.loader.loadRes("hall/panel/panel_prop_good", cc.Prefab, (err, prefab)=>{
                if (err) {
                    console.error(err);
                    return
                }
                this.panel_prop_good_pre = prefab;
                this.getGoodSf();
            });
        }
        
    }

    getGoodSf(){
        cc.loader.loadRes("hall/textrue/jinbizuanshi_icon", cc.SpriteAtlas, (err, atlas:cc.SpriteAtlas)=>{
            if (err) {
                console.error(err);
                return
            }
            this.panel_shop_good_icons = atlas;
            this.getBackPack();
        });
    }

    getBackPack(){
        NetHelp.getPack((ret)=>{
            if(ret.code != 0){
                console.log(ret);
                return;
            }
            let bp = ret.data as DATA_BACK_PACK;
            GD.curPropGoodsList = bp;
            onfire.fire("getBackPack")
            for(let key in bp){
                let comp = cc.instantiate(this.panel_prop_good_pre).getComponent(panel_prop_good);
                comp.writePanel(key,bp[key].cnt,this.sfNodeList);
                comp.node.name = key+"";
                this.content.addChild(comp.node);
            }
        });
    }
 
    updateContent(data){
        if (GD.curPropGoodsList == null ) return;
        if (this.content == null ) return;
        for(let key in GD.curPropGoodsList){
            if(data.itemID == parseInt(key)){
                if(GD.curPropGoodsList[key].cnt<=data.cnt){
                    this.content.getChildByName(key+"").active = false;
                }else{
                    this.content.getChildByName(key+"").active = true;
                    this.content.getChildByName(key+"").getChildByName("lbl_cnt").getComponent(cc.Label).string = "X"+(GD.curPropGoodsList[key].cnt-data.cnt);
                }
                
            }else{
                this.content.getChildByName(key+"").active = true;
                this.content.getChildByName(key+"").getChildByName("lbl_cnt").getComponent(cc.Label).string = "X"+GD.curPropGoodsList[key].cnt;
            }
        }
    }


    onMangHe(data) {
        if (!data) return;
        if (data.length == 0) {
            UIHelper.showTips("未中奖");
            return;
        }

        GD.GameTool.createPanel("hall/panel/panel_mangheRe", (node: cc.Node) => {
            let comp = node.getComponent("panel_mangheRe");
            comp.writePanel(data, this.sfNodeList);
        });
    }

    onDestroy() {
        GameTools.destroyOnFire(this.bindObj);
    }

}

