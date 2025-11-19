import zp_Area from "./zp_Area";
import { zp_GameConfig } from "./zp_GameConfig";
import { zp_GameData } from "./zp_GameData";
import { zp_SubGameMSG } from "./zp_SubGameMSG";

const { ccclass, property } = cc._decorator;

@ccclass
export default class zp_Jetton extends cc.Component {



    @property([zp_Area])
    areaArray : zp_Area[]= [];

    _allMoney = 0;
    _allMyMoney = null;



    @property(cc.Label)
    allBetLabel: cc.Label = null;

    @property(cc.Label)
    myBetLabel: cc.Label = null;



    @property(cc.Sprite)
    wz: cc.Sprite = null;

    @property(cc.SpriteAtlas)
    lz: cc.SpriteAtlas = null;

    start() {
        for (let e = 0; e < 61; ++e) {
            //this.areaArray[e].node.on("click", this.onAreaBtnClick, this);
            this.areaArray[e].node.on(cc.Node.EventType.TOUCH_END, this.onAreaBtnClick, this);
        }
    }

    onAreaBtnClick(event) {
        const t = event.currentTarget.name;
        for (let o = 0; o < 61; ++o) {
            if (t === `area_btn_${o}`) {
                this.onClickArea(event, o);
                break;
            }
        }
    }

    onClickArea(e: cc.Event, t: number) {
        if (101 !== zp_GameData.GameData.gameStatus) {
            return false;
        }
        console.log(666, t);
        clientKernel.sendGameMsg(zp_SubGameMSG.subGameMSG.SUB_C_ADD_JETTION, [
            [parseInt(t + ""), zp_GameData.GameData.selectIndex],
        ]);
    }

    clearAllJetton() {
        for (let e = 0; e < this.areaArray.length; ++e) {
            this.areaArray[e].clearAllJetton();
        }
        this.allBetScene(0);
        this.myBetScene(0);
    }

    allBetScene(e: number) {
        this._allMoney = e;
        const t = zp_GameData.numberFormat(this._allMoney);
        this.allBetLabel.string = `${t.value}${t.unit}`;
    }

    myBetScene(e: number) {
        const t = zp_GameData.numberFormat(e);
        this.myBetLabel.string = `${t.value}${t.unit}`;
    }

    allBetAddJetton(e: number, t: number, o: number) {
        this._allMoney += o;
        const n = zp_GameData.numberFormat(this._allMoney);
        this.allBetLabel.string = `${n.value}${n.unit}`;
        if (t > 0) {
            this.areaArray[e].allBetAddJetton(t);
        }
    }

    clearMyAllJetton() {
        for (let e = 0; e < this.areaArray.length; ++e) {
            zp_GameData.GameData.areaBetArray[e].areaAllJettonMoney = 0;
        }
        this._allMyMoney = 0;
        zp_GameData.GameData.allJettonMoney = 0;
    }

    allMyBetAddJetton(e: number, t: number, o: number) {
        clientKernel.getMeUserItem();
        this._allMyMoney += t;
        this.myBetScene(this._allMyMoney);
        zp_GameData.GameData.allJettonMoney = this._allMyMoney;
        zp_GameData.GameData.allLastMyJettonMoney = this._allMyMoney;
        if (t > 0) {
            this.areaArray[e].allMyBetAddJetton(t);
            zp_GameData.GameData.areaBetArray[e].areaAllJettonMoney += t;
            zp_GameData.GameData.userScore -= t;
        }
    }

    load_wz(e: number) {
        this.wz.node.opacity = 255;
        this.wz.node.active = false;
        if (0 === e) {
            this.wz.spriteFrame = this.lz.getSpriteFrame("game-animals-gui-gui-wz-wanj");
            this.wz.node.active = true;
            audioMgr.playEffect(zp_GameConfig.AudioData.fq_zhuang1, false);
        } else {
            this.wz.spriteFrame = this.lz.getSpriteFrame("game-animals-gui-gui-wz-" + e);
            this.wz.node.active = true;
        }
        this.wz.node.runAction(cc.sequence(cc.delayTime(2), cc.fadeOut(0.5)));
    }

}