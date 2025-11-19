const {ccclass, property} = cc._decorator;

@ccclass
export default class Panel_playerInfo extends cc.Component {

    //by_009:关闭按钮
    @property(cc.Node)
    btn_close: cc.Node = null;

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
    //by_009:地址
    @property(cc.Label)
    site: cc.Label = null;
    //by_009:道具内容
    @property(cc.Node)
    propsContent: cc.Node = null;

    //by_009:目标id
    targetID: null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        //by_009:道具注册监听
        for (let i=0;i<this.propsContent.childrenCount;i++){
            this.propsContent.children[i].on(cc.Node.EventType.TOUCH_END, this.clickProps, this);
        }

        this.btn_close.on(cc.Node.EventType.TOUCH_END, this.clickClose, this);

    }


    //by_009:读取面板
    loadPanel(gameID){
        let data:any = clientKernel.getUserByGameID(gameID);
        console.log('用户信息',data);
        GameTools.loadWxHead(this.avatar, data.head);
        this.nickname.string = data.nickname;
        this.gameID.string = "ID:"+data.gameID;
        this.targetID = data.gameID;
        // this.ip.string = "";
        if(data.otherInfo.Address){
            this.site.string = "地址:"+data.otherInfo.Address;
        }
    }


    //by_009:点击道具
    clickProps(event){
        let data={
            item_id:event.currentTarget.getSiblingIndex(),
            gameID:this.targetID,
        }
        // console.log("点击道具",data);
        clientKernel.use_item(data);

        this.node.destroy();
    }


    //by_009:点击关闭
    clickClose(){
        this.node.destroy();
    }


    // update (dt) {}
}
