// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { WEB_NOTICE } from "../../kernel/Core/extend/ConstDefine";
import  panel_loginSign  from "./panel_loginSign";
import { AudioControl } from "./AudioControl";
const {ccclass, property} = cc._decorator;

@ccclass
export default class panel_notice extends cc.Component {

    @property(cc.Label)
    lbl_notice:cc.Label = null;

    @property(cc.Node)
    bg:cc.Node = null;


    start () {
        let bg = this.node.getComponentsInChildren(cc.Button);
        NetHelp.getWebPublic((ret)=>{
            if(ret.code != 0){
                return;
            }
            let data = ret.data as WEB_NOTICE[];
            if(data.length == 0)return;
            this.lbl_notice.string = data[0].text;
        });
        
    }
    //by_009:按钮点击事件
    onBtnClick(event) {
        AudioControl.playClick();
        console.log(event.currentTarget.name)
        switch (event.currentTarget.name) {
            case "bg"://登录
                GD.GameTool.createPanel("hall/panel/panel_loginSign",(node)=>{
                    node.getComponent(panel_loginSign).onInitLoginSignUI(false);
                });
                break;      
        }
    }
}
