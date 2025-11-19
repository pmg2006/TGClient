
import RoomParamsBase from "./RoomParamsBase";




/**
 * 创建房间
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class CreateRoomBase extends cc.Component {

    @property({ type: cc.Node, tooltip: "参数挂的节点", displayName: "node_right"})
    node_right: cc.Node = null;
    moduleEnName = "zhmj";

    showPrefab(prefabName:string) {
        UIHelper.showWaitLayer(true);
        let prefabPath = "hall/createRoom/" + prefabName;
        this.node_right.removeAllChildren();
        Helper.createNode(prefabPath, (node) => {
            this.node_right.addChild(node);
            this.moduleEnName = prefabName;
            UIHelper.showWaitLayer(false)
        })
    }

    onCloseClick() {
        this.node.destroy()
    }

    createRoom() {
        let roomParamsScript = this.node_right.getComponentInChildren(RoomParamsBase)
        const config = roomParamsScript.getCreateParam(); //房间配置
        if (!config) {
            UIHelper.showTips("房间参数错误");
            return
        }
        NetHelp.createNormalRoom(this.moduleEnName, config, (data) => {
            this.onCreateRoom(data)
        })
    }

    createBox(){
        let roomParamsScript = this.node_right.getComponentInChildren(RoomParamsBase);

        const config = roomParamsScript.getCreateParam(); //房间配置
        if (!config) {
            UIHelper.showTips("房间参数错误");
            return
        }
        NetHelp.createBaox(KernelData.clubID, this.moduleEnName, config, (data)=>{
            if (data.code == 0){
                UIHelper.showTips("包厢创建成功!");
                onfire.fire('UPDATE_BOXLIST');
            } else {
                UIHelper.showTips(data.info);
            }
            this.node.destroy();
        });
    }

    private onCreateRoom(data) {
        const { code, info } = data
        if (code != 0) {
            UIHelper.showTips(info);
        } else {
            let roomCode = info.roomCode;
            NetHelp.joinRoom(roomCode, (joinRoomRetData) => {
                let { code, info } = joinRoomRetData
                if (code == 0) {
                    this.onCloseClick() //成功则关闭窗口 准备切换
                }
                else {
                    UIHelper.showTips(info);
                }
            });

        }
    }

 

}
