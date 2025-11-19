// 创建Game脚本作为启动场景
const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    onLoad() {
        this.startScene();
    }

    startScene() {
        //cc.director.loadScene("hotupdate");
        // 在手机环境下打开hotupdate
        if (cc.sys.isMobile)
             {
            cc.director.loadScene("hotupdate");
        } 
        // 在PC端打开hotupdate_h
        else {
            cc.director.loadScene("hotupdate_h");
        }
    }
}
