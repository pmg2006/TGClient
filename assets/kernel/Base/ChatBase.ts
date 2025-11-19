import UIBase from "./UIBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class ChatBase extends UIBase {


    @property({ type: cc.Node, displayName: "emoji_root (表情根节点)", tooltip: "表情根节点" })
    emoji_root: cc.Node = null;
    @property({ type: cc.Node, displayName: "text_root (文字根节点)", tooltip: "文字根节点" })
    text_root: cc.Node = null;

    lastSendTime: number = 0

    onLoad() {
        this.onfire_on("onNewChatMsg", this.onNewChatMsg.bind(this))
        this.emoji_root && GameTools.addBtnOnClick(this.emoji_root, this.onEmojiClick, this)
        this.text_root && GameTools.addBtnOnClick(this.text_root, this.onTextClick, this)
    }

    /**
     *点击表情
     *
     * @private
     * @param {*} event
     */
    private onEmojiClick(event) {
        let clickNode: cc.Node = event.currentTarget;
        let index = clickNode.getSiblingIndex() //在父节点的index
        let msgText = "emoji_" + index
        this.sendChatMsg(msgText)
    }

    /**
     *点击文字消息
     *
     * @private
     * @param {*} event
     */
    private onTextClick(event) {
        let clickNode: cc.Node = event.currentTarget;
        let index = clickNode.getSiblingIndex() //在父节点的index
        let msgText = "text_" + index
        this.sendChatMsg(msgText)
    }


    private sendChatMsg(msgText: string) {
        let now = Date.now()
        if (now - this.lastSendTime > 5 * 1000) {
            this.lastSendTime = Date.now()
            //发送消息
            clientKernel.chat(msgText);
        }
        else{
            UIHelper.showTips("你发送的太频繁，请稍事歇息")
        }

    }

    /**
     * 接收返回的消息，显示相应数据   子游戏统一自己实现
     * @param msgData 返回消息 {text,nickname}
     */
    abstract onNewChatMsg(msgData)
}
