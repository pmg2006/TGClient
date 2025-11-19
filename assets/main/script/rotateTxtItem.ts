
const {ccclass, property} = cc._decorator;

@ccclass
export default class rotateTxtItem extends cc.Component {

    @property(cc.Label)
    msgLab:cc.Label=null
    @property(cc.Sprite)
    head:cc.Sprite=null
    @property(cc.Sprite)
    emoji:cc.Sprite=null

    start () {
     
    }
    init(msg:string){
      
        this.msgLab.string=msg

    }
    // update (dt) {}
}
