import { zp_GameConfig } from "./zp_GameConfig";
import zp_PlayerInfo from "./zp_PlayerInfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class zp_PlayerList extends cc.Component {

    @property({
        type: cc.Node,
        displayName: "layout (content)"
    })
    layout: cc.Node = null;

    private copy_item: cc.Node;

    start() {
        if (this.layout && this.layout.childrenCount > 0) {
            this.copy_item = this.layout.children[0];
        }
        GameTools.addBtnOnClick(this.node, this.onBtnClick, this);
        this.initAllPlayerInfo();
    }

    onBtnClick(e: cc.Event.EventCustom) {
        var t = e.getCurrentTarget().name;
        switch (audioMgr.playEffect(zp_GameConfig.AudioData.fq_button, !1), t) {
            case "btn_close":
                this.node.active = !1;
                break;
        }
    }

    initAllPlayerInfo() {
        if (this.copy_item) {
            const meChairID = clientKernel.getMeChairID();
            const tableUserItemCount = clientKernel.getTableUserItemCount();
            for (let o = 1; o < this.layout.childrenCount; o++) {
                this.layout.children[o].active = false;
            }
            this.initNode(this.copy_item, clientKernel.getMeUserItem());
            for (let o = 1; o < tableUserItemCount; o++) {
                if (o != meChairID) {
                    const n = clientKernel.getTableUserItem(o);
                    if (n) {
                        let i = this.layout.children[o];
                        if (!i) {
                            i = cc.instantiate(this.copy_item);
                            this.layout.addChild(i);
                        }
                        this.initNode(i, n);
                    }
                }
            }
        } else {
            console.error("Player list error: Initialization node is not set");
        }
    }

    initNode(e: cc.Node, t) {
        e.active = true;
        e.getComponent(zp_PlayerInfo).setInfo(t);
    }
}
