
cc.Class({
    extends: cc.Component,

    properties: {
        //by_009:内容
        content: cc.Label,
        //by_009:确认
        btn_confirm: cc.Node,
        //by_009:取消
        btn_cancel: cc.Node,
        _yesCB: null,
        _cancelCB: null,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.btn_confirm.on(cc.Node.EventType.TOUCH_END, () => {
            this._yesCB && this._yesCB()
            this.node.active = false;
        })

        this.btn_cancel.on(cc.Node.EventType.TOUCH_END, () => {
            this._cancelCB && this._cancelCB()
            this.node.active = false;
        });


    },


    messageBox(text = "", cb1, cb2) {
        this.content.string = text;
        this.btn_confirm.active = true;
        this._yesCB = cb1
        this._cancelCB = cb2
        if (cb2) {
            this.btn_cancel.active = true;
        } else {
            this.btn_cancel.active = false;
        }
    },


    // update (dt) {},
});
