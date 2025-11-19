

import { WEB_NOTICE } from "../../kernel/Core/extend/ConstDefine";
import { AudioControl } from "./AudioControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class panel_editboxPwdShow extends cc.Component {

    @property(cc.EditBox)
    pwd: cc.EditBox = null;
    @property(cc.Node)
    btn_eye:cc.Node = null;
    @property(cc.Node)
    btn_eye_close:cc.Node = null;

    start () {
        let btnS = this.node.getComponentsInChildren(cc.Button);
        for (let i = 0; i < btnS.length; i++) {
            btnS[i].node.on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);
        }
    }


    onBtnClick(event){
        AudioControl.playClick();
        console.log(event.currentTarget.name)
        switch (event.currentTarget.name) {
            case "btn_eye":
                this.pwd.inputFlag = cc.EditBox.InputFlag.PASSWORD;
                this.btn_eye_close.active = true;
                this.btn_eye.active = false;
                break;
            case "btn_eye_close":
                this.btn_eye_close.active = false;
                this.btn_eye.active = true;
                this.pwd.inputFlag = cc.EditBox.InputFlag.SENSITIVE;
                break;
        }
    }
}
