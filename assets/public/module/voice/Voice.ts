const {ccclass, property} = cc._decorator;

@ccclass
export default class Voice extends cc.Component {

    @property(cc.Toggle)
    btn_speaker: cc.Toggle = null;

    @property(cc.Toggle)
    btn_mic: cc.Toggle = null;

    bindObj= null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.btn_speaker.isChecked = !true;//默认开，资源反向
        this.btn_mic.isChecked = !false;//默认关，资源反向
    }

    start () {
        this.btn_speaker.node.on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);
        this.btn_mic.node.on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);

        this.bindEvent();

        this.scheduleOnce(function () {
            cc.xkNative.joinGVoiceRoom(GD.roomConfig.roomCode);
        }.bind(this),0.5);
    }
    bindEvent() {
        this.bindObj = [];
        this.bindObj.push(onfire.on("UserStandUp", this.onUserStandUp.bind(this)));
    }
    onDestroy() {
        for (let i = 0; i < this.bindObj.length; i++) {
            onfire.un(this.bindObj[i]);
        }

        cc.xkNative.exitGVoiceRoom(GD.roomConfig.roomCode);
    }

    onUserStandUp(data) {
        let round = data.round ||0
        if (round == 0) { //游戏未开始 直接去大厅
            cc.xkNative.exitGVoiceRoom(GD.roomConfig.roomCode);
        }
    }


    //by_009:滑动事件
    onBtnClick(event){

        switch (event.currentTarget.name) {
            case "btn_speaker"://喇叭、扬声器
                if (this.btn_speaker.isChecked == true){
                    cc.xkNative.openSpeaker();
                    cc.xkNative.isOpenSpeaker = true;
                }else {
                    cc.xkNative.closeSpeaker();
                    cc.xkNative.isOpenSpeaker = false;
                }
                // if(event.currentTarget.color.equals(new cc.Color(160,160,160,255))){
                //     cc.xkNative.openSpeaker();
                //     cc.xkNative.isOpenSpeaker = true;
                //     event.currentTarget.color = new cc.Color(255,255,255,255);
                // }else{
                //     cc.xkNative.closeSpeaker();
                //     cc.xkNative.isOpenSpeaker = false;
                //     event.currentTarget.color = new cc.Color(160,160,160,255);
                // }
                break;
            case "btn_mic"://麦克风
                if (this.btn_speaker.isChecked == true){
                    cc.xkNative.openMic();
                    cc.xkNative.isOpenMic = true;
                }else {
                    cc.xkNative.closeMic();
                    cc.xkNative.isOpenMic = false;
                }

                // if(event.currentTarget.children[0].active == true){
                //     cc.xkNative.openMic();
                //     cc.xkNative.isOpenMic = true;
                //     event.currentTarget.children[0].active = false;
                //
                //     cc.xkNative.openSpeaker();
                //     cc.xkNative.isOpenSpeaker = true;
                // }else{
                //     cc.xkNative.closeMic();
                //     cc.xkNative.isOpenMic = false;
                //     event.currentTarget.children[0].active = true;
                // }
                break;
            default:
                console.error("待处理名：",event.currentTarget.name);
                break;
        }
    }



    // update (dt) {}
}
