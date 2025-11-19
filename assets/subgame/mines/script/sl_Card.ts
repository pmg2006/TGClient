// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class sl_Card extends cc.Component {

    @property(cc.Sprite)
    cardSprite = null;

    @property(cc.SpriteFrame)
    cardSpriteFrame = [];

    cardType : any;

    // onLoad () {}

    start () {

    }

    init(type) {
        this.cardType = type;
        this.cardSprite.spriteFrame = this.cardSpriteFrame[this.cardType];
    }
}
