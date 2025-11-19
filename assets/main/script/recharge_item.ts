
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
    bonus: cc.Label = null;

    @property(cc.Label)
    actualamount: cc.Label = null;

    @property(cc.Label)
    status: cc.Label = null;

    start() {
    }

    writePanel(data:any){
        console.log("======data===",data);
        if(!data ||data.length<1) return;
        // this.transaction.string = data.transactionId;
        // this.date.string = data.date;
        // this.depositvalue.string = data.depositvalue;
        // this.status.string = data.status;
        // this.bonus.string = data.bonus;
        // this.actualamount = data.actualamount;
        this.transaction.string = GameTools.dateFormat(data.createdAt*1000);
        this.date.string = data.amount;
        this.depositvalue.string = GameTools.dateFormat(data.paidAt*1000);
        this.status.string = data.status;
        // this.bonus.string = data.bonus;
        // this.actualamount = data.actualamount;
    }
}
