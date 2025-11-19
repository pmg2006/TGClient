import { zp_GameConfig } from "./zp_GameConfig";
import zp_ResultInfo from "./zp_ResultInfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class zp_ResultList extends cc.Component {


    @property(cc.Node)
    list: cc.Node = null;


    start() {
        GameTools.addBtnOnClick(this.node, this.onBtnClick, this)
    }

    onBtnClick(e) {
        var t = e.getCurrentTarget().name;
        switch (audioMgr.playEffect(zp_GameConfig.AudioData.fq_button, !1), t) {
            case "btn_close":
                this.node.active = !1
        }
    }

    initAllResultInfo = function (e) {
        if (e.length >= 40) {
            e.splice(0, e.length - 40);
        }

        const t = [3, 12, 7, 18, 9, 14, 1, 16, 5, 23, 30, 36, 27, 34, 25, 21, 19, 32];
        const o = [26, 35, 28, 29, 22, 31, 20, 33, 24, 10, 8, 11, 13, 6, 17, 2, 4, 15];

        for (let n = 0; n < this.list.childrenCount; n++) {
            this.list.children[n].active = false;
        }

        this.node.getChildByName("lab1").getComponent("cc.Label").string = "0次";
        this.node.getChildByName("lab2").getComponent("cc.Label").string = "0次";
        this.node.getChildByName("lab3").getComponent("cc.Label").string = "0次";
        this.node.getChildByName("lab4").getComponent("cc.Label").string = "0次";
        this.node.getChildByName("lab5").getComponent("cc.Label").string = "0次";
        this.node.getChildByName("lab6").getComponent("cc.Label").string = "0次";

        if (e.length > 0) {
            let i = 0;
            let r = 0;
            let c = 0;
            let s = 0;
            let l = 0;
            let p = 0;

            for (let n = 0; n < e.length; n++) {
                const u = e[n];
                let h = false;
                let d = false;
                let f = false;

                if (u >= 1 && u <= 18) {
                    i++;
                    if (u % 2 === 0) {
                        s++;
                    } else {
                        c++;
                    }
                } else if (u >= 19 && u <= 36) {
                    r++;
                    if (u % 2 === 0) {
                        s++;
                    } else {
                        c++;
                    }
                } else {
                    h = true;
                }

                for (let g = 0; g < t.length; g++) {
                    if (t[g] === u) {
                        d = true;
                        l++;
                    }
                }

                for (let _ = 0; _ < o.length; _++) {
                    if (o[_] === u) {
                        f = true;
                        p++;
                    }
                }

                this.list.children[n].getComponent(zp_ResultInfo).setInfo(u, h, d, f);

                if (n === e.length - 1) {
                    this.list.children[n].getComponent(zp_ResultInfo).Ct[4].active = true;
                }
            }

            this.node.getChildByName("lab1").getComponent("cc.Label").string = i + "次";
            this.node.getChildByName("lab2").getComponent("cc.Label").string = r + "次";
            this.node.getChildByName("lab3").getComponent("cc.Label").string = c + "次";
            this.node.getChildByName("lab4").getComponent("cc.Label").string = s + "次";
            this.node.getChildByName("lab5").getComponent("cc.Label").string = l + "次";
            this.node.getChildByName("lab6").getComponent("cc.Label").string = p + "次";
        }
    }

}