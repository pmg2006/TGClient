
import { AudioControl } from "./AudioControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class recharge_item extends cc.Component {

    @property(cc.Label)
    transaction: cc.Label = null;

    @property(cc.Label)
    date: cc.Label = null;

    @property(cc.Label)
    depositvalue: cc.Label = null;

    @property(cc.Label)
    withdraw: cc.Label = null;

    @property(cc.Label)
    status: cc.Label = null;

    @property(cc.Label)
    detail: cc.Label = null;

    start() {
    }

    writePanel(data:any){
        console.log("======data===",data);
        if(!data ||data.length<1) return;
        this.transaction.string = GameTools.dateFormat(data.createdAt*1000); //1682863552
        this.withdraw.string = data.amount;
        this.date.string = GameTools.dateFormat(data.paidAt*1000);
        this.status.string = data.status;
    }
}
