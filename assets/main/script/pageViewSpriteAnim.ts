import { WEB_NOTICE } from "../../kernel/Core/extend/ConstDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class pageViewSpriteAnim extends cc.Component {

    @property(cc.PageView)
    mPageView:cc.PageView = null;

    onLoad () {
    }

    start () {
       this.schedule(() => {
        let count = this.mPageView.getPages().length;
        let index = this.mPageView.getCurrentPageIndex();
        index = ((index < count) && (index + 1 !== count)) ? (index + 1) : 0;
        this.mPageView.scrollToPage(index, 2);
        }, 6); //6秒一换
    }
}
