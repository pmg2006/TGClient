const { ccclass, property } = cc._decorator;

@ccclass
export default class lhd_AddJetton extends cc.Component {
    onLoad = function () {
        this.node.getChildByName("money")
    }

    start = function () { }
}