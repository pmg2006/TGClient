const { ccclass, property } = cc._decorator;

@ccclass
export default class BcbmUIRoomInfo extends cc.Component {

    //    roomID = null;
    //    round = null;

    //    start = function() {}

    //    refreshRoomInfo = function(e) {
    //         this.roomID.string = e.gameID, this.round.string = e.round + "/" + e.maxRound
    //     }, i([c(cc.Label)], t.prototype, "roomID", void 0), i([c(cc.Label)], t.prototype, "round", void 0), t = i([a], t)

    @property(cc.Label)
    roomID: cc.Label = null;

    @property(cc.Label)
    round: cc.Label = null;

    start() { }

    refreshRoomInfo(data: { gameID: string, round: number, maxRound: number }) {
        this.roomID.string = data.gameID;
        this.round.string = `${data.round}/${data.maxRound}`;
    }
}