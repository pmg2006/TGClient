/* 手牌拖拽控件
 * @Author: xk.qr 
 * @Date: 2020-03-19 20:09:20 
 * @Last Modified by: xk.qr
 * @Last Modified time: 2020-03-19 20:10:36
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class HandCardDrgger extends cc.Component {

    @property({type:cc.Layout,displayName:"layout(带有layout的节点)"})
    layout: cc.Layout = null;
    
    _selectedPoker: cc.Node[] = []
    _space = 0
    _spacingX = 0
    selectHeight = 30 //选中抬起高度
  

    start() {
        this._selectedPoker = [];
        this._space = 100;
        this._spacingX = this.layout.spacingX;
        this.addTouchEvent(this.node)
    }
 
    /**
     * 取消所有选择的牌
     */
    cancelSelectCard() {
        this._selectedPoker = [];
        for (let i = 0; i < this.node.childrenCount; i++) {
            const card = this.node.children[i];
            card.y = 0;
            card.color = new cc.Color(255, 255, 255); //恢复颜色
        }
    }

    //获取选中的序号
    getSelectedIndexs() {
        const arr = [];
        for (let i = 0; i < this.node.children.length; i++) {
            const card = this.node.children[i];
            if (card.y !== 0) {
                arr.push(i);
            }
        }
        return arr
    }

    //选中子节点 抬起来
    setSelectIndexs(selectIndexArray: number[]) {

        let childrenCount = this.node.childrenCount

        selectIndexArray = selectIndexArray || []
        for (let index = 0; index < childrenCount; index++) {
            let card = this.node.children[index]
            card.y = 0
            if (selectIndexArray.indexOf(index) > -1)
                card.y = this.selectHeight
        }


    }

    //看点到了哪个子节点上    没点到则返回-1
    private getClickIndex(node: cc.Node, touchEvent) {
        const count = node.children.length;
        if (count > 0) {
            const newVec2 = node.convertToNodeSpace(touchEvent.getLocation());

            const spacingX =  this._spacingX
           

            const childNode = node.children[0];
            const allChilrenWith = count * childNode.width + (count - 1) * spacingX; //子节点实际宽度 = 子节点总宽度+间隔宽度
            //点击在子节点上
            if (newVec2.x >= 0 && newVec2.x <= allChilrenWith) {

                const space = childNode.width + spacingX; // 节点的实际间隔
                let index = Math.floor(newVec2.x / space);
                if (index < 0) {
                    index = 0
                } else if (index >= count) {
                    index = count - 1
                }
                return index
            }
        }
        return -1
    }


    private addTouchEvent(pokers) {
        const self = this;
        const spacingX = this._spacingX;


        console.log('poker addTouchEvent');
        //当手指触点落在目标节点区域内时
        pokers.on("touchstart", (event: cc.Event.EventTouch) => {
            console.log('poker TOUCH_START', event);

            if (pokers.children.length <= 0) {
                return
            }
            this._space = pokers.children[0].width + spacingX;//两张牌的间隔
            self._selectedPoker = [];
            const index = self.getClickIndex(pokers, event); //看点到了哪个子节点上    没点到则返回-1
            if (index !== -1) {
                const card = pokers.children[index];
                self.pushSelected(card)
            }


        });

        //当手指在屏幕上目标节点区域内移动时
        pokers.on("touchmove", (event) => {
            if (pokers.children.length <= 0) {
                return
            }

            console.log('poker touchmove');

            const newVec2 = pokers.convertToNodeSpace(event.getLocation());
            const index = Math.floor(newVec2.x / this._space);
            const curPos = event.getLocation();
            const lastPos = event.getPreviousLocation();
            const deltaX = lastPos.x - curPos.x;
            const lastX = deltaX + newVec2.x;
            const lastIndex = Math.floor(lastX / this._space);

            //因为如果滑动速度过快的话 就会有漏选,这里算出 和上一个点之间的所有滑动选择到的扑克牌
            for (let i = Math.min(index, lastIndex); i <= Math.max(index, lastIndex); i++) {
                if (i >= 0 && i < pokers.children.length) {
                    const card = pokers.children[i];
                    self.pushSelected(card)
                }
            }

        });


        //当手指在目标节点区域内离开屏幕时
        pokers.on("touchend", (event) => {
            if (pokers.children.length <= 0) {
                return
            }
            console.log('poker TOUCH_END');
            self.doSelectCard();
        }, this);


        //当手指在目标节点区域外离开屏幕时
        pokers.on("touchcancel", (event) => {
            if (pokers.children.length <= 0) {
                return
            }
            console.log('poker TOUCH_CANCEL');
            self.doSelectCard();
        }, this);


    }
    private pushSelected(card: cc.Node) {
        if (this._selectedPoker.indexOf(card) === -1) {
            this._selectedPoker.push(card)
        }
        // console.log("改变颜色");
        card.color = new cc.Color(150, 150, 150); //选中颜色变化

    }
    private doSelectCard() {
        // console.log('doSelectCard', this._selectedPoker);

        if (this._selectedPoker.length > 0) {

            let allDown = true
            let allUp = true
            for (let i = 0; i < this._selectedPoker.length; i++) {
                const card = this._selectedPoker[i];
                if (card.y == 0) allUp = false
                if (card.y == this.selectHeight) allDown = false

            }
            let setY = this.selectHeight

            if (allUp) setY = 0  //全都是抬起 则放下  

            for (let i = 0; i < this._selectedPoker.length; i++) {
                const card = this._selectedPoker[i];
                card.y = setY
                card.color = new cc.Color(255, 255, 255); //恢复颜色
            }

        }


    }
}
