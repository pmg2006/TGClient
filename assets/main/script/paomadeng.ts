// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


const {ccclass, property} = cc._decorator;

@ccclass
export default class paomadeng extends cc.Component {

    allLen:number;
    text:string;
    /**每秒3个字的像素 */
    speed:number = 3 * 25;
    curentIdx = 0
    delayTime = 0
    pool: cc.NodePool = new cc.NodePool()
    @property(cc.Prefab)
    ItemPrefab: cc.Prefab = null;
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
     
    }
    init() {
        this.strAry = ["🚀 Venha jogar o jogo, jogos PG genuínos, e um grande nmero de jogos divertidos, bem-vindo para jogar!"] ;
        this.text = "";
        if(!this.strAry.length) {
            this.node.active = false;
            return
        }
        for(var i = 0; i < this.strAry.length; i ++){
            this.text += this.strAry[i].msg
        }
        
        //this.allLen = this.node.children[0].width + 25 * this.text.length;
        //this.schedule(this.create, this.allLen/this.speed);
        this.create()
    }
    create() {
        let item = this.getItem()
        item.y=0
        /**跑马灯起始点是从右边到最左边, 文字的动画移动的距离是文字的像素长度+跑马灯的长度
         * 跑马灯的速度是每秒3个文字的像素
         */
        this.text = this.strAry[this.curentIdx].msg;
        this.allLen = this.node.children[0].width + 25 * this.text.length;
        /**item移动最右边,item中心点是中间+1/2宽度就是最右边 */
        item.x=this.node.children[0].x + this.node.children[0].width/2  
        // item.getComponent(rotateTxtItem).init(this.strAry[this.curentIdx])
        item.getComponent(cc.Label).string=this.text;
        // this.curentIdx++
        this.node.children[0].width + 25 * this.text.length
        this.curentIdx = ++this.curentIdx % this.strAry.length
        this.node.children[0].addChild(item)
        /**item在this.allLen/this.speed时间内,从起点移动到this.node.children[0].x - this.node.children[0].width/2 - 25 * this.text.length的位置 */
        cc.tween(item).by(this.allLen/this.speed, { x: this.node.children[0].x - this.node.children[0].width/2 - 25 * this.text.length}).call(() => { 
            this.pool.put(item),
            this.create()

        }).start()
    }
    onDestroy(){
    }
}
