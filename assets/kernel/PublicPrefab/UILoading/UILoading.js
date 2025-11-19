/**
 * 转菊花界面
 */


cc.Class({
    extends: cc.Component,
    properties: {
        lbl_text: {
            default: null,
            type: cc.Label,
        },
    },

    onLoad: function () {
        this.node.active = false
        console.log("onLoad", this.node.name, this.node.getPosition(), this.node.getContentSize(), cc.winSize)
    },

    // stayTime = 显示时间
    showPanel: function (show, text, stayTime) {

        text = text || ""
        this.node.active = show
        this.lbl_text.string = text
        // this.loadNode.stopAllActions();
        // this.loadNode.angle = 0;
        // this.loadNode.runAction(cc.sequence(cc.rotateBy(1 || 30, -360), cc.callFunc(() => { this.loadNode.stopAllActions() })));
    },



});