import {AudioControl} from "../../../main/script/AudioControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Panel_replay extends cc.Component {

    //by_009:暂停
    @property(cc.Node)
    btn_pause: cc.Node = null;
    //by_009:恢复
    @property(cc.Node)
    btn_resume: cc.Node = null;

    //by_009:速度文本
    @property(cc.Label)
    txt_speed: cc.Label = null;
    //by_009:退出
    @property(cc.Node)
    btn_quit: cc.Node = null;
    //by_009:进度条
    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    //by_009:回放码
    replayCode = null;
    //by_009:回放数据
    replayData = null;

    progress = 0;

    speedArray = [3,1,0.5,0.2];
    speedSub = 1;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.progressBar.progress = 0;
    }

    start () {
        let btnS = this.node.getComponentsInChildren(cc.Button);
        for (let i=0; i<btnS.length; i++){
            btnS[i].node.on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);
        }
    }
    onDestroy() {
        this.node.stopAllActions();
    }

    //by_009:设置数据
    setData(data){
        this.replayData = data;
        this.replayCode = data.replayCode;

        this.playReplay();
    }

    //by_009:播放回放
    playReplay(){
        this.btn_pause.active = true;
        this.btn_resume.active = false;

        if (this.progress >= this.replayData.Record.length){
            return GD.GameTool.showTextTips("已播放完");
        }

        this.progressBar.node.stopAllActions();

        let record = this.replayData.Record;
        let delay = cc.delayTime(this.speedArray[this.speedSub]);
        let callFunc = cc.callFunc(()=>{
            if (Array.isArray(record[this.progress])){
                for (let i = 0; i < record[this.progress].length; i++) {
                    onfire.fire("onEventGameMessage", record[this.progress][i].subCMD, record[this.progress][i].data);
                }
            }else {
                onfire.fire("onEventGameMessage", record[this.progress].subCMD, record[this.progress].data);
            }

            this.progress++;
            this.setSpeed();
        }, this);
        this.progressBar.node.runAction(cc.sequence(delay, callFunc).repeat(record.length-this.progress));

        this.setSpeed();
    }


    setSpeed(){
        this.txt_speed.string = `速度x${this.speedSub}`;
        this.progressBar.progress = this.progress/this.replayData.Record.length;
    }



    //by_009:按钮点击事件
    onBtnClick(event) {
        AudioControl.playClick();
        console.log(event.currentTarget.name);
        switch (event.currentTarget.name) {
            case "btn_next"://快进
                if (this.speedSub < 4){
                    this.speedSub++;
                }
                this.playReplay();
                break;
            case "btn_pause"://暂停
                this.progressBar.node.pauseAllActions();
                this.btn_pause.active = false;
                this.btn_resume.active = true;
                break;
            case "btn_resume"://恢复
                this.progressBar.node.resumeAllActions();
                this.btn_pause.active = true;
                this.btn_resume.active = false;
                break;
            case "btn_back"://快退
                if (this.speedSub > 0){
                    this.speedSub--;
                }
                this.playReplay();
                break;
            case "btn_switch"://开关显示
                let panel = cc.find("panel",this.node);
                panel.stopAllActions();
                let toggle = event.currentTarget.getComponent(cc.Toggle);
                let y = toggle.isChecked==true ? -100:0;
                let moveTo = cc.moveTo(0.3, cc.v2(0,y));
                panel.runAction(moveTo);
                break;
            case "btn_rerun"://重播
                clientKernel.replay(this.replayCode, KernelData.chairID);
                break;
            case "btn_quit"://退出
                clientKernel.gotoHall();
                break;
            default:
                console.error("事件待处理：",event.currentTarget.name);
                break;
        }
    }


    // update (dt) {}
}
