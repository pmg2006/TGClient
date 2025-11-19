

import { isInteger } from "lodash";
import { WEB_NOTICE } from "../../kernel/Core/extend/ConstDefine";

const {ccclass, property} = cc._decorator;

@ccclass
// 导出默认的panel_scrollviewAutoSuit类，该类继承自cc.Component
export default class panel_scrollviewAutoSuit extends cc.Component {
   
    // 在加载时执行的函数
    onLoad(){
        // 获取窗口的像素大小
        var b = cc.director.getWinSizeInPixels()
        // 获取窗口的高度
        var by = b.height
        // 计算高度差
        var heightDelt = by-210;
        // 设置节点的内容大小
        this.node.setContentSize(cc.size(this.node.getContentSize().width,heightDelt));
        // 如果节点有名为"view"的子节点
        if(this.node.getChildByName("view")){
            // 如果节点的名字是"scrollview"
            if(this.node.name=="scrollview"){
                // 设置子节点"view"的内容大小
                this.node.getChildByName("view").setContentSize(cc.size(this.node.getContentSize().width,heightDelt));
            }else{
                // 否则，设置节点和子节点"view"的内容大小
                this.node.setContentSize(cc.size(this.node.getContentSize().width,heightDelt+160))
                this.node.getChildByName("view").setContentSize(cc.size(this.node.getContentSize().width,heightDelt+160));
            }
        }else{
            // 如果节点没有名为"view"的子节点，设置节点的内容大小
            this.node.setContentSize(cc.size(this.node.getContentSize().width,heightDelt+90));
            // 如果节点的名字是"toggleContainer"
            if(this.node.name=="toggleContainer"){
                // 设置节点的位置
                this.node.setPosition(this.node.x,(by/2-(40+35+110)))
            }
            else if(this.node.name=="toggleContainerPay"){
                // 设置节点的位置
                this.node.setPosition(this.node.x,(by/2-(40+35+50)))
            }
            // 如果节点的名字是"panel"
            if(this.node.name == "panel"){
                // 设置节点的位置
                this.node.setPosition(this.node.x,(by/2-(14)))
            }
        }
    }

}
