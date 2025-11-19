import GameTools from "../../../kernel/GameTools";
import { CryptosAudioControl } from "./cryptosAudioControl";
import { CryptosDefine } from "./cryptosDefine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Cryptos extends cc.Component {

    @property(cc.Label)
    scoreLab: cc.Label = null;

    @property(cc.Node)
    headNode: cc.Node = null;

    @property(cc.Node)
    radioNode: cc.Node = null;

    @property(cc.Node)
    scoreAni: cc.Node = null;

    @property(cc.Node)
    gemNode: cc.Node = null;

    @property(cc.Label)
    betLab: cc.Label = null;

    /**底座 */
    @property([cc.SpriteFrame])
    baseSprList: cc.SpriteFrame[] = [];

    /**牌 */
    @property([cc.SpriteFrame])
    cardSprList: cc.SpriteFrame[] = [];

    @property(cc.Node)
    recordContent: cc.Node = null;

    @property(cc.Node)
    recordItem: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    private betScore: number = 1;
    private radioList: cc.Node[] = [];
    private genList: cc.Node[] = [];

    private recordList = [];

    // onLoad () {}

    start() {
        GameTools.addBtnOnClick(this.node, this.btnOnClick, this);

        const myUserItem = clientKernel.getMeUserItem();
        if (myUserItem) {
            this.scoreLab.string = "R$ " + myUserItem.score.toFixed(2);
            GameTools.loadWxHead(this.headNode, myUserItem.head);
        }

        this.recordItem.active = false;

        for (let i = 0; i < 7; i++) {
            const node = this.radioNode.getChildByName("ratio" + i);
            this.radioList.push(node);
        }

        for (let i = 0; i < 5; i++) {
            const node = this.gemNode.getChildByName("spr_base" + (i + 1));
            this.genList.push(node);
        }
        this.reset();
    }

    reset() {
        for (let i = 0; i < this.radioList.length; i++) {
            const left = this.radioList[i].getChildByName("left");
            for (let k = 0; k < 5; k++) {
                const halo = left.getChildByName("spr_halo" + (k + 1));
                halo.color = cc.Color.WHITE;
            }

            this.radioList[i].getChildByName("right").active = false;
        }

        const ani = this.gemNode.getComponent(cc.Animation);
        ani.stop("play");
        ani.stop("up_down");

        this.scoreAni.children[0].active = false;
        this.scoreAni.children[1].active = false;
    }

    onEventSceneMessage(gameStatus: number, data: any) {

    }

    onEventGameMessage(subCMD: number, data: any) {
        switch (subCMD) {
            case CryptosDefine.msgEvent.UserBet: {
                this.onUserBet(data);
                break;
            }
            case CryptosDefine.msgEvent.End: {
                this.onGameEnd(data);
                break;
            }
        }
    }

    onUserBet(data: any) {
        this.reset();
    }

    async onGameEnd(data: any) {
        const { cardList, cardType, score, curBet } = data;

        const saveList = this.getCardColorByType(cardList, cardType);
        await this.showGen(cardList, saveList);

        let scoreNode: cc.Node = null;
        let headSpr = "";
        if (score > 0) {
            scoreNode = this.scoreAni.children[0];
            headSpr += "+";
            CryptosAudioControl.playWin();
        }
        else {
            scoreNode = this.scoreAni.children[1];
            CryptosAudioControl.playLose();
        }

        scoreNode.active = true;
        scoreNode.getChildByName("label_win").getComponent(cc.Label).string = headSpr + score;
        scoreNode.getComponent(cc.Animation).play();
        this.showRadio(saveList, cardType, score);
        this.addRecord(saveList, cardType, curBet, score);
    }

    showGen(cardList: number[], saveList: number[]) {
        for (let i = 0; i < this.genList.length; i++) {
            let baseSprIndex = 0;
            const cardValue = cardList[i];
            if (saveList.includes(cardList[i])) {
                baseSprIndex = cardValue;
            }

            this.genList[i].getChildByName("spr_base").getComponent(cc.Sprite).spriteFrame = this.baseSprList[baseSprIndex];
            const spr_gemstone = this.genList[i].getChildByName("spr_cry").getChildByName("spr_gemstone");
            spr_gemstone.getComponent(cc.Sprite).spriteFrame = this.cardSprList[cardValue - 1];
        }

        const ani = this.gemNode.getComponent(cc.Animation);

        return new Promise((resolve, reject) => {
            ani.play("play");
            ani.once("finished", () => {
                ani.play("up_down");
                resolve(true);
            });
        });
    }

    showRadio(saveList: number[], cardType: number, score: number) {
        this.radioList[cardType].active = true;
        const left = this.radioList[cardType].getChildByName("left");
        for (let k = 0; k < 5; k++) {
            const halo = left.getChildByName("spr_halo" + (k + 1));
            const color = this.getColor(saveList, k, cardType);
            if (color) halo.color = color;
        }

        const right = this.radioList[cardType].getChildByName("right");
        right.active = true;
        const scoreNode = right.getChildByName("payout").getChildByName("num").getChildByName("num_integer").getChildByName("lb_integer");
        scoreNode.getComponent(cc.Label).string = score.toFixed(2);
    }

    getColor(saveList: number[], index: number, cardType: number) {
        switch (cardType) {
            case CryptosDefine.CardType.Type_Double: {
                if (index > 1) return null;

                return CryptosDefine.CardColor[saveList[0] - 1];
            }
            case CryptosDefine.CardType.Type_Two_Pairs: {
                if (index > 3) return null;
                if (index > 1) return CryptosDefine.CardColor[saveList[1] - 1];
                return CryptosDefine.CardColor[saveList[0] - 1];
            }
            case CryptosDefine.CardType.Type_Three: {
                if (index > 2) return null;
                return CryptosDefine.CardColor[saveList[0] - 1];
            }
            case CryptosDefine.CardType.Type_Gourd: {
                if (index > 2) return CryptosDefine.CardColor[saveList[1] - 1];;
                return CryptosDefine.CardColor[saveList[0] - 1];
            }
            case CryptosDefine.CardType.Type_Four: {
                if (index > 3) return null;

                return CryptosDefine.CardColor[saveList[0] - 1];
            }
            case CryptosDefine.CardType.Type_Five: {
                return CryptosDefine.CardColor[saveList[0] - 1];
            }
        }

        return null;
    }

    addRecord(saveList: number[], cardType: number, betScore: number, score: number) {
        if (this.recordList.length >= 60) this.recordList.pop();
        this.recordList.push({ saveList, cardType, betScore, score, time: this.getDateTime() });

        const children = this.recordContent.children;
        this.recordContent.removeAllChildren();

        let index = 0;
        for (let i = this.recordList.length - 1; i >= 0; i--) {
            let item: cc.Node = null;
            if (children.length > index) {
                item = children[index];
            }
            else {
                item = cc.instantiate(this.recordItem);
                item.active = true;
            }

            index++;
            const betNode = item.getChildByName("amount").getChildByName("lb_num");
            betNode.getComponent(cc.Label).string = "R$ " + this.recordList[i].betScore.toFixed(2);

            const left = item.getChildByName("results").getChildByName("left");
            for (let k = 0; k < left.childrenCount; k++) {
                const node = left.children[k];
                const color = this.getColor(this.recordList[i].saveList, k, this.recordList[i].cardType);
                if (color) node.color = color;
                else node.active = false;
            }

            const winScore = item.getChildByName("winScore").getChildByName("lb_num");
            winScore.getComponent(cc.Label).string = this.recordList[i].score.toFixed(2);

            const status = item.getChildByName("status").getChildByName("lb_sata");
            status.getComponent(cc.Label).string = this.recordList[i].score > 0 ? "Win" : "Lose";

            const lb_time = item.getChildByName("lb_time");
            lb_time.getComponent(cc.Label).string = this.recordList[i].time;

            this.recordContent.addChild(item);
        }
    }

    onEventUserEnter(userItem: ClientUserItem) {

    }

    onEventUserLeave(userItem: ClientUserItem) {

    }

    UserOnlineOffline(userItem: ClientUserItem) {

    }

    UserStatusChanged(statusData: any) {

    }

    onEventUserScore(userItem: ClientUserItem) {
        if (userItem.chairID != KernelData.chairID) return;
        this.scoreLab.string = "R$ " + userItem.score.toFixed(2);
    }

    onCostTick(data) {
        if (data.chairID != KernelData.chairID) return;
        this.scoreLab.string = "R$ " + data.score.toFixed(2);
    }

    updateBetLab() {
        if (this.betScore < 1) this.betScore = 1;
        this.betLab.string = this.betScore.toString();
    }

    btnOnClick(event) {
        CryptosAudioControl.playClick();
        const btn_name = event.currentTarget.name;
        switch (btn_name) {
            case "btn_back": {
                clientKernel.dismissGame(false);
                break;
            }
            case "spr_help": {
                break;
            }
            case "btn_min": {
                this.betScore = 1;
                this.updateBetLab();
                break;
            }
            case "btn_max": {
                const myUserItem = clientKernel.getMeUserItem();
                if (myUserItem && myUserItem.score >= 1) {
                    this.betScore = Math.floor(myUserItem.score);
                    this.updateBetLab();
                }
                break;
            }
            case "btn_2": {
                if (this.betScore < 2) return;
                this.betScore = Math.floor(this.betScore / 2);
                this.updateBetLab();
                break;
            }
            case "btn_2X": {
                const myUserItem = clientKernel.getMeUserItem();
                let score = this.betScore * 2;
                if (myUserItem && score > myUserItem.score) score = Math.floor(myUserItem.score);
                this.betScore = score;
                this.updateBetLab();
                break;
            }
            case "btn_bet": {
                const myUserItem = clientKernel.getMeUserItem();
                if (myUserItem && this.betScore > myUserItem.score) {
                    GD.GameTool.showTextTips("underscore");
                    return;
                }

                clientKernel.sendGameMsg(CryptosDefine.msgEvent.UserBet, { score: this.betScore });
                break;
            }
        }
    }

    getCardColorByType(cardList: number[], cardType: number) {
        const saveList = [];
        if (cardType == CryptosDefine.CardType.Type_Null) return saveList;

        const cardCoutMap: { [cardData: number]: number } = {};
        for (let i = 0; i < cardList.length; i++) {
            cardCoutMap[cardList[i]] = cardCoutMap[cardList[i]] > 0 ? cardCoutMap[cardList[i]] + 1 : 1;
        }
        switch (cardType) {
            case CryptosDefine.CardType.Type_Double: {
                for (const key in cardCoutMap) {
                    if (cardCoutMap[key] == 2) {
                        saveList.push(Number(key));
                        break;
                    }
                }
                break;
            }
            case CryptosDefine.CardType.Type_Two_Pairs: {
                for (const key in cardCoutMap) {
                    if (cardCoutMap[key] == 2) {
                        saveList.push(Number(key));
                    }
                }
                break;
            }
            case CryptosDefine.CardType.Type_Three: {
                for (const key in cardCoutMap) {
                    if (cardCoutMap[key] == 3) {
                        saveList.push(Number(key));
                        break;
                    }
                }
                break;
            }
            case CryptosDefine.CardType.Type_Gourd: {
                for (const key in cardCoutMap) {
                    if (cardCoutMap[key] == 3) {
                        saveList.push(Number(key));
                        break;
                    }
                }
                for (const key in cardCoutMap) {
                    if (cardCoutMap[key] == 2) {
                        saveList.push(Number(key));
                        break;
                    }
                }
                break;
            }
            case CryptosDefine.CardType.Type_Four: {
                for (const key in cardCoutMap) {
                    if (cardCoutMap[key] == 4) {
                        saveList.push(Number(key));
                        break;
                    }
                }
                break;
            }
            case CryptosDefine.CardType.Type_Five: {
                saveList.push(cardList[0]);
                break;
            }
        }

        return saveList;
    }

    /**
    * 获取日期文本 格式"年-月-日 时:分:秒"
    * @param {datetime} time           需要转换的时间
    * @return {string}                 返回文本
    */
    getDateTime(time?: number) {
        let date = time > 0 ? new Date(time) : new Date();
        let y = date.getFullYear();
        let m: number | string = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d: number | string = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h: number | string = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute: number | string = date.getMinutes();
        let second: number | string = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    };

    // update (dt) {}
}