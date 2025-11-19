// import {AudioControl} from "../main/script/AudioControl";


//by_009:全局对象
export const GD = {

    //by_009:观战者id（是旁观者就有座位id）
    watcherID: null,

    clubID: null,
    baoxID: null,
    isAdmin: null, //1是，0否

    //by_009:房间配置
    roomConfig: null,
    //by_009:游戏配置
    GameConfig: null,
    //by_009:游戏工具
    GameTool: null,
    //by_009:牌逻辑
    GameLogic: null,
    // GameLogic: new GameLogic(),
    //物品配置表
    propCfg:null,
    //邮件信息
    sysEmailInfo:null,
    //当前背包物品
    curPropGoodsList:null,

    isVisitor:null,
}

GD.GameConfig = {
    isDebug: false,
    releaseUrl: "ws://www.00001.net:8888",
    debugUrl: "ws://www.00001.net:8888",
    hotUpdate_releaseUrl: "http://00001_update.zxsnn.com/home/hotUpdate",
    hotUpdate_debugUrl: "http://00001_update.zxsnn.com/home/debug",
    version: "0.0.11",
}

GD.GameTool = {
    //by_009:动态创建面板
    createPanel(panelName:string, cb?:Function) {
        UIHelper.showWaitLayer(true);
        cc.loader.loadRes(panelName, cc.Prefab, function (err, prefab) {
            UIHelper.showWaitLayer(false);
            if (err) {
                console.error(err);
                return
            }
            let parent = cc.find("Canvas/UI/panelNode");
            parent && parent.removeAllChildren();
            let newNode = cc.instantiate(prefab);
            newNode.parent = parent
            newNode.active = true;
            GD.GameTool.setActionByNode(newNode);

            // let panel = cc.find("panel",newNode).getComponent(cc.Widget);
            // if (panel){
            //     panel.target = cc.find("Canvas");
            //     panel.updateAlignment();
            // }
            if (cb) {
                cb(newNode);
            }

            //添加销毁的事件
            // let sprite_splash = cc.find("panel/sprite_splash", newNode);
            // if (sprite_splash) {
            //     sprite_splash.once(cc.Node.EventType.TOUCH_END, function () {
            //         // AudioControl.playClick();
            //         newNode.destroy();
            //     }.bind(this), this)
            // }
            //添加销毁的事件
            let btn_close = cc.find("panel/btn_close", newNode);
            if (btn_close) {
                btn_close.once(cc.Node.EventType.TOUCH_END, function () {
                    // AudioControl.playClick();
                    newNode.destroy();
                }.bind(this), this)
            }
        });
    },

    //创建全屏面板
    createFullScreenPanel(panelName:string, cb?:Function) {
        UIHelper.showWaitLayer(true);
        cc.loader.loadRes(panelName, cc.Prefab, function (err, prefab) {
            UIHelper.showWaitLayer(false);
            let fullScreenView = cc.instantiate(prefab);
            cc.Canvas.instance.node.addChild(fullScreenView);
        });
    },

    //by_009:创建预制
    createPrefab(panelName:string, cb?:Function) {
        if (panelName.indexOf("UIMenu") != -1) {
            cc.loader.loadRes(panelName, cc.Prefab, function (err, prefab) {
                if (err) {
                    console.error(err);
                    return
                }
                let newNode = cc.instantiate(prefab);
                if (cb) {
                    cb(newNode);
                }
            });
        } else {
            cc.loader.loadRes(panelName, cc.Prefab, function (err, prefab) {
                if (err) {
                    console.error(err);
                    return
                }
                let newNode = cc.instantiate(prefab);
                if (cb) {
                    cb(newNode);
                }
            });
        } 
    },

    /**
     * by_009:该座位相对与自己座位的值
     * @param chairID 传入需查座位id
     * @param myChairID 自己的座位id
     * @param chairCount 座位总数
     */
    getRelativeSeatID(chairID, myChairID, chairCount=GD.roomConfig["renShu"]||GD.roomConfig["renshu"]) {
        // @ts-ignore
        if (clientKernel.getIsWatcher() == true){
            myChairID = GD.watcherID;
        }
        return (chairID + chairCount - myChairID) % chairCount;
        // return (chairID + parseInt(chairCount * 3 / 2) - myChairID) % chairCount;
    },

    //by_009:复制本文到剪贴板
    copyTextToClipboard(value:string) {
        if (cc.sys.isBrowser) {
            let oInput = document.createElement('input');
            oInput.value = value;
            document.body.appendChild(oInput);
            oInput.select();
            document.execCommand("copy");
            document.body.removeChild(oInput);
        } else if (cc.sys.isNative) {
            // @ts-ignore
            jsb.copyTextToClipboard(value);
        }
        GD.GameTool.showTextTips('Copiado/COPY');
    },

    //by_009:显示文本提示
    showTextTips(value:string){
        UIHelper.showTips(value);

        // GD.GameTool.createPanel("public/prefab/UITextTips",(newNode)=>{
        //     let bg = cc.find("bg",newNode);
        //     let label = cc.find("bg/label",newNode).getComponent(cc.Label);
        //     label.string = value;
        //     bg.opacity = 0;
        //     bg.scaleX = 0;
        //
        //     let fadeIn = cc.fadeIn(0.2);
        //     let fadeOut = cc.fadeOut(0.5);
        //     let scaleTo = cc.scaleTo(0.2,1,1);
        //     let delay = cc.delayTime(1.5);
        //     let moveTo = cc.moveTo(1, cc.v2(0,450));
        //
        //     let spawn = cc.spawn(fadeIn, scaleTo);
        //     let spawn1 = cc.spawn(fadeOut, moveTo);
        //     let callFunc = cc.callFunc(()=>{
        //         newNode.destroy();
        //     }, this);
        //
        //     bg.runAction(cc.sequence(
        //         spawn,
        //         delay,
        //         spawn1,
        //         callFunc
        //     ))
        // })
    },

    //by_009:消息框
    messageBox(text:string, cb1, cb2){
        GD.GameTool.createPanel("hall/prefab/UIMessageBox",(newNode)=>{
            cc.find("panel/content",newNode).getComponent(cc.Label).string = text||"";
            cc.find("panel/btns/btn_confirm",newNode).on(cc.Node.EventType.TOUCH_END,()=>{
                if (cb1){
                    cb1();
                }
                newNode.destroy();
            }, this);
            cc.find("panel/btns/btn_cancel",newNode).on(cc.Node.EventType.TOUCH_END,()=>{
                if (cb2){
                    cb2();
                }
                newNode.destroy();
            }, this);
            cc.find("panel/btns/btn_cancel",newNode).active = !!cb2;
        })
    },

    //by_009:给目标节点的widget添加向Canvas对齐
    widgetAlign(node:cc.Node){
        let widget = node.getComponentsInChildren(cc.Widget);
        if (widget) {
            for (let i=0; i<widget.length; i++){
                widget[i].target = cc.find("Canvas");
                widget[i].updateAlignment();
            }
        }
    },

    //by_009:给节点设置动画
    setActionByNode(node:cc.Node, cb?:Function){
        if(!node){return}

        node.opacity = 0;
        node.scale = 0.6;
        let fadeIn = cc.fadeIn(0.3);
        // @ts-ignore
        let scaleTo = cc.scaleTo(0.3,1,1).easing(cc.easeElasticOut());
        let callFunc = cc.callFunc(()=>{
            if (cb){
                cb();
            }
        }, this);
        node.runAction(cc.sequence(cc.spawn(fadeIn,
            scaleTo),callFunc)
        );
        // GD.GameTool.setActionByNode(cc.director.getScene().children[0]);
    },

}


window["GD"] = GD;