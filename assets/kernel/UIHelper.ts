

export class _UIHelper {
    /**
     *显示加载界面
     *
     * @param {boolean} [show=true]
     * @param {string} [text=""]
     * @param {number} [stayTime=30]
     */
    showWaitLayer(show = true, text = "", stayTime = 30) {
        var panel_wait = cc.find("forever/UILoading")
        if (panel_wait) {
            panel_wait.getComponent("UILoading").showPanel(show || false, text, stayTime);
        }
        else {
            console.error("找不到forever/UILoading")
        }

    };


    /**
     *显示提示
     *
     * @param {string} [text=""]
     */
    showTips(text = "") {
        var panel_tips = cc.find("forever/UITips")
        if (panel_tips) {
            panel_tips.getComponent("UITips").showText(text)
        }
        else {
            console.error("找不到forever/UITips")
        }
    };



    /**
     * 对话框
     *
     * @param {string} [text=""]
     * @param {Function} [cb1]
     * @param {Function} [cb2]
     */
    MessageBox(text = "", cb1?: Function, cb2?: Function) {
        var UIMessageBox = cc.find("forever/UIMessageBox")
        if (UIMessageBox) {
            UIMessageBox.active = true;
            UIMessageBox.getComponent("UIMessageBox").messageBox(text, cb1, cb2);
        } else {
            console.error("找不到forever/UIMessageBox")
        }
    };



    getUIScript(type) {
        let canvas = cc.find("Canvas")
        return canvas.getComponentInChildren(type)
    };

}





