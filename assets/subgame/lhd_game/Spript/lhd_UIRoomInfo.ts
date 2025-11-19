const { ccclass, property } = cc._decorator;

@ccclass
export default class lhd_UIRoomInfo extends cc.Component {

    @property(cc.Label)
    roomID: cc.Label = null;

    @property(cc.Label)
    round: cc.Label = null;

    start = function () { }

    refreshRoomInfo = function (e) {
        this.roomID.string = e.gameID;
        this.round.string = e.round + "/" + e.maxRound
    }
}