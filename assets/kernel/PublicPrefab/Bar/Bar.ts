/**
遮罩进度条 跟processBar差不多
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class MaskBar extends cc.Component {

    _progress = 1;

    @property(cc.Sprite)
    bar: cc.Sprite = null;

    @property
    get progress() {
        return this._progress
    };

    set progress(value) {

        let _value: number = value;
        if (value < 0) {
            _value = 0

        }
        if (value > 1) {
            _value = 1
        }

        this.bar.fillRange = _value
        this._progress = _value

    };




    start() {

    }

    // update (dt) {}
}
