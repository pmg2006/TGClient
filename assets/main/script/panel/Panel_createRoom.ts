import RoomParamsBase from "../../../kernel/Base/RoomParamsBase";
import { AudioControl } from "../AudioControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Panel_createRoom extends cc.Component {

    //by_009:参数内容
    @property(cc.Node)
    content_right: cc.Node = null;

    //by_009:创建房间
    @property(cc.Node)
    btn_create: cc.Node = null;
    //by_009:创建包厢
    @property(cc.Node)
    btn_createBaox: cc.Node = null;
    //by_009:修改包厢
    @property(cc.Node)
    btn_modificatioBx: cc.Node = null;

    //by_009:面板类型(1单游戏 2:多游戏)
    @property({ type: cc.Integer, tooltip: "1:单游戏 2:多游戏" })
    panelType: Number = 2;
    //by_009:创建类型(1:创建房间 2:创建包厢 3:修改房间 4:修改包厢)
    @property({ type: cc.Integer, tooltip: "1:创建房间 2:创建包厢 3:修改房间 4:修改包厢" })
    createType: Number = 1;

    //by_009:选中游戏
    selectedGame: string = "";
    // //by_009:所有游戏按钮
    // games:cc.Toggle[] = null;
    //by_009:所有游戏父节点
    @property({ type: cc.Node, tooltip: "所有游戏父节点" })
    games: cc.Node = null;

    storageData:any = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.btn_create.on(cc.Node.EventType.TOUCH_END, this.onClickBtn, this);
        this.btn_createBaox.on(cc.Node.EventType.TOUCH_END, this.onClickBtn, this);
        this.btn_modificatioBx.on(cc.Node.EventType.TOUCH_END, this.onClickBtn, this);

        for (let i = 0; i < this.games.childrenCount; i++) {
            this.games.children[i].on(cc.Node.EventType.TOUCH_END, this.onClickGames, this);
        }
    }

    start() {
        this.btn_create.active = this.createType == 1;
        this.btn_createBaox.active = this.createType == 2;
        this.btn_modificatioBx.active = this.createType == 4;
    }

    //by_009:初始化面板
    iniPanel(name: string, panelType: number, createType: number, config?) {
        this.panelType = panelType;
        this.createType = createType;
        this.storageData = config;
        this.showPrefab(name);

        for (let i = 0; i < this.games.childrenCount; i++) {
            if (this.games.children[i].name == name) {
                this.games.children[i].getComponent(cc.Toggle).check();
                return
            }
        }
    }


    //by_009:监听点击游戏
    onClickGames(event) {
        AudioControl.playClick();

        let name = event.currentTarget.name;
        this.selectedGame = name;
        this.content_right.removeAllChildren();
        this.showPrefab(name);
    }

    //by_009:按钮点击事件
    onClickBtn(event) {
        AudioControl.playClick();

        let name = event.currentTarget.name;
        let config = this.getParam();
        switch (name) {
            case "btn_creatRoom"://创建房间
                if (config) {
                    NetHelp.createNormalRoom(this.selectedGame, config, (retData) => {
                        let { code, info } = retData;
                        if (code == 0) {
                            let roomCode = info.roomCode;
                            NetHelp.joinRoom(roomCode, (retData) => {
                                let { code, info } = retData;
                                if (code == 0) {
                                    // this.onCloseClick() //成功则关闭窗口 准备切换
                                } else {
                                    UIHelper.showTips(info);
                                }
                            });
                        } else {
                            GD.GameTool.showTextTips(info);
                        }
                    })
                }
                break;
            case "btn_createBaox"://创建包厢
                if (config) {
                    NetHelp.createBaox(GD.clubID, this.selectedGame, config, (retData) => {
                        let { code, info } = retData;
                        if (code == 0) {
                            GD.GameTool.showTextTips("请求成功");
                            this.node.destroy();
                        } else {
                            GD.GameTool.showTextTips(info);
                        }
                    })
                } else {
                    GD.GameTool.showTextTips("配置为空");
                }
                break;
            case "btn_modificatioBx"://修改包厢
                console.log('修改包厢');
                if (config) {
                    NetHelp.modifyBaox_new(GD.clubID,this.storageData.baoxID, {config:config, moduleEnName:this.selectedGame}, (retData) => {
                        let { code, info } = retData;
                        if (code == 0) {
                            GD.GameTool.showTextTips("请求成功");
                            this.node.destroy();
                        } else {
                            GD.GameTool.showTextTips(info);
                        }
                    })
                } else {
                    GD.GameTool.showTextTips("配置为空");
                }
                break;
            default:
                console.error("事件待处理：", event.currentTarget.name);
                break;
        }
    }


    //by_009:显示预设
    showPrefab(prefabName: string) {
        UIHelper.showWaitLayer(true);
        // let prefabPath = `${prefabName}/param/` + prefabName;
        let prefabPath = `hall/createRoom/` + prefabName;

        GD.GameTool.createPrefab(prefabPath, (node) => {
            node.getComponent(RoomParamsBase).logo.active = this.panelType == 1;

            this.content_right.addChild(node);
            this.selectedGame = prefabName;
            UIHelper.showWaitLayer(false)

            this.storageData && this.writeParam(this.storageData.config);
        })
    }


    //by_009:获取配置
    getParam() {
        let roomParamsScript = this.content_right.getComponentInChildren(RoomParamsBase);
        if (!roomParamsScript) { return; }
        let config = roomParamsScript.toogle2Parmas(); //房间配置
        if (!config) {
            UIHelper.showTips("房间参数错误");
            return
        }

        this.selectedGame = roomParamsScript.getSelectedGame() || this.selectedGame;
        return config;
    }


    //by_009:写入配置
    writeParam(config:any) {
        let param = Object.keys(config);
        for (let i = 0; i < param.length; i++) {
            if (config[param[i]]=="describe"||config[param[i]]=="roomCode"||
                config[param[i]]=="roomID"||config[param[i]]=="round"||config[param[i]]=="userID"){
                continue;//忽略部分参数
            }

            // console.log(param[i], config[param[i]]);
            this.selectToggle(param[i], config[param[i]]);
        }
    }

     selectToggle(name, value) {
         let roomParamsScript = this.content_right.getComponentInChildren(RoomParamsBase);
         let toggleContainer = roomParamsScript.node.getComponentsInChildren(cc.ToggleContainer);
        if (typeof value == "number"){
            for (let i = 0; i < toggleContainer.length; i++) {
                let tc = toggleContainer[i];
                if (tc.node.name == name+""){
                    let children = tc.node.children;
                    if (children.length == 1){//如果是【 btn_-、 label、 btn+ 】可输入类
                        let enabled = children[0].getComponent(cc.Toggle).enabled;
                        if (enabled == false){
                            children[0].name = `${name}_${value}`;
                            let label = cc.find("label",children[0]);
                            if(label) label.getComponent(cc.Label).string = value+"";
                            
                            continue;
                        }
                    }
                    for (let j = 0; j < children.length; j++) {
                        let splitArray = children[j].name.split("_");
                        let [paramName, nodeValue] = splitArray;
                        if(paramName==name+"" && nodeValue==value+""){
                            children[j].getComponent(cc.Toggle).check();
                        }
                    }
                }
            }
        }else if (typeof value == "boolean"){
            for (let i = 0; i < toggleContainer.length; i++) {
                let tc = toggleContainer[i];
                if (tc.node.name == name+""){
                    if (value==true){
                        tc.node.children[0].getComponent(cc.Toggle).check();
                    }else {
                        tc.node.children[0].getComponent(cc.Toggle).uncheck();
                    }
                }
            }
        }else if (typeof value == "object"){
            for (let i = 0; i < toggleContainer.length; i++) {
                let tc = toggleContainer[i];
                if (tc.node.name == name+""){
                    for (let j = 0; j < value.length; j++) {
                        if (value[j] == 1){
                            tc.node.children[j].getComponent(cc.Toggle).check();
                        }else {
                            tc.node.children[j].getComponent(cc.Toggle).uncheck();
                        }
                    }
                }
            }
        }
    }

    // update (dt) {}
}