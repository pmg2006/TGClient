import { AudioControl } from "./AudioControl";


const { ccclass, property } = cc._decorator;

@ccclass
export default class panel_task_new extends cc.Component {

    @property(cc.Node)
    taskItemList: cc.Node[] = [];

    @property(cc.Node)
    helpItemList: cc.Node[] = [];

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;


    private curTaskType = 1;

    onLoad(){
        for(let i = 0;i<this.taskItemList.length;i++){
            this.taskItemList[i].active = true;
        }
        for(let i = 0;i<this.helpItemList.length;i++){
            this.helpItemList[i].active = false;
        }
    }

    start() {
        let btnS = this.node.getComponentsInChildren(cc.Button);
        for (let i = 0; i < btnS.length; i++) {
            btnS[i].node.on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);
        }
    }


    //by_009:按钮点击事件
    onBtnClick(event) {
        AudioControl.playClick();

        switch (event.currentTarget.name) {
            case "item_task1":
                this.curTaskType = 1
                this.initTaskNode(1)
                break;
            case "item_task2":
                this.curTaskType = 2
                this.initTaskNode(2)
                break;
            case "item_task3":
                this.curTaskType = 3
                this.initTaskNode(3)
                break;
            case "item_task4":
                this.curTaskType = 4
                this.initTaskNode(4)
                break;
            case "item_task5":
                this.curTaskType = 5
                this.initTaskNode(5)
                break;
            case "item_task6":
                this.curTaskType = 6
                this.initTaskNode(6)
                break;
            case "btn_get_reward":
                this.initTaskDetailUI();
                break;
            default:
                console.error("事件待处理：", event.currentTarget.name);
                break;
        }
    }
    initTaskNode(type){
        this.curTaskType = type;
        for(let i = 0;i<this.taskItemList.length;i++){
            this.taskItemList[i].active = false;
        }
        for(let i = 0;i<this.helpItemList.length;i++){
            this.helpItemList[i].active = false;
        }
        this.helpItemList[type-1].active = true;
    }


    initTaskDetailUI() {
        switch (this.curTaskType) {
            case 1:
                console.log("跳转到第1个任务")
                GD.GameTool.createPanel("hall/panel/panel_pay_new");
                break;
            case 2:
                console.log("跳转到第2个任务")
                GD.GameTool.createPanel("hall/panel/panel_Share_new");
                break;
            case 3:
                console.log("跳转到第3个任务")
                GD.GameTool.createPanel("hall/panel/panel_pay_new");
                break;
            case 4:
                console.log("跳转到第4个任务")
                GD.GameTool.createPanel("hall/panel/panel_User_new");
                break;
            default:
                console.error("事件待处理：", this.curTaskType);
                break;
        }
    }
    onClickClose(){
        this.node.destroy();
    }


    // update (dt) {}
}
