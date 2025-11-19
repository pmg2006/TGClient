const define = require('KernelDefine');
const gameCMD = define.gameCMD;

cc.Class({
    extends: cc.Component,

    properties: {
        //by_009:菜单
        menu: cc.Node,
        //by_009:接受按钮
        btn_agree: cc.Node,
        //by_009:取消按钮
        btn_cancel: cc.Node,
        //by_009:倒计时-值
        txt_leftTime: cc.Label,
        //by_009:玩家组
        playerGroup: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:
    //by_009:解散协议 https://note.youdao.com/ynoteshare1/index.html?id=a7b2496731d9c369f687020270276069&type=note

    onLoad() {
    },

    onEnable() {
        //剩余时间
        this.leftTime = 60;
        this.txt_leftTime.string = this.leftTime;

        this.nowTime = 0;

    },

    start() {
        this.btn_agree.on("click", this.btnOnClick, this);
        this.btn_cancel.on("click", this.btnOnClick, this);

        this.bindEvent();
        this.checkDisMiss()

    },

    //检查解散
    checkDisMiss() {
        let dismissData = clientKernel.getDismissData()
        if (dismissData) {
            console.log("❤发现解散数据 ", dismissData);
            this.onDismissStart(dismissData)
        }
    },

    bindEvent() {
        this.bindObj = [];
        this.bindObj.push(onfire.on("onDismissStart", this.onDismissStart.bind(this)));
        this.bindObj.push(onfire.on("onUserAgreeDismiss", this.onUserAgreeDismiss.bind(this)));
        this.bindObj.push(onfire.on("onDismissEnd", this.onDismissEnd.bind(this)));
    },
    onDestroy() {
        for (let i = 0; i < this.bindObj.length; i++) {
            onfire.un(this.bindObj[i]);
        }
    },


    //by_009:解散开始
    onDismissStart(data) {
        console.log("❤解散开始", data);

        if (data.errMsg) {
            return;
        }

        //如果自己是旁观玩家，不显示解散界面
        if (GameTools.getIsWatcher()) {
            this.menu.active = false;
            return;
        }

        this.menu.active = true;
        this.refreshPlayer(data);
    },


    //by_009:玩家同意、拒绝解散
    onUserAgreeDismiss(data) {
        console.log("❤玩家同意、拒绝解散", data);
        // let { lefTime, agreeData, starter, agree, chairID } = data;

        this.refreshPlayer(data);
    },


    //by_009:结束解散
    onDismissEnd(data) {
        console.log("结束解散", data);
        let { success } = data;

        if (success == 1) {
            UIHelper.showTips("解散成功");
            this.menu.active = false;
        } else if (success == 0) {
            UIHelper.showTips("解散失败");
            this.scheduleOnce(function () {
                this.menu.active = false;
            }.bind(this), 2);
        }
    },


    //by_009:刷新玩家数据
    refreshPlayer(data) {
        let { lefTime, agreeData, starter } = data;
        this.leftTime = lefTime;

        let myChairID = clientKernel.getMeChairID();
        for (let i = 0; i < agreeData.length; i++) {
            if (agreeData[i] != null) {
                let player = this.playerGroup.children[i];
                player.active = true;
                let userItem = clientKernel.getTableUserItem(i);
                if (userItem) {
                    player.getChildByName("lbl_nickname").getComponent(cc.Label).string = userItem.nickname;
                    GameTools.loadWxHead(cc.find("head_mask/head_sprite", player), userItem.getHead());
                }
                let value = agreeData[i] == -1 ? "未选择" : agreeData[i] == 0 ? "拒绝" : agreeData[i] == 1 ? "同意" : "";
                player.getChildByName("lbl_text").getComponent(cc.Label).string = value;

                if (myChairID == i) {//自己
                    if (agreeData[i] == -1) {
                        this.btn_agree.getComponent(cc.Button).interactable = true;
                        this.btn_cancel.getComponent(cc.Button).interactable = true;
                    } else {
                        this.btn_agree.getComponent(cc.Button).interactable = false;
                        this.btn_cancel.getComponent(cc.Button).interactable = false;
                    }
                }
            }
        }


    },


    //by_009:玩家数据
    showPlayerAgree(chairID, agree) {
        let player = this.playerGroup.children[chairID];
        let userItem = clientKernel.getTableUserItem(chairID);
        if (player && userItem) {
            player.getChildByName("lbl_nickname").getComponent(cc.Label).string = userItem.nickname;
            let value = agree == 1 ? "同意" : agree == 0 ? "拒绝" : "";
            player.getChildByName("lbl_text").getComponent(cc.Label).string = value;
        }
    },


    //by_009:按钮点击同意、拒绝
    btnOnClick(event) {
        switch (event.node.name) {
            case "btn_cancel":
                clientKernel.sendSocketData(gameCMD.MDM_GF_FRAME, gameCMD.SUB_GF_DISMISS_AGREE, { agree: 0 });
                break;
            case "btn_agree":
                clientKernel.sendSocketData(gameCMD.MDM_GF_FRAME, gameCMD.SUB_GF_DISMISS_AGREE, { agree: 1 });
                break;
        }
    },


    update(dt) {
        if (this.menu.active == true) {
            this.nowTime += dt;
            if (this.nowTime >= 1) {
                this.leftTime -= 1;
                this.nowTime = 0;
                this.txt_leftTime.string = this.leftTime;
            }
        }

    },

});
