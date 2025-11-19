// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { CN_ITEM_TYPE } from "../shop/shop_defind";
import { EM_TASK_STATE, task_mg } from "./task_define";

const {ccclass, property} = cc._decorator;

@ccclass
export default class taskItem extends cc.Component {

    @property(cc.Node)
    icon_task_type:cc.Node = null;

    //任务介绍
    @property(cc.Label)
    lbl_task_inc:cc.Label = null;

    //奖励
    @property(cc.Label)
    lbl_task_reward:cc.Label = null;

    //任务进度
    @property(cc.Label)
    lbl_task_progress:cc.Label = null;

    //领取按钮
    @property(cc.Node)
    btn_getReward:cc.Node = null;

    //灰色按钮
    @property(cc.Node)
    gray_btn:cc.Node = null;

    //任务数据
    taskdata:task_mg = null;

    writePanel(data:task_mg){
        // this.icon_task_type.children.forEach((node:cc.Node)=>node.active = parseInt(data.taskType) == node.zIndex);
        this.taskdata = data;
        // for(let i = 0; i < this.icon_task_type.childrenCount; i ++){
        //     let cNode = this.icon_task_type.children[i]
        //     cNode.active = parseInt(data.taskType) == i;
        // }
        this.lbl_task_inc.string = data.name;
        this.lbl_task_reward.string = data.gifCnt+"";
        if(data.pro <= 0)data.pro = 0;
        this.lbl_task_progress.string = data.pro+"/"+data.count;
        
        if(data.state == EM_TASK_STATE.Unreceive){
            //已领取
            this.btn_getReward.active =false;
            this.gray_btn.active =true;
            let btnLabel = this.gray_btn.children[0].getComponent(cc.Label);
            btnLabel.string = "Completed";//已完成
        }else if(data.state == EM_TASK_STATE.Reject){
            this.btn_getReward.active =false;
            this.gray_btn.active =true;
            let btnLabel = this.gray_btn.children[0].getComponent(cc.Label);
            btnLabel.string = "Not done";//未完成
        }else{
            let btnLabel = this.btn_getReward.children[0].getComponent(cc.Label);
            btnLabel.string = "lick";//领取
            this.btn_getReward.on('click',this.onGetRewardClick,this);
        }
    }

    onGetRewardClick(){
        NetHelp.getTaskReward(this.taskdata.taskID,(ret)=>{
            if(ret.code != 0){
                UIHelper.showTips(ret.info);
                return;
            }
            UIHelper.showTips("领取成功");
            onfire.fire("refreshTaskList");
        })
    }

}
