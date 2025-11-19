const {ccclass, property} = cc._decorator;

@ccclass
export default class lr_Num extends cc.Component {

    @property(cc.Sprite)
    cardSprite = null;

    @property(cc.SpriteFrame)
    cardSpriteFrame = [];

    cardType : any;

    init(type) {
        this.cardType = type;
        this.cardSprite.spriteFrame = this.cardSpriteFrame[this.cardType];
    }
}