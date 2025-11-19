const { ccclass, property } = cc._decorator;

@ccclass
export default class zp_PlayerInfo extends cc.Component {

    @property(cc.Label)
    nickname: cc.Label = null;

    @property(cc.Label)
    score: cc.Label = null;

    @property(cc.Label)
    gameID: cc.Label = null;

    @property(cc.Node)
    head: cc.Node = null;

    setInfo(e: any) {
        if (e) {
            if (this.nickname) {
                this.nickname.string = e.nickname;
            }
            if (this.score) {
                this.score.string = this.formatScore(e.score);
            }
            if (this.gameID) {
                this.gameID.string = e.gameID;
            }
            if (this.head) {
                GameTools.loadWxHead(this.head, e.head);
            }
        } else {
            console.warn("用户信息不存在");
        }
    }

    formatScore(e: number): string {
        if (e >= 1e4 && e < 1e8) {
            return (Math.floor(e / 1e4).toFixed(2) + "万");
        } else if (e >= 1e8) {
            return (Math.floor(e / 1e8).toFixed(2) + "亿");
        } else {
            return e.toString();
        }
    }
}