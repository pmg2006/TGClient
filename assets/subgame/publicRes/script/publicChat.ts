
const {ccclass, property} = cc._decorator;

@ccclass
export default class DdzChat extends cc.Component {

    @property({ type: cc.Node, tooltip: "语音",})
    voicePanel: cc.Node = null;
    @property({ type: cc.Node, tooltip: "表情",})
    emitPanel: cc.Node = null;
    @property({ type: cc.Node, tooltip: "语音内容",})
    conVoice: cc.Node = null;
    @property({ type: cc.Node, tooltip: "表情类容",})
    conEmit: cc.Node = null;
    @property({ type: cc.Node, tooltip: "发送",})
    btnSendMsg: cc.Node = null;
    @property({ type: cc.Node, tooltip: "文本消息",})
    inputText: cc.Node = null;
    @property({ type: cc.Node, tooltip: "聊天界面",})
    togGrpup: cc.Node = null;
    @property({ type: cc.Node, tooltip: "单选框",})
    spbg: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        console.log('初始化消息界面');
        // this.initPanel();

        this.btnSendMsg.on(cc.Node.EventType.TOUCH_END, this.msgText, this);
        this.spbg.on(cc.Node.EventType.TOUCH_END, this.clickCloseMsg, this);

        // for (let y = 0; y < this.togGrpup.childrenCount; y++) {
        //     this.togGrpup.children[y].on(cc.Node.EventType.TOUCH_END, this.onTogGroup, this);
        // }

        for (let y = 0; y < this.conVoice.childrenCount; y ++){
            this.conVoice.children[y].on(cc.Node.EventType.TOUCH_END, this.msgVoice, this);
        }

        for (let y = 0; y < this.conEmit.childrenCount; y ++){
            this.conEmit.children[y].on(cc.Node.EventType.TOUCH_END, this.msgEmit, this);
        }

        // for (let i = 0; i < this.togGrpup.childrenCount; i++) {
        //     const toggle = this.togGrpup.children[i];
        //     if (toggle.children[1].active) {
        //         switch (toggle.name){
        //             case 'toggle1':
        //                 this.voicePanel.active = true;
        //                 break;
        //             case 'toggle2':
        //                 this.emitPanel.active = true;
        //                 break;
        //             case 'toggle3':

        //                 break;
        //         }
        //         break;
        //     }
        // }
    }

    // 单选框
    onTogGroup(event){

        this.initPanel();

        switch (event.currentTarget.name){
            case 'toggle1':
                console.log('快捷语音');
                this.voicePanel.active = true;
                break;
            case 'toggle2':
                console.log('表情消息');
                this.emitPanel.active = true;
                break;
            case 'toggle3':
                console.log('聊天记录');
                break;
        }

    }

    // 点击发送文本消息
    msgText(){
        let type = 1;
        let string = this.inputText.getComponent(cc.EditBox).string;
        if (string.length <= 0) return;
        this.sendMsg(type, string)
    }

    // 表情消息
    msgEmit(event){
        let type = 2;
        let emitName = event.currentTarget.name;
        this.sendMsg(type, emitName)
    }

    // 快捷语音
    msgVoice(event){
        let type = 3;
        let voiceID = event.currentTarget.name;
        this.sendMsg(type, voiceID);
    }

    // 发送消息
    sendMsg(type, content){
        console.log('发送消息类型: ', type, '消息内容: ', content);
        this.clickCloseMsg();
        this.inputText.getComponent(cc.EditBox).string = '';

        let text = type + '-' + content;
        // TODO: 请求发送
        clientKernel.chat(text);
    }

    initPanel(){
        this.voicePanel.active = false;
        this.emitPanel.active = false
    }

    clickCloseMsg() {
        this.node.destroy();
    }

    // update (dt) {}
}
