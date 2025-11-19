const { ccclass, property } = cc._decorator;

@ccclass
export default class lhd_UIMenu extends cc.Component {
    // var r = require("../kernel/GameTools"),

    start = function () {
        //GameTools.addBtnOnClick(this.node, this.onBtnClick, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);
    }

    onBtnClick = function (e) {
        var t = e.getCurrentTarget().name;
        console.log("UIMenu 点击按钮", t);
    }
}