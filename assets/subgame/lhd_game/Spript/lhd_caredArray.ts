const { ccclass, property } = cc._decorator;

@ccclass
export default class lhd_caredArray extends cc.Component {

    @property([cc.SpriteFrame])
    cared: cc.SpriteFrame[] = []

    start = function () { }

    setH = function (e) {
        this.node.getComponent(cc.Sprite).spriteFrame = this.cared[e]
    }

}