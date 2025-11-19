/**
 * 提示
 */


cc.Class({
    extends: cc.Component,


    onLoad: function() {

        this.item = this.node.getChildByName("item")
        this.container = this.node.getChildByName("container")
        //this.lbl_text = this.item.getChildByName("lbl_text").getComponent(cc.Label);
        this.node.active = false
        console.log("onLoad", this.node.name)

    },

    showText: function(text) {
        if(!text) return
        this.node.active = true
        var newItem = cc.instantiate(this.item);
        newItem.active = true
        this.container.addChild(newItem)
        newItem.setPosition(0, 0)
        var lbl_text = newItem.getChildByName("lbl_text").getComponent(cc.Label);
        lbl_text.string = text
        newItem.runAction(cc.sequence(cc.fadeIn(0.1), cc.moveBy(0.5, 0, 100), cc.delayTime(2), cc.fadeOut(0.2), cc.removeSelf()))
    },
});