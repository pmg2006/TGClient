

const { ccclass } = cc._decorator;

@ccclass
export default class FitCanvas extends cc.Component {

    // use this for initialization
    onLoad() {
        this.fitCanvas();
    }

    fitCanvas() {
        if(cc.sys.isMobile) {
            //cc.view.setDesignResolutionSize(cc.winSize.width, cc.winSize.width / 16 * 9, cc.ResolutionPolicy.FIXED_WIDTH);
        } else {
            //cc.view.setDesignResolutionSize(cc.winSize.width, cc.winSize.height, cc.ResolutionPolicy.SHOW_ALL);
            // this.node.getComponent(cc.Canvas).fitHeight = true;
             //this.node.getComponent(cc.Canvas).fitWidth = true;
        }
    }
}
