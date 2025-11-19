const { ccclass, property} = cc._decorator;

@ccclass
export default class Bcbmhistroyicon extends cc.Component {
          
    @property([cc.SpriteFrame])
    histroy : cc.SpriteFrame[]= [];
    numnum = 100
                
    onLoad = function() {}
    
    start = function() {}
    
    setH = function(e) {
        this.node.getComponent(cc.Sprite).spriteFrame = this.histroy[e]
    }
}