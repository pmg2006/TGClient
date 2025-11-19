
const { ccclass, property } = cc._decorator;

@ccclass
export default class zp_ResultInfo extends cc.Component {     


    @property([cc.Node])
    Ct: cc.Node[]= [];
        
        start = function() {}

        setInfo(e: number, t: boolean, o: boolean, n: boolean) {
            this.Ct[4].active = false;
            this.Ct[0].active = t;
            this.Ct[1].active = o;
            this.Ct[2].active = n;
            this.Ct[3].getComponent(cc.Label).string = t ? '0' : e.toString();
            this.node.active = true;
        }
    }