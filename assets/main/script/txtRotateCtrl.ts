import rotateTxtItem from "./rotateTxtItem";


const { ccclass, property } = cc._decorator;

@ccclass
export default class txtRotateCtrl extends cc.Component {


    curentIdx = 0
    delayTime = 0
    pool: cc.NodePool = new cc.NodePool()
    @property(cc.Prefab)
    ItemPrefab: cc.Prefab = null;
    allLen:number;
    text:string;
    /**每秒3个字的像素 */
    speed:number = 3 * 25;
    tween: cc.Tween = null;
    strAry = []
    getItem() {
        let enemy: cc.Node
        if (this.pool.size() > 0) {
            enemy = this.pool.get();
        } else {
            enemy = cc.instantiate(this.ItemPrefab)
        }
        return enemy
    }
    
    start() {
        this.unscheduleAllCallbacks()
        this.init();
    }

    init() { 
        if (this.tween) {
            this.node.removeAllChildren();
            this.tween.stop();
        }

        this.strAry = [{msg: "🚀 Venha jogar o jogo, jogos PG genuínos, e um grande número de jogos divertidos, bem-vindo para jogar!"}] ;
        this.curentIdx = 0;      
        this.text = "";
        if(!this.strAry.length) {
            this.node.active = false;
            return
        }
        for(var i = 0; i < this.strAry.length; i ++){
            this.text += this.strAry[i].msg
        }
        this.create()

    }


    create() {
        if(!this.strAry || !this.strAry.length)return
        let item = this.getItem()
        item.y=0
        /**跑马灯起始点是从右边到最左边, 文字的动画移动的距离是文字的像素长度+跑马灯的长度
         * 跑马灯的速度是每秒3个文字的像素
         */
        item.parent = this.node;
        this.text = this.strAry[this.curentIdx].msg;
        this.allLen = this.node.width + 25 * this.text.length;
        /**item移动最右边,item中心点是中间+1/2宽度就是最右边 */
        //item.x = this.node.x + this.node.width/2  
        item.x = this.node.x + this.node.width/2  
        // item.getComponent(rotateTxtItem).init(this.strAry[this.curentIdx])
        //item.getChildByName("New Label").getComponent(cc.Label).string=this.text;
        item.getComponent(rotateTxtItem).init(this.strAry[this.curentIdx].msg)
        // this.curentIdx++
        this.node.width + 25 * this.text.length
        this.curentIdx = ++this.curentIdx % this.strAry.length
        //this.node.addChild(item)
        /**item在this.allLen/this.speed时间内,从起点移动到this.node.children[0].x - this.node.children[0].width/2 - 25 * this.text.length的位置 */
        this.tween = cc.tween(item).by(this.allLen/this.speed, { x:  - 25 * this.text.length}).call(() => { 
            //item.removeFromParent();
            this.pool.put(item),
            this.create()

        }).start()
    }
    onDestroy(){
    }
}
