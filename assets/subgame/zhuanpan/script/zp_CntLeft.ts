import { zp_GameConfig } from "./zp_GameConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class zp_CntLeft extends cc.Component {
        // var r = require("../kernel/GameTools"),
        //     a = require("../Spript/zp_GameConfig"),
          
        @property(cc.Label)
        memLab: cc.Label | null = null;
    
        bindObj: any[] = [];
        memObj: any[] = [];
    
        start() {
            this.bindObj = [];
            this.bindObj.push(onfire.on("UserStatusChanged", this.changMember.bind(this)));
            this.bindObj.push(onfire.on("onEventUserEnter", this.enterMember.bind(this)));
            this.bindObj.push(onfire.on("onEventUserLeave", this.leaveMember.bind(this)));
            GameTools.addBtnOnClick(this.node.children[0], this.onBtnClick, this);
        }
    
        onDestroy() {
            GameTools.destroyOnFire(this.bindObj);
        }
    
        changMember(e: any) {
            this.memObj[e.chairID] = e.chairID;
        }
    
        enterMember(e: any) {
            this.memObj[e.getChairID()] = e.getChairID();
        }
    
        leaveMember(e: any) {
            this.memObj.splice(e.getChairID(), 1);
        }
    
        onBtnClick(e: any) {
            const targetName = e.getCurrentTarget().name;
            switch (targetName) {
                case "btn_return":
                    cc.find("Canvas/zp_UIMenu").active = true;
                    break;
            }
            audioMgr.playEffect(zp_GameConfig.AudioData.fq_button, false);
        }
    
        move() {
            this.node.stopAllActions();
            this.node.position = cc.v2(-200, 0);
            this.node.runAction(cc.moveTo(0.5, cc.v2(0, 0)));
        }
    }