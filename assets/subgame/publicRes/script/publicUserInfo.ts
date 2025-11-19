

const { ccclass, property } = cc._decorator;

@ccclass
export default class PublcUserInfo extends cc.Component {

    //by_009:遮罩
    @property(cc.Node)
    sprite_splash: cc.Node = null;

    //by_009:菜单
    @property(cc.Node)
    menu: cc.Node = null;

    //by_009:头像
    @property(cc.Node)
    avatar: cc.Node = null;

    //by_009:昵称
    @property(cc.Label)
    nickname: cc.Label = null;

    //by_009:游戏id
    @property(cc.Label)
    gameID: cc.Label = null;

    //by_009:ip
    @property(cc.Label)
    ip: cc.Label = null;

    //by_009:ip
    @property(cc.Label)
    vip: cc.Label = null;

    //by_009:道具内容
    @property(cc.Node)
    propsContent: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:
    //by_009:

    private targetGameID: number = 0;

    // onLoad () {},

    start() {
        this.sprite_splash.on(cc.Node.EventType.TOUCH_END, () => {
            this.node.destroy();
        }, this);


        //by_009:道具注册监听
        for (let i = 0; i < this.propsContent.childrenCount; i++) {
            this.propsContent.children[i].on(cc.Node.EventType.TOUCH_END, this.clickProps, this);
        }

        const copy = this.menu.getChildByName("COPY");
        copy.on(cc.Node.EventType.TOUCH_END, () => {
            GameTools.copyToClipBoard(this.targetGameID.toString());
            UIHelper.showTips("Copiado/COPY");
        }, this);
  
    }

    //by_009:点击头像框查信息
    clickAvatar(chairID: number, gameid: number) {
        // console.log("点击头像框查信息");
        // let gameID = cc.find("gameID",event.currentTarget.parent).getComponent(cc.Label).string;
        this.showPanel(chairID);

        this.targetGameID = gameid;
    }

    //by_009:显示面板
    showPanel(chairID) {
        this.menu.active = true;

        let data = clientKernel.getTableUserItem(chairID);
        if (data) {
            // console.log(data);
            GameTools.loadWxHead(this.avatar, data.getHead());
            this.nickname.string = "昵称:" + data.nickname;
            this.gameID.string = "ID:" + data.gameID;
            this.ip.string = "ip:" + data.ip;
            this.vip.string = "vip:" + data.vipLevel;
        }
    }

    //by_009:点击道具
    clickProps(event) {
        let data = {
            item_id: event.currentTarget.getSiblingIndex() + 1,
            gameID: this.targetGameID,
        }
        clientKernel.use_item(data);

        this.node.destroy();
    }

        // //by_009:按钮点击事件
        // onBtnClick(event) {
        //     switch (event.currentTarget.name) {
        //         case "btn_copy":  // 复制ID
        //             GD.GameTool.copyTextToClipboard(KernelData.gameID.toString());
        //             break;
        
        //             }        }
}
