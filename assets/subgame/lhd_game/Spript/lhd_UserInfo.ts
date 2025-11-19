const { ccclass, property } = cc._decorator;

@ccclass
export default class lhd_UserInfo extends cc.Component {
    @property(cc.Label)
    nickName: cc.Label = null;

    @property(cc.Label)
    score: cc.Label = null;

    float = function () { }

    refreshInfo = function (e) {
        this.score.string = parseFloat(e.score).toFixed(2);
        this.score.string = parseFloat(e.score).toFixed(2)
    }

    flyTo = function (e, t) { }
}